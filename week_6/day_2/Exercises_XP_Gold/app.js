// app.js
const express = require('express');
const app = express();
const port = 3000;

// Middleware 
app.use(express.json());


const postsRouter = require('./routes/posts');


app.use('/posts', postsRouter);


app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
