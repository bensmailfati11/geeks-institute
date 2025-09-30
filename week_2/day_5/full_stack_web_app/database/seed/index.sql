DROP TABLE IF EXISTS authors CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS books CASCADE;
DROP TABLE IF EXISTS auteurs CASCADE;
DROP TABLE IF EXISTS livres_auteurs CASCADE;
DROP TABLE IF EXISTS membres CASCADE;
DROP TABLE IF EXISTS emprunts CASCADE;



-- Table des auteurs
CREATE TABLE authors (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    country TEXT,
    bio TEXT,
    photo TEXT
);

-- Table des catégories
CREATE TABLE categories (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    cover_image TEXT
);

-- Table des livres
CREATE TABLE books (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    author_id INTEGER,
    genre TEXT,
    description TEXT,
    lsbn TEXT,
    cover_image TEXT,
    category_id INTEGER,
    FOREIGN KEY (author_id) REFERENCES authors(id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);
