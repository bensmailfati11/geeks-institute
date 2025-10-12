-- Create the Menu_Items table
CREATE TABLE IF NOT EXISTS Menu_Items (
    item_id SERIAL PRIMARY KEY,
    item_name VARCHAR(30) NOT NULL,
    item_price SMALLINT DEFAULT 0
);

-- Insert some sample data for testing
INSERT INTO Menu_Items (item_name, item_price) VALUES 
    ('Burger', 35),
    ('Pizza', 28),
    ('Beef Stew', 42),
    ('Caesar Salad', 22);