import { Router } from 'express'
import { getTasks, postTask, removeTask } from '../controllers/TaskController.js'
import { auth } from '../helper/auth.js'


const router = Router()

router.get('/', getTasks)
router.post('/create', auth, postTask)
router.delete('/delete/:id', auth, removeTask)

/*
router.get('/', (req, res, next) => {
    pool.query('SELECT * FROM task', (err, result) => {
        if(err) {
            return next(err)
        }
        res.status(200).json(result.rows || [])
    })
})

router.post('/create', auth,(req, res, next) => {
    const { task } = req.body

    if (!task) {
        return res.status(400).json({error: 'Task is required'})
    }

    pool.query('insert into task (description) values ($1) returning *', [task.description],
    (err, result) => {
        if(err) {
         return next(err)
        }
        res.status(201).json({id: result.rows[0].id, description: task.description})
    })
})

router.delete('/delete/:id', (req, res, next) => {
    const { id } = req.params
    
    pool.query('delete from task WHERE id = $1',
    [id], (err, result) => {
        if(err) {
            return next(err)
        }
        if(result.rowCount === 0) {
            const error = new Error('Task not found')
            error.status = 404
            return next(error)
        }
        return res.status(200).json({id:id})
    })
})
*/

export default router