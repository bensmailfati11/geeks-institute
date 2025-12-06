// app.js
const express = require('express');
const app = express();
const port = 3000;

const booksRoutes = require('./routes/books');

app.use(express.json());
app.use('/books', booksRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
