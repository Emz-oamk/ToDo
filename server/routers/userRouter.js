import { pool } from '../helper/db.js'
import { Router } from 'express'
import { hash } from 'bcrypt'
import jwt from 'jsonwebtoken'

const { sign } = jwt

const router = Router()

router.post('/signup', (req, res, next) => {
    const { user } = req.body

    if(!user || !user.email || !user.password) {
        const error = new Error('Email and password are required')
        return next(error)
    }

    hash(user.password, 10, (err, hashedPassword) => {
        if(err) return next(err)

        // Added id and email at the end of INSERT
        pool.query(
         'INSERT INTO account (email, password) VALUES ($1, $2) RETURNING id, email',
         [user.email, hashedPassword],
         (err, result) => {
            if(err) {
                if(err.code === '23505') {
                    //duplicating email
                    return res.status(400).json({error: 'Email already exists'})
                }
                return next(err)
            }
            res.status(201).json(result.rows[0])// deleted {.id, email: user.email}
        })
    })
})

router.post('/signin', (req,res,next) => {
    const { user } = req.body
    if(!user || !user.email || !user.password) {
        const error = new Error('Email and password are required')
        error.status = 400
        return next(error)
    }
    pool.query('SELECT * FROM account WHERE email = $1', [user.email], (err,result) => {
        if(err) return next(err)
        
        if(result.rows.lenght === 0) {
         const error = new Error('User not found')
         error.status = 400
         return next(error)
        }

        const dbUser = result.rows[0]

        compare(user.password, dbUser.password, (err, isMatch) => {
            if(err) return next(err)
            
            if(!isMatch) {
                const error = new Error('Invalid password')
                error.status(401)
                return next(error)
            }
        })

        const token = sign({ user: dbUser.email}, process.env.JWT_SECRET) //Miksi lopussa ei ole key?
        res.status(200).json({
            id: dbUser.id,
            email: dbUser.email,
            token
        })
    })
})

export default router