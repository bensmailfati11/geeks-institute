// Todo Controller - Business logic
import * as todoModel from '../models/todoModel.js';

// Get all todos
export const getTodos = async (req, res) => {
  try {
    const todos = await todoModel.getAllTodos();
    res.status(200).json({
      success: true,
      data: todos
    });
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching todos',
      error: error.message
    });
  }
};

// Get a specific todo by ID
export const getTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate ID
    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid todo ID'
      });
    }

    const todo = await todoModel.getTodoById(id);
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    res.status(200).json({
      success: true,
      data: todo
    });
  } catch (error) {
    console.error('Error fetching todo:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching todo',
      error: error.message
    });
  }
};

// Create a new todo
export const createTodo = async (req, res) => {
  try {
    const { title, completed } = req.body;

    // Validate required fields
    if (!title || title.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Title is required'
      });
    }

    const todoData = {
      title: title.trim(),
      completed: completed || false
    };

    const newTodo = await todoModel.createTodo(todoData);

    res.status(201).json({
      success: true,
      message: 'Todo created successfully',
      data: newTodo
    });
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating todo',
      error: error.message
    });
  }
};

// Update a todo
export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    // Validate ID
    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid todo ID'
      });
    }

    // Check if todo exists
    const existingTodo = await todoModel.getTodoById(id);
    if (!existingTodo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    // Validate at least one field to update
    if (title === undefined && completed === undefined) {
      return res.status(400).json({
        success: false,
        message: 'No data provided to update'
      });
    }

    const todoData = {};
    if (title !== undefined) todoData.title = title.trim();
    if (completed !== undefined) todoData.completed = completed;

    const updatedTodo = await todoModel.updateTodo(id, todoData);

    res.status(200).json({
      success: true,
      message: 'Todo updated successfully',
      data: updatedTodo
    });
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating todo',
      error: error.message
    });
  }
};

// Delete a todo
export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid todo ID'
      });
    }

    // Check if todo exists
    const existingTodo = await todoModel.getTodoById(id);
    if (!existingTodo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    await todoModel.deleteTodo(id);

    res.status(200).json({
      success: true,
      message: 'Todo deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting todo',
      error: error.message
    });
  }
};
