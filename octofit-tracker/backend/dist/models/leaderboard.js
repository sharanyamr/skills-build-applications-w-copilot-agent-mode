"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const leaderboardSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    teamId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Team' },
    rank: { type: Number, required: true },
    score: { type: Number, required: true },
    period: { type: String, required: true, default: 'weekly' },
    updatedAt: { type: Date, default: () => new Date() }
});
exports.default = (0, mongoose_1.model)('Leaderboard', leaderboardSchema);
