// server.js
const express = require("express");
const app = express();
const PORT = 3000;


app.use(express.static("public"));


const questions = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["Madrid", "Paris", "Berlin", "Rome"],
    correct: "Paris",
  },
  {
    id: 2,
    question: "Which language runs in a web browser?",
    options: ["Python", "C", "Java", "JavaScript"],
    correct: "JavaScript",
  },
  {
    id: 3,
    question: "Who invented JavaScript?",
    options: ["Tim Berners-Lee", "Brendan Eich", "Bill Gates", "Elon Musk"],
    correct: "Brendan Eich",
  },
];

// Endpoint 
app.get("/api/questions", (req, res) => {
  res.json(questions);
});


app.listen(PORT, () => console.log(` Server running on http://localhost:${PORT}`));

