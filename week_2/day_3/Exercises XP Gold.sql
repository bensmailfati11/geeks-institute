-- Exercise 1 : DVD Rentals

-- 1. Get all rentals which are out (not returned)
SELECT rental_id, inventory_id, rental_date, customer_id
FROM rental 
WHERE return_date IS NULL;

-- 2. Get customers who have not returned rentals (grouped)
SELECT 
    c.customer_id,
    c.first_name,
    c.last_name,
    COUNT(r.rental_id) AS outstanding_rentals
FROM customer c
JOIN rental r ON c.customer_id = r.customer_id
WHERE r.return_date IS NULL
GROUP BY c.customer_id, c.first_name, c.last_name
ORDER BY outstanding_rentals DESC;

-- 3. Get Action films with Joe Swank
SELECT 
    f.film_id,
    f.title,
    f.description,
    f.release_year,
    c.name AS category
FROM film f
JOIN film_category fc ON f.film_id = fc.film_id
JOIN category c ON fc.category_id = c.category_id
JOIN film_actor fa ON f.film_id = fa.film_id
JOIN actor a ON fa.actor_id = a.actor_id
WHERE c.name = 'Action'
AND a.first_name = 'Joe'
AND a.last_name = 'Swank';

-- Using a view (if available) - check if view exists
SELECT * FROM actor_film_category_view 
WHERE actor_first_name = 'Joe' 
AND actor_last_name = 'Swank' 
AND category_name = 'Action';


-- Exercise 2 – Happy Halloween

-- 1. Stores with city and country
SELECT 
    s.store_id,
    a.address,
    a.district,
    c.city,
    co.country
FROM store s
JOIN address a ON s.address_id = a.address_id
JOIN city c ON a.city_id = c.city_id
JOIN country co ON c.country_id = co.country_id;

-- 2. Total viewing hours per store (only returned items)
SELECT 
    i.store_id,
    SUM(f.length) AS total_minutes,
    ROUND(SUM(f.length) / 60.0, 2) AS total_hours,
    ROUND(SUM(f.length) / 60.0 / 24.0, 2) AS total_days
FROM inventory i
JOIN film f ON i.film_id = f.film_id
JOIN rental r ON i.inventory_id = r.inventory_id
WHERE r.return_date IS NOT NULL
GROUP BY i.store_id;

-- 3. Customers in cities where stores are located
SELECT DISTINCT
    c.customer_id,
    c.first_name,
    c.last_name,
    ci.city,
    co.country
FROM customer c
JOIN address a ON c.address_id = a.address_id
JOIN city ci ON a.city_id = ci.city_id
JOIN country co ON ci.country_id = co.country_id
WHERE ci.city_id IN (
    SELECT DISTINCT c2.city_id
    FROM store s
    JOIN address a2 ON s.address_id = a2.address_id
    JOIN city c2 ON a2.city_id = c2.city_id
);

-- 4. Customers in countries where stores are located
SELECT DISTINCT
    c.customer_id,
    c.first_name,
    c.last_name,
    ci.city,
    co.country
FROM customer c
JOIN address a ON c.address_id = a.address_id
JOIN city ci ON a.city_id = ci.city_id
JOIN country co ON ci.country_id = co.country_id
WHERE co.country_id IN (
    SELECT DISTINCT co2.country_id
    FROM store s
    JOIN address a2 ON s.address_id = a2.address_id
    JOIN city c2 ON a2.city_id = c2.city_id
    JOIN country co2 ON c2.country_id = co2.country_id
);

-- 5. Safe list movies (no horror, no scary words) with viewing time
SELECT 
    SUM(f.length) AS total_minutes,
    ROUND(SUM(f.length) / 60.0, 2) AS total_hours,
    ROUND(SUM(f.length) / 60.0 / 24.0, 2) AS total_days
FROM film f
WHERE f.film_id NOT IN (
    SELECT fc.film_id
    FROM film_category fc
    JOIN category c ON fc.category_id = c.category_id
    WHERE c.name = 'Horror'
)
AND (
    f.title NOT ILIKE '%beast%'
    AND f.title NOT ILIKE '%monster%'
    AND f.title NOT ILIKE '%ghost%'
    AND f.title NOT ILIKE '%dead%'
    AND f.title NOT ILIKE '%zombie%'
    AND f.title NOT ILIKE '%undead%'
    AND f.description NOT ILIKE '%beast%'
    AND f.description NOT ILIKE '%monster%'
    AND f.description NOT ILIKE '%ghost%'
    AND f.description NOT ILIKE '%dead%'
    AND f.description NOT ILIKE '%zombie%'
    AND f.description NOT ILIKE '%undead%'
);

-- 6. General list total viewing time (all movies)
SELECT 
    SUM(f.length) AS total_minutes,
    ROUND(SUM(f.length) / 60.0, 2) AS total_hours,
    ROUND(SUM(f.length) / 60.0 / 24.0, 2) AS total_days
FROM film f;

-- Additional: Detailed safe movies list
SELECT 
    f.film_id,
    f.title,
    f.description,
    f.length AS minutes,
    ROUND(f.length / 60.0, 2) AS hours
FROM film f
WHERE f.film_id NOT IN (
    SELECT fc.film_id
    FROM film_category fc
    JOIN category c ON fc.category_id = c.category_id
    WHERE c.name = 'Horror'
)
AND (
    f.title NOT ILIKE ANY(ARRAY['%beast%', '%monster%', '%ghost%', '%dead%', '%zombie%', '%undead%'])
    AND f.description NOT ILIKE ANY(ARRAY['%beast%', '%monster%', '%ghost%', '%dead%', '%zombie%', '%undead%'])
)
ORDER BY f.title;