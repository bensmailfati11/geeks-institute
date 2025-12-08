// Todo Routes
import express from 'express';
import * as todoController from '../controllers/todoController.js';

const router = express.Router();

// GET /api/todos - Get all todos
router.get('/todos', todoController.getTodos);

// GET /api/todos/:id - Get a specific todo
router.get('/todos/:id', todoController.getTodoById);

// POST /api/todos - Create a new todo
router.post('/todos', todoController.createTodo);

// PUT /api/todos/:id - Update a todo
router.put('/todos/:id', todoController.updateTodo);

// DELETE /api/todos/:id - Delete a todo
router.delete('/todos/:id', todoController.deleteTodo);

export default router;
