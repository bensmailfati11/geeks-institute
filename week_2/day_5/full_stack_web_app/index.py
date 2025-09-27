from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# Données complètes en français
sample_books = [
    {
        'id': 1, 'title': 'Le Petit Prince', 'author': 'Antoine de Saint-Exupéry', 'genre': 'Roman',
        'description': 'Conte poétique et philosophique sous l\'apparence d\'un conte pour enfants.',
        'cover_image': 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop',
        'isbn': '978-2010000001'
    },
    {
        'id': 2, 'title': 'Vingt Mille Lieues sous les mers', 'author': 'Jules Verne', 'genre': 'Science-Fiction',
        'description': 'Roman d\'aventures et de science-fiction publié en 1870.',
        'cover_image': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop',
        'isbn': '978-2010000002'
    },
    {
        'id': 3, 'title': 'Les Misérables', 'author': 'Victor Hugo', 'genre': 'Roman',
        'description': 'Roman social et historique publié en 1862.',
        'cover_image': 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop',
        'isbn': '978-2010000003'
    },
    {
        'id': 4, 'title': 'L\'Étranger', 'author': 'Albert Camus', 'genre': 'Roman',
        'description': 'Roman philosophique publié en 1942.',
        'cover_image': 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=300&h=400&fit=crop',
        'isbn': '978-2010000004'
    }
]

sample_categories = [
    {
        'id': 1, 'name': 'Roman', 'book_count': 12, 'description': 'Œuvres narratives en prose',
        'icon': '📖', 'cover_image': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop'
    },
    {
        'id': 2, 'name': 'Science-Fiction', 'book_count': 8, 'description': 'Fiction basée sur des découvertes scientifiques',
        'icon': '🚀', 'cover_image': 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=200&fit=crop'
    },
    {
        'id': 3, 'name': 'Fantastique', 'book_count': 6, 'description': 'Univers imaginaires et surnaturels',
        'icon': '🐉', 'cover_image': 'https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=400&h=200&fit=crop'
    },
    {
        'id': 4, 'name': 'Policier', 'book_count': 9, 'description': 'Enquêtes et mystères à résoudre',
        'icon': '🕵️', 'cover_image': 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=200&fit=crop'
    }
]

sample_authors = [
    {
        'id': 1, 'name': 'Antoine de Saint-Exupéry', 'book_count': 5, 'country': 'France',
        'photo': 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face',
        'bio': 'Écrivain, poète, aviateur et reporter français, auteur du Petit Prince.'
    },
    {
        'id': 2, 'name': 'Jules Verne', 'book_count': 15, 'country': 'France',
        'photo': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face',
        'bio': 'Écrivain français dont l\'œuvre est riche de science-fiction et d\'aventures.'
    },
    {
        'id': 3, 'name': 'Victor Hugo', 'book_count': 12, 'country': 'France',
        'photo': 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
        'bio': 'Poète, dramaturge et prosateur romantique considéré comme l\'un des plus importants écrivains de langue française.'
    },
    {
        'id': 4, 'name': 'Albert Camus', 'book_count': 7, 'country': 'France',
        'photo': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
        'bio': 'Écrivain, philosophe, romancier, dramaturge, essayiste et nouvelliste français.'
    }
]

# Routes complètes
@app.route("/")
def home():
    return render_template("index.html", books=sample_books)

@app.route("/create")
def create():
    return render_template("create.html")

@app.route("/details/<int:book_id>")
def details(book_id):
    book = next((b for b in sample_books if b['id'] == book_id), None)
    return render_template("details.html", book=book)

@app.route("/edit/<int:book_id>")
def edit(book_id):
    book = next((b for b in sample_books if b['id'] == book_id), None)
    return render_template("edit.html", book=book)

@app.route("/categories")
def categories():
    return render_template("categories.html", categories=sample_categories)

@app.route("/category/<int:category_id>")
def category_detail(category_id):
    category = next((c for c in sample_categories if c['id'] == category_id), None)
    category_books = [b for b in sample_books if b['genre'] == category['name']] if category else []
    return render_template("category_detail.html", category=category, books=category_books)

@app.route("/authors")
def authors():
    return render_template("authors.html", authors=sample_authors)

@app.route("/author/<int:author_id>")
def author_detail(author_id):
    author = next((a for a in sample_authors if a['id'] == author_id), None)
    author_books = [b for b in sample_books if b['author'] == author['name']] if author else []
    return render_template("author_detail.html", author=author, books=author_books)

if __name__ == "__main__":
    app.run(debug=True)