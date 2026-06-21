import { Router } from 'express'
import Team from '../models/team'

const router = Router()

router.get('/', async (_, res) => {
  const teams = await Team.find().populate('members').lean()
  res.json({ teams, message: 'List all teams' })
})

router.post('/', async (req, res) => {
  const team = await Team.create(req.body)
  res.status(201).json({ message: 'Create new team', team })
})

export default router
