import fs from 'fs'
import path from 'path'
import { pool } from './db.js'
import { hash } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { fileURLToPath } from 'url'

//Added import^ and edited below
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const initializeTestDb = () => {
    const sql = fs.readFileSync(path.resolve(__dirname,'../todo.sql'), 'utf8')

    pool.query(sql, (err) => {
        if(err) {
            console.error('Error initializing test database:', err)
        }
        else {
            console.log('Test database initialized successfully')
        }
    })
}
//Edited
const insertTestUser = async ({ email, password }) => {
    const hashedPassword = await hash(password, 10)
    const result = await pool.query(
     "INSERT INTO account (email, password) VALUES ($1, $2) RETURNING id, email",
     [email, hashedPassword]
    )

    const user = result.rows[0]
    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    )
    return { ...user, token }
}

const getToken = (email) => {
    return jwt.sign({ email }, process.env.JWT_SECRET)
}

export { initializeTestDb, insertTestUser, getToken }