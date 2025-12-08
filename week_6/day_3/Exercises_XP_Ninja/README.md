# Exercises XP Ninja - Quiz Game

Exercise 1: Quiz Game with database connection using Express and Knex.

## Project Structure

```
Exercises_XP_Ninja/
├── .gitignore
├── package.json
├── server.js                    # Main server file
├── createTables.js             # Script to create database tables
├── createTables.sql            # SQL script (alternative method)
├── public/                     # Frontend files
│   ├── index.html              # Quiz interface
│   ├── style.css               # Styling
│   └── script.js               # Client-side logic
└── server/
    ├── config/
    │   └── db.js               # Database configuration
    ├── controllers/
    │   └── quizController.js   # Business logic
    ├── models/
    │   └── quizModel.js        # Database operations
    └── routes/
        └── quizRoutes.js       # API routes
```

## Features

### Core Features ✅
- Multiple-choice questions
- One question at a time display
- Answer selection and submission
- Immediate feedback on correctness
- Score tracking
- Final score display with performance message
- Beautiful, responsive UI

### Advanced Features (Optional) 🚀
- Timer for each question (code included, commented out)
- Performance messages based on percentage
- Restart quiz functionality
- Animated transitions
- Mobile-responsive design

## Database Schema

### Questions Table
| Column         | Type      | Constraints    |
|----------------|-----------|----------------|
| id             | SERIAL    | PRIMARY KEY    |
| question       | TEXT      | NOT NULL       |
| correct_answer | INTEGER   | NOT NULL       |
| created_at     | TIMESTAMP | DEFAULT NOW()  |

### Options Table
| Column     | Type      | Constraints    |
|------------|-----------|----------------|
| id         | SERIAL    | PRIMARY KEY    |
| option     | TEXT      | NOT NULL       |
| created_at | TIMESTAMP | DEFAULT NOW()  |

### Questions_Options Table (Junction)
| Column      | Type    | Constraints                      |
|-------------|---------|----------------------------------|
| question_id | INTEGER | FOREIGN KEY → questions(id)      |
| option_id   | INTEGER | FOREIGN KEY → options(id)        |
| PRIMARY KEY | (question_id, option_id)         |

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Database

Edit `server/config/db.js` and update with your PostgreSQL credentials:

```javascript
const db = knex({
  client: 'pg',
  connection: {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'your_password', // Change this
    database: 'quiz_db'
  }
});
```

### 3. Create Database

Create the PostgreSQL database:

```sql
CREATE DATABASE quiz_db;
```

### 4. Create Tables and Insert Sample Data

**Option 1: Using Node.js script (recommended)**
```bash
npm run create-tables
```

**Option 2: Using SQL file**
```bash
psql -U postgres -d quiz_db -f createTables.sql
```

### 5. Start the Server

```bash
npm start
# Or for development with auto-reload:
npm run dev
```

### 6. Open the Quiz Game

Open your browser and navigate to:
```
http://localhost:3000
```

## API Endpoints

### 1. Get All Questions
```
GET /api/questions
```
Returns all questions with their options (without correct answers).

### 2. Get Specific Question
```
GET /api/questions/:id
```
Returns a specific question with options.

### 3. Submit Answer
```
POST /api/submit
Content-Type: application/json

{
  "questionId": 1,
  "answerId": 5
}
```
Returns whether the answer is correct and the correct answer ID.

### 4. Get Quiz Stats
```
GET /api/stats
```
Returns total number of questions.

## How to Play

1. **Start**: Click "Start Quiz" button
2. **Answer**: Read the question and select an option
3. **Feedback**: Get immediate feedback on your answer
4. **Next**: Click "Next Question" to proceed
5. **Results**: View your final score and performance message
6. **Restart**: Click "Play Again" to retry

## Sample Questions Included

The application comes with 6 sample questions:
1. What does HTML stand for?
2. Which programming language is primarily used for web development?
3. What is the purpose of CSS?
4. Which of the following is a JavaScript framework?
5. What protocol is used for secure web browsing?
6. Is JavaScript the same as Java?

## Customization

### Add More Questions

**Using SQL:**
```sql
-- Insert option
INSERT INTO options (option) VALUES ('Your Option');

-- Insert question
INSERT INTO questions (question, correct_answer) 
VALUES ('Your Question?', option_id);

-- Link question with options
INSERT INTO questions_options (question_id, option_id) 
VALUES (question_id, option_id);
```

### Enable Timer Feature

Uncomment the timer code in `public/script.js`:
1. Uncomment `startTimer()` call in `displayQuestion()` function
2. Uncomment the timer div visibility in HTML if needed

```javascript
// In displayQuestion() function
startTimer(); // Uncomment this line
```

### Change Timer Duration

Edit the `startTimer()` function in `public/script.js`:
```javascript
function startTimer() {
  timeLeft = 30; // Change this value (in seconds)
  // ... rest of the code
}
```

## Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL with Knex.js
- **Architecture**: MVC (Model-View-Controller)

## Performance Messages

Based on your score percentage:
- **90-100%**: 🌟 Excellent! You're a quiz master!
- **70-89%**: 👍 Good job! Keep it up!
- **50-69%**: 👌 Fair! You can do better!
- **0-49%**: 📚 Keep practicing! You'll improve!

## Responsive Design

The quiz game is fully responsive and works on:
- 📱 Mobile devices
- 📱 Tablets
- 💻 Desktop computers

## Error Handling

- Network error handling
- Database connection error handling
- Invalid input validation
- User-friendly error messages

## Future Enhancements (Optional)

- [ ] Different difficulty levels
- [ ] True/False questions
- [ ] Fill in the blank questions
- [ ] User authentication
- [ ] Leaderboard with top scores
- [ ] Save scores to database
- [ ] Question categories
- [ ] Random question order
- [ ] Sound effects

## License

ISC
