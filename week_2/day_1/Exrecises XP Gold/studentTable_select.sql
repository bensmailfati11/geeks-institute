-- =============================================
-- STUDENTS TABLE SELECT QUERIES
-- =============================================

-- Create and populate the students table
CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    last_name VARCHAR(50) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    birth_date DATE NOT NULL
);

-- Clear existing data and reset sequence
TRUNCATE TABLE students RESTART IDENTITY;

-- Insert sample data
INSERT INTO students (first_name, last_name, birth_date) VALUES
('Marc', 'Benichou', '1998-11-02'),
('Yoan', 'Cohen', '2010-12-03'),
('Lea', 'Benichou', '1987-07-27'),
('Amelia', 'Dux', '1996-04-07'),
('David', 'Grez', '2003-06-14'),
('Omer', 'Simpson', '1980-10-03'),
('Emma', 'Johnson', '2001-03-15'),
('Lucas', 'Brown', '1999-08-22');

-- Query 1: Fetch the first four students ordered alphabetically by last_name
SELECT '=== FIRST FOUR STUDENTS ORDERED BY LAST_NAME ===' as query_result;
SELECT first_name, last_name, birth_date 
FROM students 
ORDER BY last_name 
LIMIT 4;

-- Query 2: Fetch the details of the youngest student
SELECT '=== YOUNGEST STUDENT ===' as query_result;
SELECT first_name, last_name, birth_date 
FROM students 
ORDER BY birth_date DESC 
LIMIT 1;

-- Query 3: Fetch three students skipping the first two students
SELECT '=== THREE STUDENTS SKIPPING FIRST TWO ===' as query_result;
SELECT first_name, last_name, birth_date 
FROM students 
OFFSET 2 
LIMIT 3;