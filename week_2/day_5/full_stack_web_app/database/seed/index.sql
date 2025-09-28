DROP TABLE IF EXISTS livres CASCADE;
DROP TABLE IF EXISTS details CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS auteurs CASCADE;
DROP TABLE IF EXISTS livres_auteurs CASCADE;
DROP TABLE IF EXISTS membres CASCADE;
DROP TABLE IF EXISTS emprunts CASCADE;


-- Table Authors
CREATE TABLE authors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    country VARCHAR(100),
    bio TEXT,
    photo TEXT
);

-- Table Categories
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon TEXT,
    cover_image TEXT
);

-- Table Books
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author_id INTEGER REFERENCES authors(id) ON DELETE SET NULL,
    genre VARCHAR(100),
    description TEXT,
    isbn VARCHAR(20),
    cover_image TEXT,
    category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,  -- plus tard, hacher le mot de passe
    role VARCHAR(20) DEFAULT 'user'
);
