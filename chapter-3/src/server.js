import express from 'express'
import path, {dirname} from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'

const app = express()
const PORT = process.env.PORT || 5003

// Obtener la ruta del archivo de la URL del módulo actual
const __filename = fileURLToPath(import.meta.url)
// Obtener el nombre del directorio de la ruta del archivo
const __dirname = dirname(__filename)

// Middleware
app.use(express.json())
// Sirve el HTML del directorio /public
// Le dice a Express que sirva todos los archivos de la carpeta public como recursos estáticos
app.use(express.static(path.join(__dirname, '../public')))

app.use('/auth', authRoutes)
app.use('/todos', todoRoutes)

// Servir el archivo HTML del directorio /public
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, '../public', 'index.html'))
})

// app.use('/auth', authRoutes)

app.listen(PORT, ()=>{
    console.log(`El servidor se ejecuta en el puerto ${PORT}`)
})