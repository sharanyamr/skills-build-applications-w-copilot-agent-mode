import express from 'express'
import mongoose from 'mongoose'

const app = express()
const port = 8000
const mongoUri = 'mongodb://127.0.0.1:27017/octofit_traker'

app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() })
})

app.listen(port, async () => {
  console.log(`Backend running at http://localhost:${port}`)
  try {
    await mongoose.connect(mongoUri)
    console.log('Connected to MongoDB at', mongoUri)
  } catch (error) {
    console.error('MongoDB connection error:', error)
  }
})
