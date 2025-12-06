// routes/books.js
const express = require('express');
const router = express.Router();

let books = [];
let idCounter = 1;

// GET 
router.get('/', (req, res) => {
  res.json(books);
});

// POST 
router.post('/', (req, res) => {
  const { title, author } = req.body;
  const newBook = { id: idCounter++, title, author };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT 
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author } = req.body;
  const book = books.find(b => b.id === id);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  book.title = title;
  book.author = author;
  res.json(book);
});

// DELETE 
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  books = books.filter(b => b.id !== id);
  res.json({ message: 'Book deleted successfully' });
});

module.exports = router;
