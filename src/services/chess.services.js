import { Chess } from 'chess.js';
import Game from '../models/game.model.js';

/**
 * Create a new chess game
 */
async function createGame(mode = "offline") {
  const chess = new Chess();

  const game = await Game.create({
    fen: chess.fen(),
    turn: chess.turn(),
    status: "active",
    mode
  });

  return {
    gameId: game._id,
    fen: game.fen,
    turn: game.turn,
    status: game.status
  };
}

/**
 * Make a move in an existing game
 */
async function makeMove(gameId, from, to) {
  const game = await Game.findById(gameId);
  if (!game) {
    throw new Error("Game not found");
  }

  if (game.status !== "active") {
    throw new Error("Game already finished");
  }

  // Rebuild board from FEN
  const chess = new Chess(game.fen);

  // Validate move using chess rules
  const move = chess.move({ from, to });

  if (!move) {
    throw new Error("Illegal move");
  }

  // Update game state
  game.fen = chess.fen();
  game.turn = chess.turn();
  game.moves.push(`${from}${to}`);

  // Update game status
  if (chess.isCheckmate()) {
    game.status = "checkmate";
  } else if (chess.isDraw()) {
    game.status = "draw";
  }

  await game.save();

  return {
    fen: game.fen,
    turn: game.turn,
    status: game.status,
    isCheck: chess.isCheck(),
    isCheckmate: chess.isCheckmate()
  };
}

export {
  createGame,
  makeMove
};
