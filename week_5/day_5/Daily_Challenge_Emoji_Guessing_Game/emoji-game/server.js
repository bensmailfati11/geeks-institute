// server.js
const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(express.json());

const emojis = [
  { emoji: "😀", name: "Smile" },
  { emoji: "🐶", name: "Dog" },
  { emoji: "🍕", name: "Pizza" },
  { emoji: "🚗", name: "Car" },
  { emoji: "🌮", name: "Taco" },
  { emoji: "🐱", name: "Cat" },
  { emoji: "⚽", name: "Football" },
  { emoji: "🎵", name: "Music" },
];

let leaderboard = [];


app.get("/api/emoji", (req, res) => {
  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

 
  const options = [randomEmoji.name];
  while (options.length < 4) {
    const randomOption = emojis[Math.floor(Math.random() * emojis.length)].name;
    if (!options.includes(randomOption)) options.push(randomOption);
  }

  options.sort(() => Math.random() - 0.5);

  res.json({
    emoji: randomEmoji.emoji,
    correct: randomEmoji.name,
    options,
  });
});


app.post("/api/guess", (req, res) => {
  const { guess, correct, score } = req.body;
  let newScore = score;
  let message = "";

  if (guess === correct) {
    newScore++;
    message = "Correct!";
  } else {
    message = " Wrong! The correct answer was " + correct;
  }

  res.json({ message, newScore });
});


app.post("/api/leaderboard", (req, res) => {
  const { name, score } = req.body;
  leaderboard.push({ name, score });
  leaderboard.sort((a, b) => b.score - a.score);
  leaderboard = leaderboard.slice(0, 5); // top 5 only
  res.json({ leaderboard });
});

app.get("/api/leaderboard", (req, res) => {
  res.json({ leaderboard });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
