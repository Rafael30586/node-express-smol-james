import express from 'express'
import db from '../db.js'

const router = express.Router()

// Obtener todos los to-dos para elo usuario que inició sesión 
router.get('/', (req,res)=>{

})

// Crear un nuevo to-do
router.post('/', (req,res)=>{

})

// Actualizar un to-do
router.put('/:id', (req,res)=>{

})

// Borrar un to-do
router.delete('/:id', (req,res)=>{

})

export default router

