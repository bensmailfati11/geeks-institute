CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS livres (
    id SERIAL PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    isbn VARCHAR(50) UNIQUE,
    annee_publication INT,
    nombre_pages INT,
    langue VARCHAR(50) DEFAULT 'Français',
    nombre_exemplaires INT DEFAULT 1,
    exemplaires_disponibles INT DEFAULT 1,
    category_id INT REFERENCES categories(id) ON DELETE SET NULL,
    resume TEXT,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE livres
ADD COLUMN nombre_exemplaires INT DEFAULT 1,
ADD COLUMN exemplaires_disponibles INT DEFAULT 1;

CREATE TABLE IF NOT EXISTS auteurs (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100),
    biographie TEXT,
    date_naissance DATE,
    nationalite VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS livres_auteurs (
    id SERIAL PRIMARY KEY,
    livre_id INT REFERENCES livres(id) ON DELETE CASCADE,
    auteur_id INT REFERENCES auteurs(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS membres (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100),
    email VARCHAR(150) UNIQUE,
    telephone VARCHAR(50),
    adresse TEXT,
    date_inscription TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actif BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS emprunts (
    id SERIAL PRIMARY KEY,
    livre_id INT REFERENCES livres(id) ON DELETE CASCADE,
    membre_id INT REFERENCES membres(id) ON DELETE CASCADE,
    date_emprunt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_retour_prevue DATE,
    date_retour_effective DATE,
    statut VARCHAR(50) DEFAULT 'En cours',
    amendes NUMERIC(10,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS details (
    id SERIAL PRIMARY KEY,
    livre_id INT REFERENCES livres(id) ON DELETE CASCADE,
    category_id INT REFERENCES categories(id) ON DELETE SET NULL,
    isbn VARCHAR(50),
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
