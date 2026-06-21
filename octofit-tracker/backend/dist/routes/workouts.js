"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const workout_1 = __importDefault(require("../models/workout"));
const router = (0, express_1.Router)();
router.get('/', async (_, res) => {
    const workouts = await workout_1.default.find().lean();
    res.json({ workouts, message: 'List all workouts' });
});
router.post('/', async (req, res) => {
    const workout = await workout_1.default.create(req.body);
    res.status(201).json({ message: 'Create new workout', workout });
});
exports.default = router;
