# index.py
from flask import Flask, render_template, request, redirect, url_for, flash, session
import psycopg2
from psycopg2.extras import RealDictCursor
from werkzeug.security import check_password_hash
from functools import wraps

app = Flask(__name__)
<<<<<<< HEAD
app.secret_key = 'votre_cle_secrete_tres_securisee'
=======
app.secret_key = "secret123"  # nécessaire pour flash() et session
>>>>>>> 3fd155cb0ffc30ba0e27ed460b56a527cf604c5c

# --- CONFIG DB ---

DB_CONFIG = {
    "host": "localhost",
    "database": "librarydb",
    "user": "postgres",
    "password": "root",
    "port": 5433
}

# Fonction pour se connecter à PostgreSQL
def get_db_connection():
    conn = psycopg2.connect(**DB_CONFIG, cursor_factory=RealDictCursor)
    return conn

# Décorateur admin
def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not session.get("user_id"):
            flash("Veuillez vous connecter d'abord.", "warning")
            return redirect(url_for("login"))
        if not session.get("is_admin"):
            flash("Accès refusé : administrateur uniquement.", "danger")
            return redirect(url_for("index"))
        return f(*args, **kwargs)
    return decorated_function

# --- ROUTE HOME / INDEX ---
@app.route("/")
def index():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM books ORDER BY id DESC")
    books = cur.fetchall()
    cur.close()
    conn.close()
    return render_template("index.html", books=books)

# --- ROUTE AUTEURS ---
@app.route("/authors")
def authors():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("""
        SELECT a.*, COUNT(b.id) as book_count
        FROM authors a
        LEFT JOIN books b ON a.id = b.author_id
        GROUP BY a.id
        ORDER BY a.name
    """)
    authors = cur.fetchall()
    cur.close()
    conn.close()
    return render_template("authors.html", authors=authors)

# --- CREATE AUTHOR ---
@app.route("/authors/create", methods=["GET", "POST"])
def create_author():
    if request.method == "POST":
        name = request.form["name"]
        country = request.form.get("country", "")
        bio = request.form.get("bio", "")
        photo = request.form.get("photo", "")

        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO authors (name, country, bio, photo) VALUES (%s, %s, %s, %s)",
            (name, country, bio, photo)
        )
        conn.commit()
        cur.close()
        conn.close()
        return redirect(url_for("authors"))
    return render_template("create_author.html")

# --- DETAIL AUTEUR ---
@app.route("/author/<int:author_id>")
def author_detail(author_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM authors WHERE id = %s", (author_id,))
    author = cur.fetchone()
    cur.execute("SELECT * FROM books WHERE author_id = %s", (author_id,))
    books = cur.fetchall()
    cur.close()
    conn.close()
    return render_template("author_detail.html", author=author, books=books)

# --- ROUTE SEARCH ---
@app.route("/search")
def search():
    query = request.args.get("q", "")
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("""
        SELECT b.*, a.name AS author_name, c.name AS category_name
        FROM books b
        LEFT JOIN authors a ON b.author_id = a.id
        LEFT JOIN categories c ON b.category_id = c.id
        WHERE b.title ILIKE %s OR a.name ILIKE %s OR c.name ILIKE %s
        ORDER BY b.id DESC
    """, (f"%{query}%", f"%{query}%", f"%{query}%"))
    books = cur.fetchall()
    cur.close()
    conn.close()
    return render_template("search_results.html", books=books, query=query)

# --- ROUTE CATEGORIES (LISTE + AJOUT) ---
@app.route("/categories", methods=["GET", "POST"])
def categories():
    conn = get_db_connection()
    cur = conn.cursor()

    if request.method == "POST":
        name = request.form["name"]
        description = request.form.get("description", "")
        icon = request.form.get("icon", "")
        cover_image = request.form.get("cover_image", "")

        cur.execute("""
            INSERT INTO categories (name, description, icon, cover_image)
            VALUES (%s, %s, %s, %s)
        """, (name, description, icon, cover_image))
        conn.commit()
        flash("Category added successfully!", "success")
        return redirect(url_for("categories"))

    cur.execute("""
        SELECT c.id, c.name, c.description, c.icon, c.cover_image,
               COUNT(b.id) AS book_count
        FROM categories c
        LEFT JOIN books b ON b.category_id = c.id
        GROUP BY c.id
        ORDER BY c.id DESC
    """)
    categories = cur.fetchall()
    cur.close()
    conn.close()
    return render_template("categories.html", categories=categories)

# --- DELETE CATEGORY ---
@app.route("/categories/delete/<int:category_id>", methods=["POST"])
def delete_category(category_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("DELETE FROM categories WHERE id = %s", (category_id,))
    conn.commit()
    cur.close()
    conn.close()
    flash("Category deleted successfully!", "success")
    return redirect(url_for("categories"))

# --- DETAIL CATEGORY ---
@app.route("/categories/<int:category_id>")
def category_detail(category_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM categories WHERE id = %s", (category_id,))
    category = cur.fetchone()
    cur.execute("SELECT * FROM books WHERE category_id = %s", (category_id,))
    books = cur.fetchall()
    cur.close()
    conn.close()
    return render_template("category_detail.html", category=category, books=books)

# --------- route delete author --------#

@app.route('/author/delete/<int:author_id>', methods=['POST'])
def delete_author(author_id):
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("DELETE FROM authors WHERE id = %s", (author_id,))
        conn.commit()
        cur.close()
        conn.close()
        flash('Auteur supprimé avec succès !', 'success')
    except Exception as e:
        flash(f"Erreur lors de la suppression : {e}", 'danger')
    return redirect(url_for('authors'))


# --- ROUTES LIVRES CRUD ---
@app.route("/book/<int:book_id>")
def details(book_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM books WHERE id = %s", (book_id,))
    book = cur.fetchone()
    cur.close()
    conn.close()
    return render_template("details.html", book=book)

@app.route("/create", methods=["GET", "POST"])
def create():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT id, name FROM authors")
    authors = cur.fetchall()
    cur.execute("SELECT id, name FROM categories")
    categories = cur.fetchall()

    if request.method == "POST":
        title = request.form["title"]
        author_id = request.form["author_id"]
        category_id = request.form["category_id"]
        genre = request.form.get("genre", "")
        description = request.form.get("description", "")
        cover_image = request.form.get("cover_image", "")

        cur.execute(
            "INSERT INTO books (title, author_id, category_id, genre, description, cover_image) VALUES (%s, %s, %s, %s, %s, %s)",
            (title, author_id, category_id, genre, description, cover_image)
        )
        conn.commit()
        cur.close()
        conn.close()
        return redirect(url_for("index"))

    cur.close()
    conn.close()
    return render_template("create.html", authors=authors, categories=categories)

@app.route("/edit/<int:book_id>", methods=["GET", "POST"])
def edit(book_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM books WHERE id = %s", (book_id,))
    book = cur.fetchone()
    cur.execute("SELECT id, name FROM authors")
    authors = cur.fetchall()
    cur.execute("SELECT id, name FROM categories")
    categories = cur.fetchall()

    if request.method == "POST":
        title = request.form["title"]
        author_id = request.form["author_id"]
        category_id = request.form["category_id"]
        genre = request.form.get("genre", "")
        description = request.form.get("description", "")
        cover_image = request.form.get("cover_image", "")

        cur.execute(
            """UPDATE books
               SET title=%s, author_id=%s, category_id=%s, genre=%s, description=%s, cover_image=%s
               WHERE id=%s""",
            (title, author_id, category_id, genre, description, cover_image, book_id)
        )
        conn.commit()
        cur.close()
        conn.close()
        return redirect(url_for("details", book_id=book_id))

    cur.close()
    conn.close()
    return render_template("edit.html", book=book, authors=authors, categories=categories)

@app.route("/delete/<int:book_id>", methods=["POST"])
def delete(book_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("DELETE FROM books WHERE id=%s", (book_id,))
    conn.commit()
    cur.close()
    conn.close()
    return redirect(url_for("index"))

# --- LOGIN / LOGOUT ---
@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]

        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT * FROM users WHERE username = %s", (username,))
        user = cur.fetchone()
        cur.close()
        conn.close()

        if user and check_password_hash(user["password"], password):
            session["user_id"] = user["id"]
            session["username"] = user["username"]
            session["is_admin"] = user["is_admin"]
            return redirect(url_for("dashboard"))
        else:
            return render_template("login.html", error="Nom d'utilisateur ou mot de passe incorrect")
    return render_template("login.html")

@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("login"))

# --- DASHBOARD ---
@app.route("/dashboard")
def dashboard():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT COUNT(*) AS total_books FROM books")
    total_books = cur.fetchone()["total_books"]
    cur.execute("SELECT COUNT(*) AS total_authors FROM authors")
    total_authors = cur.fetchone()["total_authors"]
    cur.execute("SELECT COUNT(*) AS total_categories FROM categories")
    total_categories = cur.fetchone()["total_categories"]
    cur.close()
    conn.close()
    return render_template(
        "dashboard.html",
        total_books=total_books,
        total_authors=total_authors,
        total_categories=total_categories
    )

# --- LANCER L'APPLICATION ---
if __name__ == "__main__":
    app.run(debug=True)
