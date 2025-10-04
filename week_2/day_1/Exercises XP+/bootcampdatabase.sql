-- Create database
CREATE DATABASE bootcamp;

-- Connect to the database (run this separately in pgAdmin or use the GUI to connect)
-- \c bootcamp

-- Create students table
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    last_name VARCHAR(50) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    birth_date DATE NOT NULL
);

-- Insert the given data
INSERT INTO students (first_name, last_name, birth_date) VALUES
('Marc', 'Benichou', '1998-11-02'),
('Yoan', 'Cohen', '2010-12-03'),
('Lea', 'Benichou', '1987-07-27'),
('Amelia', 'Dux', '1996-04-07'),
('David', 'Grez', '2003-06-14'),
('Omer', 'Simpson', '1980-10-03');

-- Insert your own data (REPLACE WITH YOUR ACTUAL BIRTH DATE)
INSERT INTO students (first_name, last_name, birth_date) VALUES
('YourFirstName', 'YourLastName', '2000-01-01'); -- Change this date!

-- Select all data from the table
SELECT '=== ALL STUDENTS ===' as result;
SELECT * FROM students;

-- Fetch all first_names and last_names
SELECT '=== ALL FIRST AND LAST NAMES ===' as result;
SELECT first_name, last_name FROM students;

-- For the following questions, only fetch first_names and last_names

-- Student with id = 2
SELECT '=== STUDENT WITH ID 2 ===' as result;
SELECT first_name, last_name FROM students WHERE id = 2;

-- Last_name is Benichou AND first_name is Marc
SELECT '=== BENICHOU AND MARC ===' as result;
SELECT first_name, last_name FROM students WHERE last_name = 'Benichou' AND first_name = 'Marc';

-- Last_names are Benichou OR first_names are Marc
SELECT '=== BENICHOU OR MARC ===' as result;
SELECT first_name, last_name FROM students WHERE last_name = 'Benichou' OR first_name = 'Marc';

-- First_names contain the letter a
SELECT '=== FIRST NAMES CONTAINING "a" ===' as result;
SELECT first_name, last_name FROM students WHERE first_name ILIKE '%a%';

-- First_names start with the letter a
SELECT '=== FIRST NAMES STARTING WITH "a" ===' as result;
SELECT first_name, last_name FROM students WHERE first_name ILIKE 'a%';

-- First_names end with the letter a
SELECT '=== FIRST NAMES ENDING WITH "a" ===' as result;
SELECT first_name, last_name FROM students WHERE first_name ILIKE '%a';

-- Second to last letter of first_names is a
SELECT '=== SECOND TO LAST LETTER IS "a" ===' as result;
SELECT first_name, last_name FROM students WHERE first_name ILIKE '%a_';

-- IDs equal to 1 AND 3
SELECT '=== IDS 1 AND 3 ===' as result;
SELECT first_name, last_name FROM students WHERE id IN (1, 3);

-- Birth_dates equal to or after 1/01/2000
SELECT '=== BORN ON OR AFTER 2000-01-01 ===' as result;
SELECT * FROM students WHERE birth_date >= '2000-01-01';