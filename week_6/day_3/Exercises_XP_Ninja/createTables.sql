-- Create database tables for Quiz Game
-- Run this SQL in your PostgreSQL database

-- Create database (if not exists)
-- CREATE DATABASE quiz_db;

-- Connect to the database
-- \c quiz_db;

-- Create questions table
CREATE TABLE IF NOT EXISTS questions (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  correct_answer INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create options table
CREATE TABLE IF NOT EXISTS options (
  id SERIAL PRIMARY KEY,
  option TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create junction table for questions and options
CREATE TABLE IF NOT EXISTS questions_options (
  question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
  option_id INTEGER REFERENCES options(id) ON DELETE CASCADE,
  PRIMARY KEY (question_id, option_id)
);

-- Insert sample options
INSERT INTO options (option) VALUES
  ('JavaScript'),
  ('Python'),
  ('Java'),
  ('C++'),
  ('HTML'),
  ('CSS'),
  ('React'),
  ('Angular'),
  ('HTTP'),
  ('HTTPS'),
  ('FTP'),
  ('SMTP'),
  ('The Document Object Model'),
  ('Data Object Model'),
  ('Digital Optimization Method'),
  ('Document Optimization Module'),
  ('True'),
  ('False');

-- Insert sample questions
INSERT INTO questions (question, correct_answer) VALUES
  ('What does HTML stand for?', 5),
  ('Which programming language is primarily used for web development?', 1),
  ('What is the purpose of CSS?', 6),
  ('Which of the following is a JavaScript framework?', 7),
  ('What protocol is used for secure web browsing?', 10),
  ('Is JavaScript the same as Java?', 18);

-- Link questions with options
-- Question 1: What does HTML stand for?
INSERT INTO questions_options (question_id, option_id) VALUES
  (1, 5),  -- HTML (correct)
  (1, 1),  -- JavaScript
  (1, 2),  -- Python
  (1, 6);  -- CSS

-- Question 2: Which programming language is primarily used for web development?
INSERT INTO questions_options (question_id, option_id) VALUES
  (2, 1),  -- JavaScript (correct)
  (2, 2),  -- Python
  (2, 3),  -- Java
  (2, 4);  -- C++

-- Question 3: What is the purpose of CSS?
INSERT INTO questions_options (question_id, option_id) VALUES
  (3, 6),  -- CSS (correct)
  (3, 5),  -- HTML
  (3, 1),  -- JavaScript
  (3, 2);  -- Python

-- Question 4: Which of the following is a JavaScript framework?
INSERT INTO questions_options (question_id, option_id) VALUES
  (4, 7),  -- React (correct)
  (4, 2),  -- Python
  (4, 3),  -- Java
  (4, 5);  -- HTML

-- Question 5: What protocol is used for secure web browsing?
INSERT INTO questions_options (question_id, option_id) VALUES
  (5, 10), -- HTTPS (correct)
  (5, 9),  -- HTTP
  (5, 11), -- FTP
  (5, 12); -- SMTP

-- Question 6: Is JavaScript the same as Java?
INSERT INTO questions_options (question_id, option_id) VALUES
  (6, 18), -- False (correct)
  (6, 17); -- True

-- View all questions with their options
SELECT 
  q.id,
  q.question,
  o.id as option_id,
  o.option,
  CASE WHEN o.id = q.correct_answer THEN 'CORRECT' ELSE '' END as is_correct
FROM questions q
JOIN questions_options qo ON q.id = qo.question_id
JOIN options o ON qo.option_id = o.id
ORDER BY q.id, o.id;
