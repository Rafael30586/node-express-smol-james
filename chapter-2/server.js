const express = require('express')
const app = express()
const PUERTO = 8383

const data = {
    user: ['james']
}

app.use(express.json())

app.get('/',(req,res)=>{
    res.send('<h1>Home</h1>')
})

app.get('/dashboard',(req,res)=>{
    res.send(`
        <body>
        <h1>Dashboard</h1>
        <a href='/'>Home</a>
        <script>console.log('Hola')</script>
        </body>
        `)
})

app.get('/api/data',(req,res)=>{
    console.log('Este es para datos')
    res.status(200).send(data)
})

app.post('/api/data', (req,res)=>{
    const newEntry = req.body
    console.log(newEntry)
    data.user.push(newEntry.nombre)
    res.sendStatus(201)
})

app.delete('/api/data', (req,res)=>{
    data.user.pop()
    console.log('Borramos un elemento del array')
    res.sendStatus(203)
})

app.listen(PUERTO, ()=>{
    console.log(`Escuchando en puerto ${PUERTO}`)
})