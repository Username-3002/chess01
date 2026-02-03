import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema(
  {
    // Current board position (FEN)
    fen: {
      type: String,
      required: true
    },

    // Whose turn: w = white, b = black
    turn: {
      type: String,
      enum: ['w', 'b'],
      required: true
    },

    // Game status
    status: {
      type: String,
      enum: ['active', 'checkmate', 'draw', 'resigned'],
      default: 'active'
    },

    // Game mode
    mode: {
      type: String,
      enum: ['online', 'offline', 'bot'],
      default: 'offline'
    },

    // Players
    players: {
      white: { type: String, default: null },
      black: { type: String, default: null }
    },

    // Move history
    moves: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

const Game = mongoose.model('Game', gameSchema);

export default Game;
