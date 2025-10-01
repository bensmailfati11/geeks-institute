import psycopg2

def get_db_connection():
    conn = psycopg2.connect(
        host="localhost",
        database="librarydb",
        user="postgres",
        password="ben123",
        port=5433
    )
    return conn

def test_connection():
    """Tester la connexion à la base de données"""
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT 1")
        print("Connexion OK !")
        cur.close()
        conn.close()
        return True
    except Exception as e:
        print(f"Erreur: {e}")
        return False

def init_db():
    """Créer les tables à partir du fichier SQL"""
    try:
        conn = get_db_connection()
        cur = conn.cursor()

        # Lire le fichier SQL
        with open('database/seed/index.sql', 'r', encoding='utf-8') as f:
            sql_content = f.read()

        # Séparer les commandes par ; et exécuter une par une
        sql_commands = sql_content.split(";")
        for command in sql_commands:
            command = command.strip()
            if command:  # ignorer les lignes vides
                cur.execute(command)

        conn.commit()
        cur.close()
        conn.close()
        print("Tables créées avec succès pour PostgreSQL !")
        return True
    except Exception as e:
        print(f"Erreur création tables: {e}")
        return False

def voir_tables():
    """Lister les tables dans la base"""
    try:
        conn = get_db_connection()
        cur = conn.cursor()

        cur.execute("""
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        """)

        tables = cur.fetchall()
        print("Tables dans ta base:")
        for table in tables:
            print(f"  - {table[0]}")

        cur.close()
        conn.close()
    except Exception as e:
        print(f"Erreur: {e}")

def update_livres_table():
    """Ajouter les colonnes manquantes à la table livres"""
    try:
        conn = get_db_connection()
        cur = conn.cursor()

        colonnes_a_ajouter = [
            "ALTER TABLE livres ADD COLUMN IF NOT EXISTS nombre_exemplaires INTEGER DEFAULT 1",
            "ALTER TABLE livres ADD COLUMN IF NOT EXISTS exemplaires_disponibles INTEGER DEFAULT 1",
            "ALTER TABLE livres ADD COLUMN IF NOT EXISTS langue VARCHAR(50) DEFAULT 'Français'",
            "ALTER TABLE livres ADD COLUMN IF NOT EXISTS resume TEXT"
        ]

        for commande in colonnes_a_ajouter:
            cur.execute(commande)
            print(f"Colonne ajoutée")

        conn.commit()
        cur.close()
        conn.close()
        print("Table livres mise à jour !")
    except Exception as e:
        print(f"Erreur: {e}")
        conn.rollback()
        cur.close()
        conn.close()

# Pour tester
if __name__ == "__main__":
    print("=== TEST CONNEXION ===")
    if test_connection():
        print("\n=== CRÉATION DES TABLES ===")
        init_db()
        print("\n=== TABLES CRÉÉES ===")
        voir_tables()
        print("\n=== MISE À JOUR DE LA TABLE LIVRES ===")
        update_livres_table()
