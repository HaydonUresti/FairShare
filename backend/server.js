import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import path from "path"
import { fileURLToPath } from "url"

import StudentModel from './models/Student.js'

// Load environment variables
dotenv.config()


const app = express()
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT || 5000

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)



// Database connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => {
    console.error('MongoDB connection error:', err)
  })

app.post('/register', (req, res) => {
  console.log('Request body:', req.body)
  StudentModel.create(req.body)
    .then(student => {
      console.log('Student created:', student)
      res.json(student)
    })
    .catch(err => {
      res.status(500).json({ error: err.message })
    })
})
// Test Route
// app.get('/', (req, res) => {
//   res.send('Hello from the backend!');
// });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
});

app.use(express.static(path.join(__dirname, "build")))
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"))
});
