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
    const {completed} = req.body
    const {id} = req.params
    const {page} = req.query // Esto sirve para procesar el parámetro page

    const updatedTodo = db.prepare('UPDATE todos SET completed = ? WHERE id = ?')
    updatedTodo.run(completed, id)
    res.json({message: "Todo completed"}) 
})

// Borrar un to-do
router.delete('/:id', (req,res)=>{

})

export default router

