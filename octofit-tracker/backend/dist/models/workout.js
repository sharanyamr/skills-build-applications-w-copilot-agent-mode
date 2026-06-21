"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const workoutSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
    caloriesEstimate: { type: Number, required: true },
    createdAt: { type: Date, default: () => new Date() }
});
exports.default = (0, mongoose_1.model)('Workout', workoutSchema);
