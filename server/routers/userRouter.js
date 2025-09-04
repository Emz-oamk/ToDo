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

        pool.query('INSERT INTO account (email, password) VALUES ($1, $2) RETURNING *',
         [user.email, hashedPassword],
         (err, result) => {
            if(err) {
                return next(err)
            }
            res.status(201).json({id: result.rows[0].id, email: user.email})
        })
    })
})

export default router