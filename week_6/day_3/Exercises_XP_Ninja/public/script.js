// Quiz Game JavaScript
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let totalQuestions = 0;
let timer = null;
let timeLeft = 30;

// DOM Elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const nextBtn = document.getElementById('next-btn');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const feedback = document.getElementById('feedback');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');
const scoreSpan = document.getElementById('score');
const timerSpan = document.getElementById('timer');
const timerContainer = document.getElementById('timer-container');

// Event Listeners
startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', restartQuiz);
nextBtn.addEventListener('click', nextQuestion);

// Fetch questions from API
async function fetchQuestions() {
    try {
        const response = await fetch('/api/questions');
        const data = await response.json();
        
        if (data.success) {
            questions = data.data;
            totalQuestions = questions.length;
            totalQuestionsSpan.textContent = totalQuestions;
            return true;
        } else {
            throw new Error('Failed to fetch questions');
        }
    } catch (error) {
        console.error('Error fetching questions:', error);
        alert('Error loading questions. Please try again.');
        return false;
    }
}

// Start quiz
async function startQuiz() {
    const loaded = await fetchQuestions();
    
    if (!loaded || questions.length === 0) {
        alert('No questions available. Please check the database.');
        return;
    }

    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = score;
    
    startScreen.classList.remove('active');
    quizScreen.classList.add('active');
    
    displayQuestion();
}

// Display current question
function displayQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showResults();
        return;
    }

    const question = questions[currentQuestionIndex];
    
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    questionText.textContent = question.question;
    optionsContainer.innerHTML = '';
    feedback.innerHTML = '';
    feedback.className = 'feedback';
    nextBtn.style.display = 'none';

    // Create option buttons
    question.options.forEach(option => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.textContent = option.option;
        optionDiv.dataset.id = option.id;
        optionDiv.addEventListener('click', () => selectOption(optionDiv, question.id, option.id));
        optionsContainer.appendChild(optionDiv);
    });

    // Optional: Start timer
    // startTimer();
}

// Select option
async function selectOption(selectedDiv, questionId, answerId) {
    // Disable all options
    const allOptions = optionsContainer.querySelectorAll('.option');
    allOptions.forEach(opt => {
        opt.classList.add('disabled');
        opt.style.pointerEvents = 'none';
    });

    selectedDiv.classList.add('selected');

    // Submit answer to server
    try {
        const response = await fetch('/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                questionId: questionId,
                answerId: answerId
            })
        });

        const data = await response.json();

        if (data.success) {
            if (data.correct) {
                score++;
                scoreSpan.textContent = score;
                selectedDiv.classList.remove('selected');
                selectedDiv.classList.add('correct');
                feedback.textContent = '✓ Correct! Great job!';
                feedback.classList.add('correct');
            } else {
                selectedDiv.classList.remove('selected');
                selectedDiv.classList.add('incorrect');
                
                // Highlight correct answer
                allOptions.forEach(opt => {
                    if (parseInt(opt.dataset.id) === data.correctAnswer) {
                        opt.classList.add('correct');
                    }
                });
                
                feedback.textContent = '✗ Incorrect. The correct answer is highlighted.';
                feedback.classList.add('incorrect');
            }

            nextBtn.style.display = 'block';
        }
    } catch (error) {
        console.error('Error submitting answer:', error);
        alert('Error submitting answer. Please try again.');
    }

    // Stop timer
    // clearInterval(timer);
}

// Next question
function nextQuestion() {
    currentQuestionIndex++;
    displayQuestion();
}

// Show results
function showResults() {
    quizScreen.classList.remove('active');
    resultsScreen.classList.add('active');

    const percentage = Math.round((score / totalQuestions) * 100);

    document.getElementById('final-score').textContent = score;
    document.getElementById('correct-answers').textContent = score;
    document.getElementById('total-answered').textContent = totalQuestions;
    document.getElementById('percentage').textContent = percentage + '%';

    // Performance message
    const performanceMessage = document.getElementById('performance-message');
    if (percentage >= 90) {
        performanceMessage.textContent = '🌟 Excellent! You\'re a quiz master!';
        performanceMessage.className = 'performance-message excellent';
    } else if (percentage >= 70) {
        performanceMessage.textContent = '👍 Good job! Keep it up!';
        performanceMessage.className = 'performance-message good';
    } else if (percentage >= 50) {
        performanceMessage.textContent = '👌 Fair! You can do better!';
        performanceMessage.className = 'performance-message fair';
    } else {
        performanceMessage.textContent = '📚 Keep practicing! You\'ll improve!';
        performanceMessage.className = 'performance-message poor';
    }
}

// Restart quiz
function restartQuiz() {
    resultsScreen.classList.remove('active');
    startScreen.classList.add('active');
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = score;
    currentQuestionSpan.textContent = 0;
}

// Optional: Timer functionality
function startTimer() {
    timeLeft = 30;
    timerContainer.style.display = 'block';
    timerSpan.textContent = timeLeft;
    
    timer = setInterval(() => {
        timeLeft--;
        timerSpan.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            // Auto-submit or move to next question
            nextQuestion();
        }
    }, 1000);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('Quiz Game Loaded');
});
