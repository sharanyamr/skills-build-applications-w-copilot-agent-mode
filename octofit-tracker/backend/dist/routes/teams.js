"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const team_1 = __importDefault(require("../models/team"));
const router = (0, express_1.Router)();
router.get('/', async (_, res) => {
    const teams = await team_1.default.find().populate('members').lean();
    res.json({ teams, message: 'List all teams' });
});
router.post('/', async (req, res) => {
    const team = await team_1.default.create(req.body);
    res.status(201).json({ message: 'Create new team', team });
});
exports.default = router;
