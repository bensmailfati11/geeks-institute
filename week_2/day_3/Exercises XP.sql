-- EXERCISE 1

-- 1. Get all languages
SELECT * FROM language;

-- 2. Films with their languages
SELECT f.title, f.description, l.name AS language_name
FROM film f
JOIN language l ON f.language_id = l.language_id;

-- 3. All languages (even without films)
SELECT f.title, f.description, l.name AS language_name
FROM language l
LEFT JOIN film f ON l.language_id = f.language_id;

-- 4. Create new_film table
CREATE TABLE new_film (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Add films
INSERT INTO new_film (name) VALUES 
('The Matrix'),
('Inception'),
('Interstellar');

-- 5. Create customer_review table
CREATE TABLE customer_review (
    review_id SERIAL PRIMARY KEY,
    film_id INTEGER NOT NULL REFERENCES new_film(id) ON DELETE CASCADE,
    language_id INTEGER NOT NULL REFERENCES language(language_id),
    title VARCHAR(255) NOT NULL,
    score INTEGER CHECK (score >= 1 AND score <= 10),
    review_text TEXT,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Add 2 reviews
INSERT INTO customer_review (film_id, language_id, title, score, review_text) VALUES 
(1, 1, 'Amazing!', 9, 'Best sci-fi movie ever'),
(2, 1, 'Mind bending', 8, 'Incredible storyline');

-- 7. Test cascade delete
DELETE FROM new_film WHERE id = 1;
-- Review for film_id 1 will be automatically deleted


-- EXERCISE 2

-- 1. Update film languages
UPDATE film SET language_id = 2 WHERE film_id IN (1, 2, 3);

-- 2. Check customer table foreign keys
SELECT
    tc.table_name, 
    kcu.column_name, 
    ccu.table_name AS foreign_table_name
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu 
    ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage ccu 
    ON ccu.constraint_name = tc.constraint_name
WHERE tc.table_name = 'customer' 
AND tc.constraint_type = 'FOREIGN KEY';

-- 3. Drop customer_review table
DROP TABLE IF EXISTS customer_review;

-- 4. Count outstanding rentals
SELECT COUNT(*) FROM rental WHERE return_date IS NULL;

-- 5. 30 most expensive outstanding rentals
SELECT f.title, f.rental_rate
FROM rental r
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
WHERE r.return_date IS NULL
ORDER BY f.rental_rate DESC
LIMIT 30;

-- 6. Find movies for friend

-- Film 1: Sumo wrestler with Penelope Monroe
SELECT f.title, f.description
FROM film f
JOIN film_actor fa ON f.film_id = fa.film_id
JOIN actor a ON fa.actor_id = a.actor_id
WHERE a.first_name = 'Penelope' 
AND a.last_name = 'Monroe'
AND f.description ILIKE '%sumo wrestler%';

-- Film 2: Short documentary (<1 hour), rated R
SELECT f.title, f.length, f.rating
FROM film f
JOIN film_category fc ON f.film_id = fc.film_id
JOIN category c ON fc.category_id = c.category_id
WHERE c.name = 'Documentary'
AND f.length < 60
AND f.rating = 'R';

-- Film 3: Matthew Mahan rental (>$4, returned July 28-Aug 1, 2005)
SELECT DISTINCT f.title, p.amount, r.return_date
FROM film f
JOIN inventory i ON f.film_id = i.film_id
JOIN rental r ON i.inventory_id = r.inventory_id
JOIN payment p ON r.rental_id = p.rental_id
JOIN customer c ON r.customer_id = c.customer_id
WHERE c.first_name = 'Matthew' 
AND c.last_name = 'Mahan'
AND p.amount > 4.00
AND r.return_date BETWEEN '2005-07-28' AND '2005-08-01';

-- Film 4: Matthew Mahan watched, "boat" in title/desc, expensive
SELECT f.title, f.description, f.replacement_cost
FROM film f
JOIN inventory i ON f.film_id = i.film_id
JOIN rental r ON i.inventory_id = r.inventory_id
JOIN customer c ON r.customer_id = c.customer_id
WHERE c.first_name = 'Matthew' 
AND c.last_name = 'Mahan'
AND (f.title ILIKE '%boat%' OR f.description ILIKE '%boat%')
ORDER BY f.replacement_cost DESC
LIMIT 1;