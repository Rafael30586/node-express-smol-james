import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db.js'

const router = express.Router()

router.post('/register',(req,res)=>{
    const {username, password} = req.body
    const hashedPassword = bcrypt.hashSync(password, 8)
    console.log(hashedPassword)

    try{
        const insertUser = db.prepare(`INSERT INTO users(username, password)
            VALUES(?, ?)`)
        const result = insertUser.run(username, hashedPassword)

        const defaultTodo = `Hello! Add your first todo`
        const insertTodo = db.prepare(`INSERT INTO todos (user_id, task)
            VALUES (?, ?)`)
        // Aparentement lastInserRowid accede al id generado al insertar el usuario
        insertTodo.run(result.lastInsertRowid)

        // Creación de token
        const token = jwt.sign({id: result.lastInsertRowid},process.env.JWT_SECRET,{expiresIn: '24h'})
        res.status(201).json({token})    

    }catch(err){
        console.log(err.message)
        res.sendStatus(503)
    }

    
})

router.post('/login', (req,res)=>{
    const {username, password} = req.body

    try{
        const getUser = db.prepare('SELECT * FROM users WHERE username = ?')
        const user = getUser.get(username)

        if(!user){
            return res.status(404).send({message: "User not found"})
        }

        const passwordIdValid = bcrypt.compareSync(password, user.password)
        if(!passwordIdValid){
            return res.status(401).send({message: "Invalid password"})
        }
        console.log(user)
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '24h'})
        res.json({token})
    }catch(error){
        console.log(error.message)
        res.sendStatus(503)

    }
    
})

export default router