-- Exercise 1: Items and customers
-- 1. All items, ordered by price (lowest to highest)
SELECT * FROM items ORDER BY price ASC;

-- 2. Items with a price above 80 (80 included), ordered by price (highest to lowest)
SELECT * FROM items WHERE price >= 80 ORDER BY price DESC;

-- 3. First 3 customers in alphabetical order of first name (A-Z) - exclude primary key
SELECT first_name, last_name, email FROM customers ORDER BY first_name ASC LIMIT 3;

-- 4. All last names only, in reverse alphabetical order (Z-A)
SELECT last_name FROM customers ORDER BY last_name DESC;

-- Exercise 2: dvdrental database
-- 1. Select all columns from "customer" table
SELECT * FROM customer;

-- 2. Display names using alias "full_name"
SELECT first_name || ' ' || last_name AS full_name FROM customer;

-- 3. Select all unique create_date from customer table
SELECT DISTINCT create_date FROM customer;

-- 4. All customer details in descending order by first name
SELECT * FROM customer ORDER BY first_name DESC;

-- 5. Film details in ascending order by rental rate
SELECT film_id, title, description, release_year, rental_rate FROM film ORDER BY rental_rate ASC;

-- 6. Address and phone of customers in Texas district
SELECT address, phone FROM address WHERE district = 'Texas';

-- 7. Movie details where film_id is 15 or 150
SELECT * FROM film WHERE film_id IN (15, 150);

-- 8. Check if favorite movie exists
SELECT film_id, title, description, length, rental_rate FROM film WHERE title = 'ACADEMY DINOSAUR';

-- 9. Movies starting with first two letters of favorite movie
SELECT film_id, title, description, length, rental_rate FROM film WHERE title LIKE 'AC%';

-- 10. 10 cheapest movies
SELECT film_id, title, rental_rate FROM film ORDER BY rental_rate ASC LIMIT 10;

-- 11. Next 10 cheapest movies (without LIMIT)
SELECT film_id, title, rental_rate FROM (
    SELECT film_id, title, rental_rate, ROW_NUMBER() OVER (ORDER BY rental_rate ASC) as row_num 
    FROM film
) ranked_films WHERE row_num BETWEEN 11 AND 20;

-- 12. Join customer and payment tables
SELECT c.first_name, c.last_name, p.amount, p.payment_date 
FROM customer c JOIN payment p ON c.customer_id = p.customer_id 
ORDER BY c.customer_id;

-- 13. Movies not in inventory
SELECT f.film_id, f.title FROM film f 
LEFT JOIN inventory i ON f.film_id = i.film_id 
WHERE i.inventory_id IS NULL;

-- 14. Find which city is in which country
SELECT ci.city, co.country FROM city ci JOIN country co ON ci.country_id = co.country_id;

-- 15. Bonus: Customer payments ordered by staff member
SELECT p.staff_id, c.customer_id, c.first_name, c.last_name, p.amount, p.payment_date 
FROM customer c JOIN payment p ON c.customer_id = p.customer_id 
ORDER BY p.staff_id;