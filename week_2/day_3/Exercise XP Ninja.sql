-- 1. Retrieve all G or PG films not currently rented
SELECT 
    f.film_id,
    f.title,
    f.rating,
    f.rental_rate,
    f.length
FROM film f
WHERE f.rating IN ('G', 'PG')
AND NOT EXISTS (
    SELECT 1
    FROM inventory i
    JOIN rental r ON i.inventory_id = r.inventory_id
    WHERE i.film_id = f.film_id
    AND r.return_date IS NULL
);

-- 2. Create waiting list table for children's movies
CREATE TABLE children_movie_waiting_list (
    waiting_id SERIAL PRIMARY KEY,
    film_id INTEGER NOT NULL REFERENCES film(film_id) ON DELETE CASCADE,
    inventory_id INTEGER REFERENCES inventory(inventory_id),
    child_name VARCHAR(100) NOT NULL,
    parent_email VARCHAR(255),
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'waiting' CHECK (status IN ('waiting', 'notified', 'completed'))
);

-- Insert test data
INSERT INTO children_movie_waiting_list (film_id, child_name, parent_email) VALUES
(1, 'Emma Johnson', 'parent1@email.com'),
(1, 'Liam Smith', 'parent2@email.com'),
(2, 'Noah Williams', 'parent3@email.com'),
(1, 'Olivia Brown', 'parent4@email.com'),
(3, 'Sophia Jones', 'parent5@email.com');

-- 3. Retrieve number of people waiting for each children's DVD
SELECT 
    f.film_id,
    f.title,
    f.rating,
    COUNT(w.waiting_id) AS number_waiting,
    STRING_AGG(w.child_name, ', ') AS waiting_children
FROM film f
LEFT JOIN children_movie_waiting_list w ON f.film_id = w.film_id
WHERE f.rating IN ('G', 'PG')
AND (w.status = 'waiting' OR w.status IS NULL)
GROUP BY f.film_id, f.title, f.rating
HAVING COUNT(w.waiting_id) > 0
ORDER BY number_waiting DESC;

-- Check film availability status
SELECT 
    f.film_id,
    f.title,
    f.rating,
    COUNT(w.waiting_id) AS number_waiting,
    CASE 
        WHEN EXISTS (
            SELECT 1 
            FROM inventory i 
            LEFT JOIN rental r ON i.inventory_id = r.inventory_id AND r.return_date IS NULL
            WHERE i.film_id = f.film_id 
            AND r.rental_id IS NULL
        ) THEN 'Available'
        ELSE 'All copies rented'
    END AS availability_status
FROM film f
LEFT JOIN children_movie_waiting_list w ON f.film_id = w.film_id AND w.status = 'waiting'
WHERE f.rating IN ('G', 'PG')
GROUP BY f.film_id, f.title, f.rating
ORDER BY number_waiting DESC;