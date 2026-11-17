import express from 'express'
import db from '../db.js'

const router = express.Router()

// Obtener todos los to-dos para elo usuario que inició sesión 
router.get('/', (req,res)=>{
    const getTodos = db.prepare('SELECT * FROM todos WHERE user_id = ?')
    const todos = getTodos.all(req.userId)
    res.json(todos) 
})

// Crear un nuevo to-do
router.post('/', (req,res)=>{
    const {task} = req.body
    const insertTodo = db.prepare(`INSERT INTO todos(user_id, task) VALUES(?, ?)`)
    const result = insertTodo.run(req.userId, task)

    res.json({id: result.lastInsertRowid, task, completed: 0})

})

// Actualizar un to-do
router.put('/:id', (req,res)=>{

})

// Borrar un to-do
router.delete('/:id', (req,res)=>{

})

export default router

