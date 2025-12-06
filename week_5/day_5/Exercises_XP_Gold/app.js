// Exercise 1 :
// app.js
// const express = require('express');
// const axios = require('axios');
// const app = express();
// app.use(express.json());

// const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

// //READ ALL
// app.get('/api/posts', async (req, res) => {
//   try {
//     const response = await axios.get(BASE_URL);
//     res.json(response.data);
//   } catch (err) {
//     res.status(500).json({ error: 'Error fetching posts' });
//   }
// });

// // READ ONE
// app.get('/api/posts/:id', async (req, res) => {
//   try {
//     const response = await axios.get(`${BASE_URL}/${req.params.id}`);
//     res.json(response.data);
//   } catch (err) {
//     res.status(404).json({ error: 'Post not found' });
//   }
// });

// // CREATE
// app.post('/api/posts', async (req, res) => {
//   try {
//     const response = await axios.post(BASE_URL, req.body);
//     res.status(201).json(response.data);
//   } catch (err) {
//     res.status(500).json({ error: 'Error creating post' });
//   }
// });

// // UPDATE
// app.put('/api/posts/:id', async (req, res) => {
//   try {
//     const response = await axios.put(`${BASE_URL}/${req.params.id}`, req.body);
//     res.json(response.data);
//   } catch (err) {
//     res.status(500).json({ error: 'Error updating post' });
//   }
// });

// // DELETE
// app.delete('/api/posts/:id', async (req, res) => {
//   try {
//     await axios.delete(`${BASE_URL}/${req.params.id}`);
//     res.json({ message: 'Post deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ error: 'Error deleting post' });
//   }
// });

// app.listen(5000, () => console.log('Server running on http://localhost:5000'));



// *************************************************************
// Exercise 2 :

// app.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const users = []; 
const SECRET_KEY = "mysecretkey"; 

// REGISTER
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  const existingUser = users.find(u => u.username === username);
  if (existingUser) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.status(201).json({ message: 'User registered successfully' });
});

// LOGIN
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.status(401).json({ message: 'Invalid password' });

  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ message: 'Login successful', token });
});

// PROFILE 
app.get('/api/profile', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({ message: 'Welcome to your profile', user: decoded.username });
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
});

app.listen(5000, () => console.log('Server running on http://localhost:5000')); 

// ***************************************************************

// Exercise 3 :
// app.js
const express = require('express');
const app = express();
app.use(express.json());

let todos = [
  { id: 1, title: 'Learn Node.js', completed: false },
  { id: 2, title: 'Build an API', completed: true },
];

// CREATE
app.post('/api/todos', (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    title: req.body.title,
    completed: req.body.completed || false,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

//READ ALL
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

//READ ONE
app.get('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ message: 'Todo not found' });
  res.json(todo);
});

//UPDATE
app.put('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ message: 'Todo not found' });

  todo.title = req.body.title ?? todo.title;
  todo.completed = req.body.completed ?? todo.completed;

  res.json(todo);
});

// DELETE
app.delete('/api/todos/:id', (req, res) => {
  const index = todos.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Todo not found' });

  todos.splice(index, 1);
  res.json({ message: 'Todo deleted successfully' });
});

app.listen(5000, () => console.log('Todo API running on http://localhost:5000'));
