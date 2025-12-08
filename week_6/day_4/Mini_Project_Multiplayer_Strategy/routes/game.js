// Game Routes
import express from 'express';

const router = express.Router();

// Game routes will use the gameManager passed from server
export default (gameManager) => {
  // Create a new game
  router.post('/create', (req, res) => {
    try {
      const { player1, player2 } = req.body;

      if (!player1 || !player2) {
        return res.status(400).json({
          success: false,
          message: 'Both player1 and player2 are required'
        });
      }

      if (player1 === player2) {
        return res.status(400).json({
          success: false,
          message: 'Players must be different'
        });
      }

      const game = gameManager.createGame(player1, player2);

      res.status(201).json({
        success: true,
        message: 'Game created successfully',
        data: game.getGameState()
      });
    } catch (error) {
      console.error('Error creating game:', error);
      res.status(500).json({
        success: false,
        message: 'Error creating game',
        error: error.message
      });
    }
  });

  // Get game state
  router.get('/:gameId', (req, res) => {
    try {
      const { gameId } = req.params;
      const game = gameManager.getGame(gameId);

      if (!game) {
        return res.status(404).json({
          success: false,
          message: 'Game not found'
        });
      }

      res.json({
        success: true,
        data: game.getGameState()
      });
    } catch (error) {
      console.error('Error getting game state:', error);
      res.status(500).json({
        success: false,
        message: 'Error getting game state',
        error: error.message
      });
    }
  });

  // Make a move
  router.post('/:gameId/move', (req, res) => {
    try {
      const { gameId } = req.params;
      const { player, direction } = req.body;

      if (!player || !direction) {
        return res.status(400).json({
          success: false,
          message: 'Player and direction are required'
        });
      }

      const game = gameManager.getGame(gameId);

      if (!game) {
        return res.status(404).json({
          success: false,
          message: 'Game not found'
        });
      }

      const result = game.makeMove(player, direction);

      if (!result.success) {
        return res.status(400).json({
          success: false,
          message: result.message
        });
      }

      res.json({
        success: true,
        message: result.message,
        data: {
          ...result,
          gameState: game.getGameState()
        }
      });
    } catch (error) {
      console.error('Error making move:', error);
      res.status(500).json({
        success: false,
        message: 'Error making move',
        error: error.message
      });
    }
  });

  // Attack base
  router.post('/:gameId/attack', (req, res) => {
    try {
      const { gameId } = req.params;
      const { player } = req.body;

      if (!player) {
        return res.status(400).json({
          success: false,
          message: 'Player is required'
        });
      }

      const game = gameManager.getGame(gameId);

      if (!game) {
        return res.status(404).json({
          success: false,
          message: 'Game not found'
        });
      }

      const result = game.attackBase(player);

      if (!result.success) {
        return res.status(400).json({
          success: false,
          message: result.message
        });
      }

      res.json({
        success: true,
        message: result.message,
        data: {
          ...result,
          gameState: game.getGameState()
        }
      });
    } catch (error) {
      console.error('Error attacking base:', error);
      res.status(500).json({
        success: false,
        message: 'Error attacking base',
        error: error.message
      });
    }
  });

  // Get all games
  router.get('/', (req, res) => {
    try {
      const games = gameManager.getAllGames();
      res.json({
        success: true,
        data: games
      });
    } catch (error) {
      console.error('Error getting games:', error);
      res.status(500).json({
        success: false,
        message: 'Error getting games',
        error: error.message
      });
    }
  });

  // Delete a game
  router.delete('/:gameId', (req, res) => {
    try {
      const { gameId } = req.params;
      const game = gameManager.getGame(gameId);

      if (!game) {
        return res.status(404).json({
          success: false,
          message: 'Game not found'
        });
      }

      gameManager.deleteGame(gameId);

      res.json({
        success: true,
        message: 'Game deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting game:', error);
      res.status(500).json({
        success: false,
        message: 'Error deleting game',
        error: error.message
      });
    }
  });

  return router;
};
