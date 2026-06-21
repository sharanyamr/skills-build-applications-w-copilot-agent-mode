import express from 'express'
import { connectDatabase } from './database'
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
