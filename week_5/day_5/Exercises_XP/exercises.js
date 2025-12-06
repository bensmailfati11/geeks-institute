// Exercise 1:

// server.js
// const express = require('express');
// const app = express();
// app.use(express.json()); 


// let posts = [
//   { id: 1, title: "First Post", content: "This is my first blog post" },
//   { id: 2, title: "Second Post", content: "Another interesting article" },
// ];

// //READ ALL
// app.get('/posts', (req, res) => {
//   res.json(posts);
// });

// // READ ONE
// app.get('/posts/:id', (req, res) => {
//   const post = posts.find(p => p.id === parseInt(req.params.id));
//   if (!post) return res.status(404).send("Post not found");
//   res.json(post);
// });

// // CREATE
// app.post('/posts', (req, res) => {
//   const newPost = {
//     id: posts.length + 1,
//     title: req.body.title,
//     content: req.body.content,
//   };
//   posts.push(newPost);
//   res.status(201).json(newPost);
// });

// // UPDATE
// app.put('/posts/:id', (req, res) => {
//   const post = posts.find(p => p.id === parseInt(req.params.id));
//   if (!post) return res.status(404).send("Post not found");

//   post.title = req.body.title;
//   post.content = req.body.content;
//   res.json(post);
// });

// // DELETE
// app.delete('/posts/:id', (req, res) => {
//   const postIndex = posts.findIndex(p => p.id === parseInt(req.params.id));
//   if (postIndex === -1) return res.status(404).send("Post not found");

//   posts.splice(postIndex, 1);
//   res.send("Post deleted successfully");
// });

// // Handling invalid routes
// app.use((req, res) => {
//   res.status(404).send("Route not found");
// });

// app.listen(3000, () => console.log("Server running on http://localhost:3000"));


/************************************************************* */

// Exercise 2:

// app.js
const express = require('express');
const app = express();
app.use(express.json());

let books = [
  { id: 1, title: "1984", author: "George Orwell", publishedYear: 1949 },
  { id: 2, title: "The Hobbit", author: "J.R.R. Tolkien", publishedYear: 1937 },
];

// READ ALL
app.get('/api/books', (req, res) => {
  res.json(books);
});

// READ ONE
app.get('/api/books/:bookId', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.bookId));
  if (!book) return res.status(404).send("Book not found");
  res.json(book);
});

// CREATE
app.post('/api/books', (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
    publishedYear: req.body.publishedYear,
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));




