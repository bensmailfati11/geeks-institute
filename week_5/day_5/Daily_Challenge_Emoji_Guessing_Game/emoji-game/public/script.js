let score = 0;
let correctAnswer = "";

const emojiContainer = document.getElementById("emoji-container");
const quizForm = document.getElementById("quiz-form");
const feedback = document.getElementById("feedback");
const scoreDisplay = document.getElementById("score");
const leaderboardDiv = document.getElementById("leaderboard");

async function fetchEmoji() {
  const res = await fetch("/api/emoji");
  const data = await res.json();

  emojiContainer.textContent = data.emoji;
  correctAnswer = data.correct;

  quizForm.innerHTML = "";
  data.options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.type = "button";
    btn.onclick = () => submitGuess(opt);
    quizForm.appendChild(btn);
  });
}

async function submitGuess(guess) {
  const res = await fetch("/api/guess", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ guess, correct: correctAnswer, score }),
  });

  const data = await res.json();
  feedback.textContent = data.message;
  score = data.newScore;
  scoreDisplay.textContent = score;

  setTimeout(fetchEmoji, 1000); 
}

async function showLeaderboard() {
  const res = await fetch("/api/leaderboard");
  const data = await res.json();

  leaderboardDiv.innerHTML = "<h3>🏆 Leaderboard</h3>" +
    data.leaderboard.map((p, i) => `<p>${i + 1}. ${p.name} - ${p.score}</p>`).join("");
}


async function saveScore() {
  const name = prompt("Enter your name for the leaderboard:");
  if (!name) return;
  await fetch("/api/leaderboard", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, score }),
  });
  showLeaderboard();
}

fetchEmoji();
