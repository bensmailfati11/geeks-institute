-- Create tasks table for Todo List API
-- Run this SQL in your PostgreSQL database

-- Create database (if not exists)
-- CREATE DATABASE todo_db;

-- Connect to the database
-- \c todo_db;

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO tasks (title, completed) VALUES
  ('Complete Node.js exercises', false),
  ('Learn Express framework', false),
  ('Practice SQL queries', true),
  ('Build a REST API', false);

-- View all tasks
SELECT * FROM tasks;
