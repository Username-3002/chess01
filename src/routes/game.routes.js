import express from 'express';
const router = express.Router();

import gameController from '../controllers/game.controller.js';

// Start a new game
// POST /game/start
router.post("/start", gameController.startGame);

// Make a move
// POST /game/move
router.post("/move", gameController.makeMove);

export default router;
