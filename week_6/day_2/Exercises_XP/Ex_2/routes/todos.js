// routes/todos.js
const express = require('express');
const router = express.Router();

let todos = []; 
let idCounter = 1;

// GET 
router.get('/', (req, res) => {
  res.json(todos);
});

// POST
router.post('/', (req, res) => {
  const { title } = req.body;
  const newTodo = { id: idCounter++, title };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT 
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title } = req.body;
  const todo = todos.find(t => t.id === id);
  if (!todo) return res.status(404).json({ message: 'Todo not found' });
  todo.title = title;
  res.json(todo);
});

// DELETE
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(t => t.id !== id);
  res.json({ message: 'Todo deleted successfully' });
});

module.exports = router;
