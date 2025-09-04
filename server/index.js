import express from 'express'
import cors from 'cors'
import todoRouter from './routers/todoRouter.js'
import userRouter from './routers/userRouter.js'

const port = process.env.PORT

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/',todoRouter)
app.use('/user',userRouter)

app.use((err,req,res,next) => {
    const statusCode = err.status || 500
    res.status(statusCode).json({
        error: {
            message: err.message,
            status: statusCode
        }
    })
})

app.listen(port, () => {
    console.log('Server is running on http://localhost:${port}')
})

