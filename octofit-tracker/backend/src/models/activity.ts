import { Schema, model } from 'mongoose'

const activitySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
  date: { type: Date, required: true },
  notes: { type: String }
})

export default model('Activity', activitySchema)
