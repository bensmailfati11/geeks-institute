// routes/posts.js
const express = require('express');
const router = express.Router();


let posts = [];
let idCounter = 1;

/**
 *  Helper function:
 */
function validatePostData(title, content) {
  if (!title || typeof title !== 'string' || title.trim() === '') {
    return 'Title is required and must be a non-empty string.';
  }
  if (!content || typeof content !== 'string' || content.trim() === '') {
    return 'Content is required and must be a non-empty string.';
  }
  return null;
}

/**
 * GET /posts
 * 
 */
router.get('/', (req, res) => {
  res.json(posts);
});

/**
 * GET /posts/:id
 * 
 */
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find(p => p.id === id);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  res.json(post);
});

/**
 *  POST /posts
 * 
 */
router.post('/', (req, res) => {
  const { title, content } = req.body;

  
  const error = validatePostData(title, content);
  if (error) {
    return res.status(400).json({ error });
  }

  const newPost = {
    id: idCounter++,
    title,
    content,
    timestamp: new Date().toISOString()
  };

  posts.push(newPost);
  res.status(201).json(newPost);
});

/**
 * PUT /posts/:id
 * 
 */
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find(p => p.id === id);

  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  const { title, content } = req.body;

  
  const error = validatePostData(title, content);
  if (error) {
    return res.status(400).json({ error });
  }

  post.title = title;
  post.content = content;
  post.timestamp = new Date().toISOString();

  res.json(post);
});

/**
 * DELETE /posts/:id
 * 
 */
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = posts.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }

  posts.splice(index, 1);
  res.json({ message: 'Post deleted successfully' });
});

module.exports = router;
