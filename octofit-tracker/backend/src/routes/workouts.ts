import { Router } from 'express'
import Workout from '../models/workout'

const router = Router()

router.get('/', async (_, res) => {
  const workouts = await Workout.find().lean()
  res.json({ workouts, message: 'List all workouts' })
})

router.post('/', async (req, res) => {
  const workout = await Workout.create(req.body)
  res.status(201).json({ message: 'Create new workout', workout })
})

export default router
