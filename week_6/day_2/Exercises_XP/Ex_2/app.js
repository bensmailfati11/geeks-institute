// app.js
const express = require('express');
const app = express();
const port = 3000;

const todosRoutes = require('./routes/todos');

app.use(express.json()); 
app.use('/todos', todosRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
