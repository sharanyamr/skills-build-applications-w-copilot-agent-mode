import { Router } from 'express'
import Activity from '../models/activity'

const router = Router()

router.get('/', async (_, res) => {
  const activities = await Activity.find().lean()
  res.json({ activities, message: 'List activity logs' })
})

router.post('/', async (req, res) => {
  const activity = await Activity.create(req.body)
  res.status(201).json({ message: 'Create new activity', activity })
})

export default router
