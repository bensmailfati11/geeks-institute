-- Exercise 1 : Bonus Public Database (Continuation of XP)

-- 1. Fetch the last 2 customers in alphabetical order (A-Z) – exclude ‘id’ from the results.
SELECT first_name, last_name, email 
FROM customers 
ORDER BY first_name DESC, last_name DESC 
LIMIT 2;

-- 2. Use SQL to delete all purchases made by Scott.
DELETE FROM purchases 
WHERE customer_id = (SELECT id FROM customers WHERE first_name = 'Scott' AND last_name = 'Scott');

-- 3. Does Scott still exist in the customers table, even though he has been deleted? Try and find him.
SELECT * FROM customers WHERE first_name = 'Scott' AND last_name = 'Scott';
-- Yes, Scott still exists in customers table. Only his purchases were deleted.

-- 4. Use SQL to find all purchases. Join purchases with the customers table so that Scott's order will appear with empty/blank names.
-- Using LEFT JOIN to include all purchases even if customer doesn't exist
SELECT p.*, COALESCE(c.first_name, '') as first_name, COALESCE(c.last_name, '') as last_name
FROM purchases p 
LEFT JOIN customers c ON p.customer_id = c.id;

-- 5. Use SQL to find all purchases. Join purchases with the customers table so that Scott's order will NOT appear.
-- Using INNER JOIN to only show purchases with existing customers
SELECT p.*, c.first_name, c.last_name
FROM purchases p 
INNER JOIN customers c ON p.customer_id = c.id;