import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import path from "path"
import cookieParser from 'cookie-parser'
import swaggerUi from 'swagger-ui-express'

import { fileURLToPath } from "url"

import loadSwaggerFiles from './swagger.js'
import studentRoutes from './routes/studentRoutes.js'
import educatorRoutes from './routes/educatorRoutes.js'
import userRoutes from './routes/userRoutes.js'


// Load environment variables
dotenv.config()

const app = express()
app.use(cors())
app.use(cookieParser())
app.use(express.json())



const PORT = process.env.PORT || 5000

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


//  swagger setup
const swaggerDocument = loadSwaggerFiles(path.join(__dirname, './docs'))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err)
  })

// Route middlewares
app.use('/api/users', userRoutes)
app.use('/api/students', studentRoutes)
app.use('/api/educators', educatorRoutes)


app.use(express.static(path.join(__dirname, "build")))


app.get("*", (req, res) => {
  if (process.env.NODE_ENV === "production") {
    res.redirect(process.env.FRONTEND_URL)
  } else {
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html"))
  }
})


app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`)
});