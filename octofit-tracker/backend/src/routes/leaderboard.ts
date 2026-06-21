import { Router } from 'express'
import Leaderboard from '../models/leaderboard'

const router = Router()

router.get('/', async (_, res) => {
  const leaderboard = await Leaderboard.find().populate('userId teamId').sort({ rank: 1 }).lean()
  res.json({ leaderboard, message: 'Fetch leaderboard standings' })
})

router.post('/', async (req, res) => {
  const entry = await Leaderboard.create(req.body)
  res.status(201).json({ message: 'Create new leaderboard entry', entry })
})

export default router
