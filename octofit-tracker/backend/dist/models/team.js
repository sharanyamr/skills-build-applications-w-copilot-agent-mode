"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const teamSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    coach: { type: String, required: true },
    members: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: () => new Date() }
});
exports.default = (0, mongoose_1.model)('Team', teamSchema);
