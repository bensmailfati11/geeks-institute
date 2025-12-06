// Exercise 3 :
const express = require('express');
const { fetchPosts } = require('./dataService_ex_3');

const app = express();
const PORT = 5000;

app.get('/', (req, res) => {
  res.send('🚀 Welcome to CRUD API — try /api/posts');
});


app.get('/api/posts', async (req, res) => {
  try {
    const posts = await fetchPosts();
    console.log("Data fetched successfully");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
