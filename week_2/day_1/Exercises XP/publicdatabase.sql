-- Create tables
CREATE TABLE IF NOT EXISTS items (
    item_id SERIAL PRIMARY KEY,
    item_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS customers (
    customer_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL
);

-- Insert items
INSERT INTO items (item_name, price) VALUES
('Small Desk', 100),
('Large desk', 300),
('Fan', 80);

-- Insert customers
INSERT INTO customers (first_name, last_name) VALUES
('Greg', 'Jones'),
('Sandra', 'Jones'),
('Scott', 'Scott'),
('Trevor', 'Green'),
('Melanie', 'Johnson');

-- Query 1: All the items
SELECT '=== ALL ITEMS ===' as result;
SELECT * FROM items;

-- Query 2: All items with price above 80 (80 not included)
SELECT '=== ITEMS PRICE > 80 ===' as result;
SELECT * FROM items WHERE price > 80;

-- Query 3: All items with price below 300 (300 included)
SELECT '=== ITEMS PRICE <= 300 ===' as result;
SELECT * FROM items WHERE price <= 300;

-- Query 4: All customers whose last name is 'Smith'
SELECT '=== CUSTOMERS LAST NAME SMITH ===' as result;
SELECT * FROM customers WHERE last_name = 'Smith';

-- Query 5: All customers whose last name is 'Jones'
SELECT '=== CUSTOMERS LAST NAME JONES ===' as result;
SELECT * FROM customers WHERE last_name = 'Jones';

-- Query 6: All customers whose firstname is not 'Scott'
SELECT '=== CUSTOMERS FIRST NAME NOT SCOTT ===' as result;
SELECT * FROM customers WHERE first_name != 'Scott';