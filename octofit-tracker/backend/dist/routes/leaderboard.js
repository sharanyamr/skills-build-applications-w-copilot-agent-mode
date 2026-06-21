"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const leaderboard_1 = __importDefault(require("../models/leaderboard"));
const router = (0, express_1.Router)();
router.get('/', async (_, res) => {
    const leaderboard = await leaderboard_1.default.find().populate('userId teamId').sort({ rank: 1 }).lean();
    res.json({ leaderboard, message: 'Fetch leaderboard standings' });
});
router.post('/', async (req, res) => {
    const entry = await leaderboard_1.default.create(req.body);
    res.status(201).json({ message: 'Create new leaderboard entry', entry });
});
exports.default = router;
