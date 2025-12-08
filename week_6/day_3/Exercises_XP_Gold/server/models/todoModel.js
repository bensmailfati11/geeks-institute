// Todo Model - Database operations using Knex
import db from '../config/db.js';

// Get all todos
export const getAllTodos = async () => {
  try {
    const todos = await db('tasks').select('*').orderBy('id', 'asc');
    return todos;
  } catch (error) {
    throw error;
  }
};

// Get a specific todo by ID
export const getTodoById = async (id) => {
  try {
    const todo = await db('tasks').where({ id }).first();
    return todo;
  } catch (error) {
    throw error;
  }
};

// Create a new todo
export const createTodo = async (todoData) => {
  try {
    const [newTodo] = await db('tasks')
      .insert(todoData)
      .returning('*');
    return newTodo;
  } catch (error) {
    throw error;
  }
};

// Update a todo
export const updateTodo = async (id, todoData) => {
  try {
    const [updatedTodo] = await db('tasks')
      .where({ id })
      .update(todoData)
      .returning('*');
    return updatedTodo;
  } catch (error) {
    throw error;
  }
};

// Delete a todo
export const deleteTodo = async (id) => {
  try {
    const deleted = await db('tasks').where({ id }).del();
    return deleted;
  } catch (error) {
    throw error;
  }
};
