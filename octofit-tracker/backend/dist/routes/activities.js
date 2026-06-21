"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const activity_1 = __importDefault(require("../models/activity"));
const router = (0, express_1.Router)();
router.get('/', async (_, res) => {
    const activities = await activity_1.default.find().lean();
    res.json({ activities, message: 'List activity logs' });
});
router.post('/', async (req, res) => {
    const activity = await activity_1.default.create(req.body);
    res.status(201).json({ message: 'Create new activity', activity });
});
exports.default = router;
