let currentQuestionIndex = 0;
let score = 0;
let questions = [];

const questionContainer = document.getElementById("question-container");
const nextBtn = document.getElementById("next-btn");
const scoreContainer = document.getElementById("score-container");


fetch("/api/questions")
  .then((res) => res.json())
  .then((data) => {
    questions = data;
    showQuestion();
  });

function showQuestion() {
  const q = questions[currentQuestionIndex];
  questionContainer.innerHTML = `
    <h2>${q.question}</h2>
    ${q.options.map(
      (option) =>
        `<div class="option" onclick="checkAnswer(this, '${option}', '${q.correct}')">${option}</div>`
    ).join("")}
  `;
}

function checkAnswer(element, selected, correct) {
  const options = document.querySelectorAll(".option");
  options.forEach((opt) => (opt.style.pointerEvents = "none"));

  if (selected === correct) {
    element.classList.add("correct");
    score++;
  } else {
    element.classList.add("wrong");
  }

  nextBtn.classList.remove("hidden");
}

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
    nextBtn.classList.add("hidden");
  } else {
    showScore();
  }
});

function showScore() {
  questionContainer.innerHTML = "";
  nextBtn.classList.add("hidden");
  scoreContainer.classList.remove("hidden");
  scoreContainer.innerHTML = `<h2>🎉 Your final score: ${score} / ${questions.length}</h2>`;
}
