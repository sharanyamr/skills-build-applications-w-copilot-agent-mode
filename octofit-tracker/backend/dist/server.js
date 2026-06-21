"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const users_1 = __importDefault(require("./routes/users"));
const teams_1 = __importDefault(require("./routes/teams"));
const activities_1 = __importDefault(require("./routes/activities"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const workouts_1 = __importDefault(require("./routes/workouts"));
const app = (0, express_1.default)();
const port = Number(process.env.PORT ?? 8000);
const apiHost = process.env.CODESPACE_NAME
    ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
    : `http://localhost:${port}`;
app.use(express_1.default.json());
app.get('/', (_req, res) => {
    res.send(`<!DOCTYPE html><html><head><title>OctoFit Tracker</title></head><body><h1>OctoFit Tracker Backend</h1><p>The backend is running. Use <a href="/api/health">/api/health</a> or start the frontend on port 5173.</p></body></html>`);
});
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString(), apiHost });
});
app.use('/api/users', users_1.default);
app.use('/api/teams', teams_1.default);
app.use('/api/activities', activities_1.default);
app.use('/api/leaderboard', leaderboard_1.default);
app.use('/api/workouts', workouts_1.default);
app.listen(port, async () => {
    console.log(`Backend running at ${apiHost}`);
    try {
        await (0, database_1.connectDatabase)();
        console.log('Connected to MongoDB at octofit_db');
    }
    catch (error) {
        console.error('MongoDB connection error:', error);
    }
});
