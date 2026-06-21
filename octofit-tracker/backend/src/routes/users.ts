import { Router } from 'express'
import User from '../models/user'

const router = Router()

router.get('/', async (_, res) => {
  const users = await User.find().lean()
  res.json({ users, message: 'List all users' })
})

router.post('/', async (req, res) => {
  const user = await User.create(req.body)
  res.status(201).json({ message: 'Create new user', user })
})

export default router
