// app.js
const express = require('express');
const app = express();
const port = 3000;


app.use(express.urlencoded({ extended: true }));


const routes = require('./routes/index');
app.use('/', routes);


app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});