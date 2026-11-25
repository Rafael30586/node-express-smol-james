import express from 'express'
import db from '../db.js'
import prisma from '../prismaClient.js'

const router = express.Router()

// Obtener todos los to-dos para elo usuario que inició sesión 
router.get('/', async (req,res)=>{
    const todos = await prisma.todo.findMany({
        where: {
            userId: req.userId
        }
    }) 
    res.json(todos) 
})

// Crear un nuevo to-do
router.post('/', async (req,res)=>{
    const {task} = req.body
    const todo = await prisma.todo.create({
        data: {
            task,
            usereId: req.userId
        }
    })

    res.json(todo)

})

// Actualizar un to-do
router.put('/:id', async(req,res)=>{
    const {completed} = req.body
    const {id} = req.params
    
    const updatedTodo = await prisma.todo.update({
        where: {
            id: parseInt(id),
            userId: req.userId
        },
        data: {
            completed: !!completed
        }
    })

    res.json({message: "Todo completed"}) 
})

// Borrar un to-do
router.delete('/:id', async (req,res)=>{
    const {id} = req.params
    const userId = req.userId
    await prisma.todo.delete({
        where: {
            id: parseInt(id),
            userId
        }
    })
    res.send({message: "todo deleted"})

})

export default router

