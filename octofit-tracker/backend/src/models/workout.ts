import { Schema, model } from 'mongoose'

const workoutSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
  caloriesEstimate: { type: Number, required: true },
  createdAt: { type: Date, default: () => new Date() }
})

export default model('Workout', workoutSchema)
