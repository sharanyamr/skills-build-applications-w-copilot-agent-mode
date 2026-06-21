import { connectDatabase, disconnectDatabase } from '../database'
import User from '../models/user'
import Team from '../models/team'
import Activity from '../models/activity'
import Leaderboard from '../models/leaderboard'
import Workout from '../models/workout'

async function seed() {
  console.log('Seed the octofit_db database with test data')

  await connectDatabase()
  console.log('Connected to MongoDB at octofit_db')

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({})
  ])

  const users = await User.create([
    { name: 'Asha Patel', email: 'asha.patel@example.com', role: 'member' },
    { name: 'Marco Silva', email: 'marco.silva@example.com', role: 'coach' },
    { name: 'Jade Nguyen', email: 'jade.nguyen@example.com', role: 'admin' }
  ])

  const teams = await Team.create([
    { name: 'Sunrise Sprinters', coach: 'Marco Silva', members: [users[0]._id] },
    { name: 'Moonlight Movers', coach: 'Marco Silva', members: [users[2]._id] }
  ])

  await User.updateOne({ _id: users[0]._id }, { teamId: teams[0]._id })
  await User.updateOne({ _id: users[2]._id }, { teamId: teams[1]._id })

  const activities = await Activity.create([
    { userId: users[0]._id, type: 'Running', durationMinutes: 35, caloriesBurned: 420, date: new Date(), notes: 'Morning park run' },
    { userId: users[0]._id, type: 'Yoga', durationMinutes: 55, caloriesBurned: 210, date: new Date(), notes: 'Evening flexibility session' },
    { userId: users[2]._id, type: 'Strength Training', durationMinutes: 50, caloriesBurned: 380, date: new Date(), notes: 'Full body workout' }
  ])

  const leaderboardEntries = await Leaderboard.create([
    { userId: users[0]._id, teamId: teams[0]._id, rank: 1, score: 1580, period: 'weekly' },
    { userId: users[2]._id, teamId: teams[1]._id, rank: 2, score: 1420, period: 'weekly' }
  ])

  const workouts = await Workout.create([
    { title: 'Core Power Circuit', description: 'A focused circuit to build core strength and endurance.', durationMinutes: 30, difficulty: 'intermediate', caloriesEstimate: 250 },
    { title: 'Cardio Burn Blast', description: 'High-energy cardio workout to boost heart rate and calories burned.', durationMinutes: 25, difficulty: 'advanced', caloriesEstimate: 320 },
    { title: 'Recovery Flow', description: 'Low-impact mobility routine for active recovery and stretching.', durationMinutes: 20, difficulty: 'beginner', caloriesEstimate: 120 }
  ])

  console.log(`Seeded ${users.length} users, ${teams.length} teams, ${activities.length} activities, ${leaderboardEntries.length} leaderboard entries, ${workouts.length} workouts`)

  await disconnectDatabase()
  console.log('Disconnected from MongoDB')
}

seed().catch((error) => {
  console.error('Seed error:', error)
  process.exit(1)
})
