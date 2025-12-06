import express from "express";
const router = express.Router();

const triviaQuestions = [
  { question: "What is the capital of France?", answer: "Paris" },
  { question: "Which planet is known as the Red Planet?", answer: "Mars" },
  { question: "What is the largest mammal in the world?", answer: "Blue whale" },
];

let currentQuestionIndex = 0;
let score = 0;

// 🟢 GET /quiz 
router.get("/", (req, res) => {
  const question = triviaQuestions[currentQuestionIndex];
  if (!question) return res.redirect("/quiz/score");

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Trivia Quiz</title>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-gray-100 flex flex-col items-center justify-center min-h-screen">
      <div class="bg-white p-8 rounded-2xl shadow-md w-full max-w-md text-center">
        <h1 class="text-2xl font-bold text-blue-600 mb-4">Trivia Quiz</h1>
        <p class="text-lg font-medium mb-6">Question ${currentQuestionIndex + 1}: ${question.question}</p>
        <form action="/quiz" method="POST" class="space-y-4">
          <input type="text" name="answer" placeholder="Your answer..." required 
                 class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400" />
          <button type="submit" 
                  class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg">
            Submit
          </button>
        </form>
      </div>
    </body>
    </html>
  `);
});

// 🟡 POST /quiz => 
router.post("/", (req, res) => {
  const userAnswer = req.body.answer?.trim().toLowerCase();
  const correctAnswer = triviaQuestions[currentQuestionIndex].answer.toLowerCase();

  if (userAnswer === correctAnswer) score++;

  currentQuestionIndex++;
  if (currentQuestionIndex >= triviaQuestions.length) return res.redirect("/quiz/score");

  res.redirect("/quiz");
});

// 🔵 GET /quiz/scor

router.get("/score", (req, res) => {
  const total = triviaQuestions.length;
  const result = score;

 
  currentQuestionIndex = 0;
  score = 0;

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Score</title>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col items-center justify-center min-h-screen">
      <div class="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        <h1 class="text-3xl font-bold text-green-600 mb-4">🎉 Quiz Completed!</h1>
        <p class="text-lg mb-6">Your score: <span class="font-semibold text-blue-600">${result}</span> / ${total}</p>
        <a href="/quiz" 
           class="inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium">
          Play Again
        </a>
      </div>
    </body>
    </html>
  `);
});

export default router;
