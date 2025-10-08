-- Daily Challenge: SQL Puzzle

-- Create and populate tables
CREATE TABLE FirstTab (id integer, name VARCHAR(10));
INSERT INTO FirstTab VALUES (5,'Pawan'), (6,'Sharlee'), (7,'Krish'), (NULL,'Avtaar');

CREATE TABLE SecondTab (id integer);
INSERT INTO SecondTab VALUES (5), (NULL);

-- Q1: OUTPUT = 0
-- Reason: Subquery returns NULL, NOT IN with NULL always returns UNKNOWN
SELECT COUNT(*) FROM FirstTab AS ft WHERE ft.id NOT IN (SELECT id FROM SecondTab WHERE id IS NULL);

-- Q2: OUTPUT = 2  
-- Reason: Subquery returns 5, matches ids 6 and 7 (NOT IN 5), NULL excluded
SELECT COUNT(*) FROM FirstTab AS ft WHERE ft.id NOT IN (SELECT id FROM SecondTab WHERE id = 5);

-- Q3: OUTPUT = 0
-- Reason: Subquery returns 5 and NULL, NOT IN with NULL returns UNKNOWN for all rows
SELECT COUNT(*) FROM FirstTab AS ft WHERE ft.id NOT IN (SELECT id FROM SecondTab);

-- Q4: OUTPUT = 2
-- Reason: Subquery returns only 5 (NULL filtered out), matches ids 6 and 7
SELECT COUNT(*) FROM FirstTab AS ft WHERE ft.id NOT IN (SELECT id FROM SecondTab WHERE id IS NOT NULL);

-- Cleanup
DROP TABLE FirstTab;
DROP TABLE SecondTab;