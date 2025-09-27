# models/models.py
import sys
import os

# Ajouter le dossier parent (full_stack_web_app) au chemin Python
current_dir = os.path.dirname(os.path.abspath(__file__))  # dossier models/
parent_dir = os.path.dirname(current_dir)                # dossier full_stack_web_app/
sys.path.insert(0, parent_dir)

from database.index import get_db_connection
import math

class Livre:
    def __init__(self, id=None, titre=None, resume=None, category_nom=None, created_at=None):
        self.id = id
        self.titre = titre
        self.resume = resume
        self.category_nom = category_nom
        self.created_at = created_at

    # alias pour correspondre au template
    @property
    def title(self):
        return self.titre

    @property
    def genre(self):
        return self.category_nom

    @property
    def description(self):
        return self.resume

    
    @classmethod
    def get_all(cls, page=1, per_page=6, search=None):
        """Récupérer tous les livres avec pagination et recherche"""
        conn = get_db_connection()
        if not conn:
            return [], 0, 0
            
        cur = conn.cursor()
        offset = (page - 1) * per_page
        
        if search:
            query = """
                SELECT l.*, c.nom as category_nom 
                FROM livres l 
                LEFT JOIN categories c ON l.category_id = c.id 
                WHERE l.titre ILIKE %s OR l.isbn ILIKE %s
                ORDER BY l.created_at DESC 
                LIMIT %s OFFSET %s
            """
            cur.execute(query, (f'%{search}%', f'%{search}%', per_page, offset))
        else:
            query = """
                SELECT l.*, c.nom as category_nom 
                FROM livres l 
                LEFT JOIN categories c ON l.category_id = c.id 
                ORDER BY l.created_at DESC 
                LIMIT %s OFFSET %s
            """
            cur.execute(query, (per_page, offset))
        
        livres = cur.fetchall()
        
        # Compter le total pour la pagination
        if search:
            cur.execute("SELECT COUNT(*) FROM livres WHERE titre ILIKE %s OR isbn ILIKE %s", 
                       (f'%{search}%', f'%{search}%'))
        else:
            cur.execute("SELECT COUNT(*) FROM livres")
        
        total = cur.fetchone()[0]
        total_pages = math.ceil(total / per_page)
        
        cur.close()
        conn.close()
        
        return livres, total_pages, total
    
        @classmethod
    def get_by_auteur(cls, auteur_id):
        conn = get_db_connection()
        if not conn:
            return []
        cur = conn.cursor()
        query = """
            SELECT l.id, l.titre, l.resume, c.nom as category_nom, l.created_at
            FROM livres l
            JOIN livres_auteurs la ON l.id = la.livre_id
            LEFT JOIN categories c ON l.category_id = c.id
            WHERE la.auteur_id = %s
            ORDER BY l.created_at DESC
        """
        cur.execute(query, (auteur_id,))
        rows = cur.fetchall()
        cur.close()
        conn.close()
        return [Livre(*row) for row in rows]

    
    def save(self):
        """Sauvegarder un nouveau livre"""
        conn = get_db_connection()
        if not conn:
            raise Exception("Connexion impossible")
            
        cur = conn.cursor()
        
        query = """
            INSERT INTO livres (titre, isbn, annee_publication, nombre_pages, 
                              langue, nombre_exemplaires, exemplaires_disponibles, 
                              category_id, resume)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING id
        """
        cur.execute(query, (
            self.titre, self.isbn, self.annee_publication, self.nombre_pages,
            self.langue, self.nombre_exemplaires, self.exemplaires_disponibles,
            self.category_id, self.resume
        ))
        
        self.id = cur.fetchone()[0]
        
        conn.commit()
        cur.close()
        conn.close()
        
        return self
    
    def update(self):
        """Mettre à jour un livre existant"""
        conn = get_db_connection()
        if not conn:
            raise Exception("Connexion impossible")
            
        cur = conn.cursor()
        
        query = """
            UPDATE livres 
            SET titre = %s, isbn = %s, annee_publication = %s, nombre_pages = %s,
                langue = %s, nombre_exemplaires = %s, exemplaires_disponibles = %s,
                category_id = %s, resume = %s
            WHERE id = %s
        """
        cur.execute(query, (
            self.titre, self.isbn, self.annee_publication, self.nombre_pages,
            self.langue, self.nombre_exemplaires, self.exemplaires_disponibles,
            self.category_id, self.resume, self.id
        ))
        
        conn.commit()
        cur.close()
        conn.close()
        
        return self
    
    def delete(self):
        """Supprimer un livre"""
        conn = get_db_connection()
        if not conn:
            raise Exception("Connexion impossible")
            
        cur = conn.cursor()
        cur.execute("DELETE FROM livres WHERE id = %s", (self.id,))
        conn.commit()
        cur.close()
        conn.close()
    
    @classmethod
    def get_stats(cls):
        """Obtenir des statistiques sur les livres"""
        conn = get_db_connection()
        if not conn:
            return {}
            
        cur = conn.cursor()
        
        stats = {}
        
        # Total des livres
        cur.execute("SELECT COUNT(*) FROM livres")
        stats['total_livres'] = cur.fetchone()[0]
        
        # Total exemplaires
        cur.execute("SELECT SUM(nombre_exemplaires) FROM livres")
        stats['total_exemplaires'] = cur.fetchone()[0] or 0
        
        # Exemplaires disponibles
        cur.execute("SELECT SUM(exemplaires_disponibles) FROM livres")
        stats['exemplaires_disponibles'] = cur.fetchone()[0] or 0
        
        # Livres par catégorie
        cur.execute("""
            SELECT c.nom, COUNT(l.id) 
            FROM categories c 
            LEFT JOIN livres l ON c.id = l.category_id 
            GROUP BY c.id, c.nom 
            ORDER BY COUNT(l.id) DESC
        """)
        stats['par_categorie'] = cur.fetchall()
        
        # Livres par langue
        cur.execute("""
            SELECT langue, COUNT(*) 
            FROM livres 
            GROUP BY langue 
            ORDER BY COUNT(*) DESC
        """)
        stats['par_langue'] = cur.fetchall()
        
        # Livres par décennie
        cur.execute("""
            SELECT 
                CASE 
                    WHEN annee_publication < 1900 THEN 'Avant 1900'
                    WHEN annee_publication < 1950 THEN '1900-1949'
                    WHEN annee_publication < 2000 THEN '1950-1999'
                    ELSE '2000+'
                END as periode,
                COUNT(*) 
            FROM livres 
            WHERE annee_publication IS NOT NULL
            GROUP BY 
                CASE 
                    WHEN annee_publication < 1900 THEN 'Avant 1900'
                    WHEN annee_publication < 1950 THEN '1900-1949'
                    WHEN annee_publication < 2000 THEN '1950-1999'
                    ELSE '2000+'
                END
            ORDER BY MIN(annee_publication)
        """)
        stats['par_periode'] = cur.fetchall()
        
        cur.close()
        conn.close()
        
        return stats


class Category:
    def __init__(self, id=None, nom=None, description=None, created_at=None):
        self.id = id
        self.nom = nom
        self.description = description
        self.created_at = created_at
    
    @classmethod
    def get_all(cls):
        """Récupérer toutes les catégories"""
        conn = get_db_connection()
        if not conn:
            return []
            
        cur = conn.cursor()
        cur.execute("SELECT * FROM categories ORDER BY nom")
        categories = cur.fetchall()
        cur.close()
        conn.close()
        
        return categories
    
    @classmethod
    def get_by_id(cls, category_id):
        """Récupérer une catégorie par son ID"""
        conn = get_db_connection()
        if not conn:
            return None
            
        cur = conn.cursor()
        cur.execute("SELECT * FROM categories WHERE id = %s", (category_id,))
        category = cur.fetchone()
        cur.close()
        conn.close()
        
        return category
    
    def save(self):
        """Sauvegarder une nouvelle catégorie"""
        conn = get_db_connection()
        if not conn:
            raise Exception("Connexion impossible")
            
        cur = conn.cursor()
        
        query = "INSERT INTO categories (nom, description) VALUES (%s, %s) RETURNING id"
        cur.execute(query, (self.nom, self.description))
        
        self.id = cur.fetchone()[0]
        
        conn.commit()
        cur.close()
        conn.close()
        
        return self


class Auteur:
    def __init__(self, id=None, nom=None, prenom=None, biographie=None, 
                 date_naissance=None, nationalite=None, created_at=None, book_count=0):
        self.id = id
        self.nom = nom
        self.prenom = prenom
        self.biographie = biographie
        self.date_naissance = date_naissance
        self.nationalite = nationalite
        self.created_at = created_at
        self.book_count = book_count   # nombre de livres

    # alias pour correspondre au template
    @property
    def name(self):
        return f"{self.prenom} {self.nom}"

    @property
    def country(self):
        return self.nationalite

        @classmethod
    def get_with_book_count(cls, auteur_id):
        conn = get_db_connection()
        if not conn:
            return None
        cur = conn.cursor()
        query = """
            SELECT a.id, a.nom, a.prenom, a.biographie, a.date_naissance, 
                   a.nationalite, a.created_at, COUNT(la.livre_id) as book_count
            FROM auteurs a
            LEFT JOIN livres_auteurs la ON a.id = la.auteur_id
            WHERE a.id = %s
            GROUP BY a.id
        """
        cur.execute(query, (auteur_id,))
        row = cur.fetchone()
        cur.close()
        conn.close()
        if row:
            return Auteur(*row)
        return None

    
    @classmethod
    def get_all(cls):
        """Récupérer tous les auteurs"""
        conn = get_db_connection()
        if not conn:
            return []
            
        cur = conn.cursor()
        cur.execute("SELECT * FROM auteurs ORDER BY nom, prenom")
        auteurs = cur.fetchall()
        cur.close()
        conn.close()
        
        return auteurs
    
    @classmethod
    def get_by_id(cls, auteur_id):
        """Récupérer un auteur par son ID"""
        conn = get_db_connection()
        if not conn:
            return None
            
        cur = conn.cursor()
        cur.execute("SELECT * FROM auteurs WHERE id = %s", (auteur_id,))
        auteur = cur.fetchone()
        cur.close()
        conn.close()
        
        return auteur
    
    def save(self):
        """Sauvegarder un nouveau auteur"""
        conn = get_db_connection()
        if not conn:
            raise Exception("Connexion impossible")
            
        cur = conn.cursor()
        
        query = """
            INSERT INTO auteurs (nom, prenom, biographie, date_naissance, nationalite)
            VALUES (%s, %s, %s, %s, %s) RETURNING id
        """
        cur.execute(query, (
            self.nom, self.prenom, self.biographie, 
            self.date_naissance, self.nationalite
        ))
        
        self.id = cur.fetchone()[0]
        
        conn.commit()
        cur.close()
        conn.close()
        
        return self


class Membre:
    def __init__(self, id=None, nom=None, prenom=None, email=None, 
                 telephone=None, adresse=None, date_inscription=None, 
                 actif=True, created_at=None):
        self.id = id
        self.nom = nom
        self.prenom = prenom
        self.email = email
        self.telephone = telephone
        self.adresse = adresse
        self.date_inscription = date_inscription
        self.actif = actif
        self.created_at = created_at
    
    @classmethod
    def get_all(cls):
        """Récupérer tous les membres actifs"""
        conn = get_db_connection()
        if not conn:
            return []
            
        cur = conn.cursor()
        cur.execute("SELECT * FROM membres WHERE actif = true ORDER BY nom, prenom")
        membres = cur.fetchall()
        cur.close()
        conn.close()
        
        return membres
    
    @classmethod
    def get_by_id(cls, membre_id):
        """Récupérer un membre par son ID"""
        conn = get_db_connection()
        if not conn:
            return None
            
        cur = conn.cursor()
        cur.execute("SELECT * FROM membres WHERE id = %s", (membre_id,))
        membre = cur.fetchone()
        cur.close()
        conn.close()
        
        return membre
    
    def save(self):
        """Sauvegarder un nouveau membre"""
        conn = get_db_connection()
        if not conn:
            raise Exception("Connexion impossible")
            
        cur = conn.cursor()
        
        query = """
            INSERT INTO membres (nom, prenom, email, telephone, adresse)
            VALUES (%s, %s, %s, %s, %s) RETURNING id
        """
        cur.execute(query, (
            self.nom, self.prenom, self.email, 
            self.telephone, self.adresse
        ))
        
        self.id = cur.fetchone()[0]
        
        conn.commit()
        cur.close()
        conn.close()
        
        return self


class Emprunt:
    def __init__(self, id=None, livre_id=None, membre_id=None, 
                 date_emprunt=None, date_retour_prevue=None, 
                 date_retour_effective=None, statut='En cours', 
                 amendes=0.00, created_at=None):
        self.id = id
        self.livre_id = livre_id
        self.membre_id = membre_id
        self.date_emprunt = date_emprunt
        self.date_retour_prevue = date_retour_prevue
        self.date_retour_effective = date_retour_effective
        self.statut = statut
        self.amendes = amendes
        self.created_at = created_at
    
    @classmethod
    def get_all(cls, statut=None):
        """Récupérer tous les emprunts"""
        conn = get_db_connection()
        if not conn:
            return []
            
        cur = conn.cursor()
        
        if statut:
            query = """
                SELECT e.*, l.titre, m.nom, m.prenom 
                FROM emprunts e
                JOIN livres l ON e.livre_id = l.id
                JOIN membres m ON e.membre_id = m.id
                WHERE e.statut = %s
                ORDER BY e.date_emprunt DESC
            """
            cur.execute(query, (statut,))
        else:
            query = """
                SELECT e.*, l.titre, m.nom, m.prenom 
                FROM emprunts e
                JOIN livres l ON e.livre_id = l.id
                JOIN membres m ON e.membre_id = m.id
                ORDER BY e.date_emprunt DESC
            """
            cur.execute(query)
        
        emprunts = cur.fetchall()
        cur.close()
        conn.close()
        
        return emprunts
    
    def save(self):
        """Créer un nouvel emprunt"""
        conn = get_db_connection()
        if not conn:
            raise Exception("Connexion impossible")
            
        cur = conn.cursor()
        
        query = """
            INSERT INTO emprunts (livre_id, membre_id, date_retour_prevue)
            VALUES (%s, %s, %s) RETURNING id
        """
        cur.execute(query, (
            self.livre_id, self.membre_id, self.date_retour_prevue
        ))
        
        self.id = cur.fetchone()[0]
        
        conn.commit()
        cur.close()
        conn.close()
        
        return self
    
    def retourner(self):
        """Marquer un emprunt comme retourné"""
        conn = get_db_connection()
        if not conn:
            raise Exception("Connexion impossible")
            
        cur = conn.cursor()
        
        query = """
            UPDATE emprunts 
            SET date_retour_effective = CURRENT_DATE, statut = 'Retourné'
            WHERE id = %s
        """
        cur.execute(query, (self.id,))
        
        conn.commit()
        cur.close()
        conn.close()
        
        return self


# Fonction utilitaire pour tester les modèles
def test_models():
    """Tester les modèles"""
    print("=== TEST DES MODÈLES ===")
    
    try:
        # Test Livre
        livres, _, total = Livre.get_all()
        print(f"Livres trouvés: {total}")
        
        # Test Categories
        categories = Category.get_all()
        print(f"Catégories trouvées: {len(categories)}")
        
        # Test Auteurs
        auteurs = Auteur.get_all()
        print(f"Auteurs trouvés: {len(auteurs)}")
        
        # Test Membres
        membres = Membre.get_all()
        print(f"Membres trouvés: {len(membres)}")
        
        # Test Stats
        stats = Livre.get_stats()
        print(f"Stats: {stats.get('total_livres', 0)} livres")
        
    except Exception as e:
        print(f"Erreur test modèles: {e}")

class Detail:
    def __init__(self, id=None, livre_id=None, category_id=None, isbn=None,
                 description=None, image_url=None, created_at=None):
        self.id = id
        self.livre_id = livre_id
        self.category_id = category_id
        self.isbn = isbn
        self.description = description
        self.image_url = image_url
        self.created_at = created_at

    @classmethod
    def get_all(cls):
        """Récupérer tous les détails"""
        conn = get_db_connection()
        if not conn:
            return []

        cur = conn.cursor()
        query = """
            SELECT d.*, l.titre as livre_titre, c.nom as category_nom
            FROM details d
            LEFT JOIN livres l ON d.livre_id = l.id
            LEFT JOIN categories c ON d.category_id = c.id
            ORDER BY d.created_at DESC
        """
        cur.execute(query)
        details = cur.fetchall()
        cur.close()
        conn.close()
        return details

    @classmethod
    def get_by_id(cls, detail_id):
        """Récupérer un détail par son ID"""
        conn = get_db_connection()
        if not conn:
            return None

        cur = conn.cursor()
        query = """
            SELECT d.*, l.titre as livre_titre, c.nom as category_nom
            FROM details d
            LEFT JOIN livres l ON d.livre_id = l.id
            LEFT JOIN categories c ON d.category_id = c.id
            WHERE d.id = %s
        """
        cur.execute(query, (detail_id,))
        detail = cur.fetchone()
        cur.close()
        conn.close()
        return detail

    def save(self):
        """Sauvegarder un nouveau détail"""
        conn = get_db_connection()
        if not conn:
            raise Exception("Connexion impossible")
        cur = conn.cursor()
        query = """
            INSERT INTO details (livre_id, category_id, isbn, description, image_url)
            VALUES (%s, %s, %s, %s, %s) RETURNING id
        """
        cur.execute(query, (
            self.livre_id, self.category_id, self.isbn,
            self.description, self.image_url
        ))
        self.id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        conn.close()
        return self

    def update(self):
        """Mettre à jour un détail existant"""
        conn = get_db_connection()
        if not conn:
            raise Exception("Connexion impossible")
        cur = conn.cursor()
        query = """
            UPDATE details
            SET livre_id=%s, category_id=%s, isbn=%s, description=%s, image_url=%s
            WHERE id=%s
        """
        cur.execute(query, (
            self.livre_id, self.category_id, self.isbn,
            self.description, self.image_url, self.id
        ))
        conn.commit()
        cur.close()
        conn.close()
        return self

    def delete(self):
        """Supprimer un détail"""
        conn = get_db_connection()
        if not conn:
            raise Exception("Connexion impossible")
        cur = conn.cursor()
        cur.execute("DELETE FROM details WHERE id = %s", (self.id,))
        conn.commit()
        cur.close()
        conn.close()


if __name__ == "__main__":
    test_models()