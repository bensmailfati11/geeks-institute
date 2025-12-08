// Quiz Controller - Business logic
import * as quizModel from '../models/quizModel.js';

// Get all questions
export const getQuestions = async (req, res) => {
  try {
    const questions = await quizModel.getAllQuestions();
    
    // Remove correct answers from response for security
    const questionsWithoutAnswers = questions.map(q => ({
      id: q.id,
      question: q.question,
      options: q.options
    }));

    res.status(200).json({
      success: true,
      data: questionsWithoutAnswers
    });
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching questions',
      error: error.message
    });
  }
};

// Get a specific question
export const getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid question ID'
      });
    }

    const question = await quizModel.getQuestionById(id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }

    // Remove correct answer from response
    const questionWithoutAnswer = {
      id: question.id,
      question: question.question,
      options: question.options
    };

    res.status(200).json({
      success: true,
      data: questionWithoutAnswer
    });
  } catch (error) {
    console.error('Error fetching question:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching question',
      error: error.message
    });
  }
};

// Submit answer
export const submitAnswer = async (req, res) => {
  try {
    const { questionId, answerId } = req.body;

    if (!questionId || !answerId) {
      return res.status(400).json({
        success: false,
        message: 'Question ID and Answer ID are required'
      });
    }

    const result = await quizModel.checkAnswer(questionId, answerId);

    res.status(200).json({
      success: true,
      correct: result.correct,
      correctAnswer: result.correctAnswer
    });
  } catch (error) {
    console.error('Error checking answer:', error);
    res.status(500).json({
      success: false,
      message: 'Error checking answer',
      error: error.message
    });
  }
};

// Get quiz stats
export const getQuizStats = async (req, res) => {
  try {
    const totalQuestions = await quizModel.getTotalQuestions();

    res.status(200).json({
      success: true,
      data: {
        totalQuestions
      }
    });
  } catch (error) {
    console.error('Error fetching quiz stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching quiz stats',
      error: error.message
    });
  }
};
