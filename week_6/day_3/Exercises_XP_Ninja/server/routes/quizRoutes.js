// Quiz Routes
import express from 'express';
import * as quizController from '../controllers/quizController.js';

const router = express.Router();

// GET /api/questions - Get all questions
router.get('/questions', quizController.getQuestions);

// GET /api/questions/:id - Get a specific question
router.get('/questions/:id', quizController.getQuestionById);

// POST /api/submit - Submit an answer
router.post('/submit', quizController.submitAnswer);

// GET /api/stats - Get quiz statistics
router.get('/stats', quizController.getQuizStats);

export default router;
