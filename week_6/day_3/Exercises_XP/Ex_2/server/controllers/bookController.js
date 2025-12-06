import { books } from "../models/bookModel.js";

export const getAllBooks = (req, res) => {
  res.json(books);
};

export const getBookById = (req, res) => {
  const bookId = parseInt(req.params.bookId);
  const book = books.find(b => b.id === bookId);
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
};

export const createBook = (req, res) => {
  const { title, author, publishedYear } = req.body;
  const newBook = {
    id: books.length + 1,
    title,
    author,
    publishedYear
  };
  books.push(newBook);
  res.status(201).json(newBook);
};
