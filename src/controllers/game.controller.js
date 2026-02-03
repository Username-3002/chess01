import * as chessService from '../services/chess.services.js';

/**
 * Start a new chess game
 * POST /game/start
 */
async function startGame(req, res) {
  try {
    const { mode } = req.body; // optional: online | offline | bot

    const game = await chessService.createGame(mode);

    res.status(201).json({
      success: true,
      data: game
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

/**
 * Make a move
 * POST /game/move
 */
async function makeMove(req, res) {
  try {
    const { gameId, from, to } = req.body;

    // Basic validation (controller-level)
    if (!gameId || !from || !to) {
      return res.status(400).json({
        success: false,
        message: "gameId, from, and to are required"
      });
    }

    const result = await chessService.makeMove(gameId, from, to);

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}

export default {
  startGame,
  makeMove
};
