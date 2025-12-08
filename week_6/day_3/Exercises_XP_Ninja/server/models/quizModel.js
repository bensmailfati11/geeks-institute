// Quiz Model - Database operations using Knex
import db from '../config/db.js';

// Get all questions with their options
export const getAllQuestions = async () => {
  try {
    const questions = await db('questions')
      .select('questions.id', 'questions.question', 'questions.correct_answer')
      .orderBy('questions.id', 'asc');

    // Get options for each question
    for (let question of questions) {
      const options = await db('questions_options')
        .join('options', 'questions_options.option_id', 'options.id')
        .where('questions_options.question_id', question.id)
        .select('options.id', 'options.option');
      
      question.options = options;
    }

    return questions;
  } catch (error) {
    throw error;
  }
};

// Get a specific question with options
export const getQuestionById = async (id) => {
  try {
    const question = await db('questions')
      .where({ id })
      .select('id', 'question', 'correct_answer')
      .first();

    if (question) {
      const options = await db('questions_options')
        .join('options', 'questions_options.option_id', 'options.id')
        .where('questions_options.question_id', question.id)
        .select('options.id', 'options.option');
      
      question.options = options;
    }

    return question;
  } catch (error) {
    throw error;
  }
};

// Check answer
export const checkAnswer = async (questionId, answerId) => {
  try {
    const question = await db('questions')
      .where({ id: questionId })
      .select('correct_answer')
      .first();

    if (!question) {
      return { correct: false, message: 'Question not found' };
    }

    const isCorrect = question.correct_answer === parseInt(answerId);
    
    return {
      correct: isCorrect,
      correctAnswer: question.correct_answer
    };
  } catch (error) {
    throw error;
  }
};

// Get total number of questions
export const getTotalQuestions = async () => {
  try {
    const result = await db('questions').count('id as count').first();
    return parseInt(result.count);
  } catch (error) {
    throw error;
  }
};
