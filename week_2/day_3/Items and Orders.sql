-- Create product_orders table
CREATE TABLE product_orders (
    order_id SERIAL PRIMARY KEY,
    order_date DATE DEFAULT CURRENT_DATE
);

-- Create items table
CREATE TABLE items (
    item_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    order_id INTEGER REFERENCES product_orders(order_id) ON DELETE CASCADE
);

-- Insert sample data
INSERT INTO product_orders (order_date) VALUES 
('2024-01-15'),
('2024-01-16');

INSERT INTO items (name, price, order_id) VALUES
('Laptop', 999.99, 1),
('Mouse', 29.99, 1),
('Keyboard', 79.99, 1),
('Monitor', 299.99, 2),
('Headphones', 149.99, 2);

-- Function to return total price for a given order
CREATE OR REPLACE FUNCTION get_order_total(order_id_input INTEGER)
RETURNS DECIMAL AS $$
DECLARE
    total_price DECIMAL;
BEGIN
    SELECT COALESCE(SUM(price), 0)
    INTO total_price
    FROM items
    WHERE order_id = order_id_input;
    
    RETURN total_price;
END;
$$ LANGUAGE plpgsql;

-- Test the function
SELECT get_order_total(1) as order_1_total;
SELECT get_order_total(2) as order_2_total;

-- Bonus: Create users table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100)
);

-- Add user_id to product_orders table
ALTER TABLE product_orders ADD COLUMN user_id INTEGER REFERENCES users(user_id);

-- Insert sample users
INSERT INTO users (username, email) VALUES
('john_doe', 'john@email.com'),
('jane_smith', 'jane@email.com');

-- Update orders with users
UPDATE product_orders SET user_id = 1 WHERE order_id = 1;
UPDATE product_orders SET user_id = 2 WHERE order_id = 2;

-- Bonus function: total price for a given order of a given user
CREATE OR REPLACE FUNCTION get_user_order_total(user_id_input INTEGER, order_id_input INTEGER)
RETURNS DECIMAL AS $$
DECLARE
    total_price DECIMAL;
BEGIN
    SELECT COALESCE(SUM(i.price), 0)
    INTO total_price
    FROM items i
    JOIN product_orders po ON i.order_id = po.order_id
    WHERE po.order_id = order_id_input
    AND po.user_id = user_id_input;
    
    RETURN total_price;
END;
$$ LANGUAGE plpgsql;

-- Test bonus function
SELECT get_user_order_total(1, 1) as user_1_order_1_total;
SELECT get_user_order_total(2, 2) as user_2_order_2_total;