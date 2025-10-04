-- =============================================
-- DAILY CHALLENGE: STUDENTS TABLE
-- =============================================

-- 1. Count how many students are in the table
SELECT 'QUESTION 1: How many students are in the table?' as question;
SELECT COUNT(*) as answer FROM students;

-- 2. Try to add a new student with some blank fields
SELECT 'QUESTION 2: What happens when we add a student with blank fields?' as question;

-- Show current table state
SELECT 'Current students in table:' as current_state;
SELECT * FROM students;

-- Attempt to insert with blank last_name field
DO $$
BEGIN
    INSERT INTO students (first_name, last_name, birth_date) 
    VALUES ('John', NULL, '1995-05-15');
    
    RAISE NOTICE 'Insert succeeded unexpectedly';
EXCEPTION 
    WHEN not_null_violation THEN
        RAISE NOTICE 'Insert failed: NULL value violates NOT NULL constraint';
END $$;

-- Show final table state to confirm no new record was added
SELECT 'Final table state (no changes):' as final_state;
SELECT * FROM students;

-- Summary of results
SELECT '=== SUMMARY ===' as summary;
SELECT 
    'Answer to Question 1: ' || (SELECT COUNT(*) FROM students)::text as answer1,
    'Answer to Question 2: Insert will FAIL due to NOT NULL constraints' as answer2;