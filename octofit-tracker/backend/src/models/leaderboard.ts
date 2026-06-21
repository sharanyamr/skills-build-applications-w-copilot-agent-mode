import { Schema, model } from 'mongoose'

const leaderboardSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
  rank: { type: Number, required: true },
  score: { type: Number, required: true },
  period: { type: String, required: true, default: 'weekly' },
  updatedAt: { type: Date, default: () => new Date() }
})

export default model('Leaderboard', leaderboardSchema)
