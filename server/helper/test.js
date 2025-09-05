import fs from 'fs'
import path from 'path'
import { pool } from '../helper/db.js'
import { hash } from 'bcrypt'
import jwt from 'jsonwebtoken'
/*import { fileURLToPath } from 'url'

//Added import^ and edited below
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
*/
const __dirname = path.resolve()

const initializeTestDb = async () => {
    const sql = fs.readFileSync(path.resolve(__dirname,'./todo.sql'), 'utf8')
    pool.query(sql)
    /*, (err) => {
        if(err) {
            console.error('Error initializing test database:', err)
        }
        else {
            console.log('Test database initialized successfully')
        }
    })*/
}
//Edited
const insertTestUser = async ( email, password ) => {
    if (!email || !password) {
        throw new Error("Email and password are required")
    }

    const hashedPassword = await hash(password, 10)
    await pool.query( // deleted const result =
     "INSERT INTO account (email, password) VALUES ($1, $2)",
     [email, hashedPassword]
    )
    //const user = result.rows[0]
    
    const token = jwt.sign({ email }, process.env.JWT_SECRET || "testsecret")
    return { email, token }
}

const getToken = (email) => {
    return jwt.sign({ email }, process.env.JWT_SECRET || "testsecret")
}

export { initializeTestDb, insertTestUser, getToken }