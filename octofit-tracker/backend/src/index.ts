import express from 'express'
import { connectDatabase } from './config/database'
import usersRouter from './routes/users'
import teamsRouter from './routes/teams'
import activitiesRouter from './routes/activities'
import leaderboardRouter from './routes/leaderboard'
import workoutsRouter from './routes/workouts'

const app = express()
const port = Number(process.env.PORT ?? 8000)
const apiHost = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-8000.githubpreview.dev`
  : `http://localhost:${port}`

app.use(express.json())

app.get('/', (_req, res) => {
  res.send(
    `<!DOCTYPE html><html><head><title>OctoFit Tracker</title></head><body><h1>OctoFit Tracker Backend</h1><p>The backend is running. Use <a href="/api/health">/api/health</a> or start the frontend on port 5173.</p></body></html>`
  )
})

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString(), apiHost })
})

app.use('/api/users', usersRouter)
app.use('/api/teams', teamsRouter)
app.use('/api/activities', activitiesRouter)
app.use('/api/leaderboard', leaderboardRouter)
app.use('/api/workouts', workoutsRouter)

app.listen(port, async () => {
  console.log(`Backend running at ${apiHost}`)
  try {
    await connectDatabase()
    console.log('Connected to MongoDB at octofit_db')
  } catch (error) {
    console.error('MongoDB connection error:', error)
  }
})
