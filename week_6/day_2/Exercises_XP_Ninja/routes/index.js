
// routes/index.js
const express = require('express');
const router = express.Router();


const emojis = ["😀", "🎉", "🌟", "🎈", "👋"];

/**
 *  GET /
 *
 */
router.get('/', (req, res) => {
  const emojiOptions = emojis
    .map(e => `<option value="${e}">${e}</option>`)
    .join('');

  res.send(`
    <html>
      <head>
        <title>Emoji Greeting App</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background: linear-gradient(to right, #ffecd2, #fcb69f);
            text-align: center;
            padding: 50px;
          }
          h1 {
            color: #333;
          }
          form {
            background: white;
            padding: 20px;
            border-radius: 10px;
            display: inline-block;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          }
          input, select, button {
            padding: 10px;
            margin: 10px;
            font-size: 16px;
            border-radius: 5px;
            border: 1px solid #ccc;
          }
          button {
            background-color: #ff7f50;
            color: white;
            border: none;
            cursor: pointer;
          }
          button:hover {
            background-color: #ff6347;
          }
        </style>
      </head>
      <body>
        <h1>Welcome to Emoji Greeting App!</h1>
        <form action="/greet" method="POST">
          <input type="text" name="name" placeholder="Enter your name" required />
          <select name="emoji">
            ${emojiOptions}
          </select>
          <button type="submit">Greet Me</button>
        </form>
      </body>
    </html>
  `);
});

/**
 * 🟢 POST /greet
 *
 */
router.post('/greet', (req, res) => {
  const { name, emoji } = req.body;


  if (!name || name.trim() === '') {
    return res.send(`
      <p style="color:red; font-size:20px;">⚠️ Please enter your name!</p>
      <a href="/">Go back</a>
    `);
  }

  res.send(`
    <html>
      <head>
        <title>Greeting</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background: linear-gradient(to right, #a1c4fd, #c2e9fb);
            text-align: center;
            padding: 50px;
          }
          h1 {
            color: #333;
            font-size: 2.5rem;
          }
          a {
            display: inline-block;
            margin-top: 20px;
            text-decoration: none;
            color: white;
            background: #007bff;
            padding: 10px 20px;
            border-radius: 5px;
          }
          a:hover {
            background: #0056b3;
          }
        </style>
      </head>
      <body>
        <h1>${emoji} Hello, ${name}! ${emoji}</h1>
        <p>We're happy to see you here!</p>
        <a href="/">Back to Home</a>
      </body>
    </html>
  `);
});

module.exports = router;
