-- Exercise 1: DVD Rental

-- 1. How many films for each rating
SELECT rating, COUNT(*) as film_count 
FROM film 
GROUP BY rating 
ORDER BY film_count DESC;

-- 2. Movies with rating G or PG-13
SELECT title, rating, length, rental_rate 
FROM film 
WHERE rating IN ('G', 'PG-13');

-- 3. Filtered list: G/PG-13, under 2 hours, rental under $3.00, sorted alphabetically
SELECT title, rating, length, rental_rate 
FROM film 
WHERE rating IN ('G', 'PG-13') 
  AND length < 120 
  AND rental_rate < 3.00 
ORDER BY title ASC;

-- 4. Update customer details to your details (replace with your info)
UPDATE customer 
SET first_name = 'YourFirstName', 
    last_name = 'YourLastName', 
    email = 'your.email@example.com' 
WHERE customer_id = 1;  -- Change the ID as needed

-- 5. Update customer address (replace with your address)
UPDATE address 
SET address = '123 Your Street', 
    address2 = 'Apt 4B', 
    district = 'Your District', 
    postal_code = '12345', 
    phone = '555-1234' 
WHERE address_id = (
    SELECT address_id FROM customer WHERE customer_id = 1  -- Match the customer ID from above
);

-- Exercise 2: students table

-- Update
-- 1. Update twins birth dates
UPDATE students 
SET birth_date = '1998-11-02' 
WHERE first_name IN ('Lea', 'Marc') AND last_name = 'Benichou';

-- 2. Change David's last name
UPDATE students 
SET last_name = 'Guez' 
WHERE first_name = 'David' AND last_name = 'Grez';

-- Delete
-- 3. Delete Lea Benichou
DELETE FROM students 
WHERE first_name = 'Lea' AND last_name = 'Benichou';

-- Count
-- 4. Count total students
SELECT COUNT(*) as total_students FROM students;

-- 5. Count students born after 2000
SELECT COUNT(*) as students_after_2000 
FROM students 
WHERE birth_date > '2000-01-01';

-- Insert / Alter
-- 6. Add math_grade column
ALTER TABLE students ADD COLUMN math_grade INTEGER;

-- 7. Add grade to student id 1
UPDATE students SET math_grade = 80 WHERE id = 1;

-- 8. Add grade to students with ids 2 or 4
UPDATE students SET math_grade = 90 WHERE id IN (2, 4);

-- 9. Add grade to student id 6
UPDATE students SET math_grade = 40 WHERE id = 6;

-- 10. Count students with grade > 83
SELECT COUNT(*) as students_above_83 
FROM students 
WHERE math_grade > 83;

-- 11. Add Omer Simpson with same birth_date
INSERT INTO students (first_name, last_name, birth_date, math_grade)
SELECT first_name, last_name, birth_date, 70 
FROM students 
WHERE first_name = 'Omer' AND last_name = 'Simpson' 
LIMIT 1;

-- If Omer Simpson doesn't exist, use this instead:
-- INSERT INTO students (first_name, last_name, birth_date, math_grade)
-- VALUES ('Omer', 'Simpson', (SELECT birth_date FROM students WHERE first_name = 'Omer' LIMIT 1), 70);

-- 12. Bonus: Count grades per student
SELECT first_name, last_name, COUNT(math_grade) as total_grades 
FROM students 
GROUP BY first_name, last_name;

-- SUM
-- 13. Sum of all grades
SELECT SUM(math_grade) as total_grades_sum FROM students;

-- Exercise 3: Items and customers

-- Part I
-- 1. Create purchases table
CREATE TABLE purchases (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id),
    item_id INTEGER REFERENCES items(id),
    quantity_purchased INTEGER NOT NULL
);

-- 2. Insert purchases using subqueries
-- Scott Scott bought one fan
INSERT INTO purchases (customer_id, item_id, quantity_purchased)
VALUES (
    (SELECT id FROM customers WHERE first_name = 'Scott' AND last_name = 'Scott'),
    (SELECT id FROM items WHERE item_name = 'fan'),
    1
);

-- Melanie Johnson bought ten large desks
INSERT INTO purchases (customer_id, item_id, quantity_purchased)
VALUES (
    (SELECT id FROM customers WHERE first_name = 'Melanie' AND last_name = 'Johnson'),
    (SELECT id FROM items WHERE item_name = 'large desk'),
    10
);

-- Greg Jones bought two small desks
INSERT INTO purchases (customer_id, item_id, quantity_purchased)
VALUES (
    (SELECT id FROM customers WHERE first_name = 'Greg' AND last_name = 'Jones'),
    (SELECT id FROM items WHERE item_name = 'small desk'),
    2
);

-- Part II
-- 3. All purchases
SELECT * FROM purchases;

-- 4. All purchases joined with customers
SELECT p.*, c.first_name, c.last_name 
FROM purchases p 
JOIN customers c ON p.customer_id = c.id;

-- 5. Purchases of customer with ID 5
SELECT * FROM purchases WHERE customer_id = 5;

-- 6. Purchases for large desk AND small desk
SELECT p.*, i.item_name 
FROM purchases p 
JOIN items i ON p.item_id = i.id 
WHERE i.item_name IN ('large desk', 'small desk');

-- 7. Customers who made purchases with item names
SELECT c.first_name, c.last_name, i.item_name 
FROM purchases p 
JOIN customers c ON p.customer_id = c.id 
JOIN items i ON p.item_id = i.id;

-- 8. Add row with customer reference but no item reference
INSERT INTO purchases (customer_id, item_id, quantity_purchased)
VALUES (1, NULL, 1);
-- This may or may not work depending on whether the item_id column allows NULL values
-- If it has NOT NULL constraint, it will fail