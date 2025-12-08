// Multiplayer Strategy Game Server
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GameManager } from './models/Game.js';
import gameRoutes from './routes/game.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize game manager
const gameManager = new GameManager();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API Routes
app.use('/api/game', gameRoutes(gameManager));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    activeGames: gameManager.getAllGames().length
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🎮 Multiplayer Strategy Game Server running on http://localhost:${PORT}`);
  console.log('Game Features:');
  console.log('  ✓ 10x10 Grid Board');
  console.log('  ✓ Turn-based Gameplay');
  console.log('  ✓ Base Capture Victory');
  console.log('  ✓ Obstacle System');
  console.log('  ✓ RESTful API');
  console.log('\nAPI Endpoints:');
  console.log('  POST   /api/game/create');
  console.log('  GET    /api/game/:gameId');
  console.log('  POST   /api/game/:gameId/move');
  console.log('  POST   /api/game/:gameId/attack');
  console.log('  GET    /api/game');
  console.log('  DELETE /api/game/:gameId');
});

export default app;
