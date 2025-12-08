// Game Model - Manages game state and logic
export class Game {
  constructor(gameId, player1, player2) {
    this.gameId = gameId;
    this.gridSize = 10;
    this.grid = this.initializeGrid();
    this.players = {
      player1: {
        id: player1,
        position: { x: 0, y: 0 },
        base: { x: 0, y: 0 },
        color: '#3b82f6' // Blue
      },
      player2: {
        id: player2,
        position: { x: 9, y: 9 },
        base: { x: 9, y: 9 },
        color: '#ef4444' // Red
      }
    };
    this.currentTurn = 'player1';
    this.winner = null;
    this.moves = [];
    this.createdAt = new Date();
  }

  initializeGrid() {
    const grid = [];
    for (let y = 0; y < this.gridSize; y++) {
      grid[y] = [];
      for (let x = 0; x < this.gridSize; x++) {
        grid[y][x] = { type: 'empty', player: null };
      }
    }
    
    // Add some random obstacles
    const obstacleCount = 10;
    for (let i = 0; i < obstacleCount; i++) {
      const x = Math.floor(Math.random() * this.gridSize);
      const y = Math.floor(Math.random() * this.gridSize);
      // Don't place obstacles on starting positions
      if (!((x === 0 && y === 0) || (x === 9 && y === 9))) {
        grid[y][x] = { type: 'obstacle', player: null };
      }
    }

    // Mark bases
    grid[0][0] = { type: 'base', player: 'player1' };
    grid[9][9] = { type: 'base', player: 'player2' };

    return grid;
  }

  isValidMove(player, direction) {
    const playerData = this.players[player];
    const { x, y } = playerData.position;
    let newX = x;
    let newY = y;

    switch (direction) {
      case 'up': newY -= 1; break;
      case 'down': newY += 1; break;
      case 'left': newX -= 1; break;
      case 'right': newX += 1; break;
      default: return { valid: false, message: 'Invalid direction' };
    }

    // Check bounds
    if (newX < 0 || newX >= this.gridSize || newY < 0 || newY >= this.gridSize) {
      return { valid: false, message: 'Move out of bounds' };
    }

    // Check for obstacles
    if (this.grid[newY][newX].type === 'obstacle') {
      return { valid: false, message: 'Cannot move through obstacle' };
    }

    return { valid: true, newPosition: { x: newX, y: newY } };
  }

  makeMove(player, direction) {
    if (this.winner) {
      return { success: false, message: 'Game already finished' };
    }

    if (this.currentTurn !== player) {
      return { success: false, message: 'Not your turn' };
    }

    const moveValidation = this.isValidMove(player, direction);
    if (!moveValidation.valid) {
      return { success: false, message: moveValidation.message };
    }

    const { newPosition } = moveValidation;
    const playerData = this.players[player];
    
    // Update player position
    playerData.position = newPosition;

    // Check for win condition
    const opponent = player === 'player1' ? 'player2' : 'player1';
    const opponentBase = this.players[opponent].base;

    if (newPosition.x === opponentBase.x && newPosition.y === opponentBase.y) {
      this.winner = player;
      return {
        success: true,
        message: `${player} wins by capturing the base!`,
        gameOver: true,
        winner: player,
        position: newPosition
      };
    }

    // Check if adjacent to opponent's base for attack
    const isAdjacent = this.isAdjacentToBase(newPosition, opponentBase);

    // Switch turns
    this.currentTurn = opponent;

    // Record move
    this.moves.push({
      player,
      direction,
      position: newPosition,
      timestamp: new Date()
    });

    return {
      success: true,
      message: isAdjacent ? 'Adjacent to enemy base! Attack available!' : 'Move successful',
      position: newPosition,
      canAttack: isAdjacent,
      gameOver: false
    };
  }

  isAdjacentToBase(position, base) {
    const dx = Math.abs(position.x - base.x);
    const dy = Math.abs(position.y - base.y);
    return (dx === 1 && dy === 0) || (dx === 0 && dy === 1);
  }

  attackBase(player) {
    if (this.winner) {
      return { success: false, message: 'Game already finished' };
    }

    if (this.currentTurn !== player) {
      return { success: false, message: 'Not your turn' };
    }

    const opponent = player === 'player1' ? 'player2' : 'player1';
    const playerPos = this.players[player].position;
    const opponentBase = this.players[opponent].base;

    if (this.isAdjacentToBase(playerPos, opponentBase)) {
      this.winner = player;
      return {
        success: true,
        message: `${player} wins by attacking the base!`,
        gameOver: true,
        winner: player
      };
    }

    return { success: false, message: 'Not adjacent to enemy base' };
  }

  getGameState() {
    return {
      gameId: this.gameId,
      grid: this.grid,
      players: this.players,
      currentTurn: this.currentTurn,
      winner: this.winner,
      moveCount: this.moves.length
    };
  }
}

export class GameManager {
  constructor() {
    this.games = new Map();
    this.players = new Map(); // playerId -> gameId
  }

  createGame(player1, player2) {
    const gameId = `game_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const game = new Game(gameId, player1, player2);
    this.games.set(gameId, game);
    this.players.set(player1, gameId);
    this.players.set(player2, gameId);
    return game;
  }

  getGame(gameId) {
    return this.games.get(gameId);
  }

  getPlayerGame(playerId) {
    const gameId = this.players.get(playerId);
    return gameId ? this.games.get(gameId) : null;
  }

  deleteGame(gameId) {
    const game = this.games.get(gameId);
    if (game) {
      this.players.delete(game.players.player1.id);
      this.players.delete(game.players.player2.id);
      this.games.delete(gameId);
    }
  }

  getAllGames() {
    return Array.from(this.games.values()).map(game => ({
      gameId: game.gameId,
      players: {
        player1: game.players.player1.id,
        player2: game.players.player2.id
      },
      currentTurn: game.currentTurn,
      winner: game.winner,
      moveCount: game.moves.length,
      createdAt: game.createdAt
    }));
  }
}
