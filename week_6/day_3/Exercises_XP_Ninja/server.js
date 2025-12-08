// Main Server File
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import quizRoutes from './server/routes/quizRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api', quizRoutes);

// Serve index.html for root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
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
  console.log(`Quiz Game Server is running on http://localhost:${PORT}`);
  console.log('Available API endpoints:');
  console.log('  GET    /api/questions');
  console.log('  GET    /api/questions/:id');
  console.log('  POST   /api/submit');
  console.log('  GET    /api/stats');
});

export default app;
