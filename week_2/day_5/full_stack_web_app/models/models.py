# models.py
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

# ----------------- Categories -----------------
class Category(db.Model):
    __tablename__ = 'categories'
    
    id = db.Column(db.Integer, primary_key=True)
    nom = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    livres = db.relationship('Livre', backref='category', lazy=True)
    details = db.relationship('Detail', backref='category', lazy=True)

    # CRUD Methods
    @staticmethod
    def create(nom, description=None):
        cat = Category(nom=nom, description=description)
        db.session.add(cat)
        db.session.commit()
        return cat

    @staticmethod
    def get_all():
        return Category.query.all()

    @staticmethod
    def get_by_id(cat_id):
        return Category.query.get(cat_id)

    def update(self, nom=None, description=None):
        if nom: self.nom = nom
        if description: self.description = description
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()


# ----------------- Livres -----------------
class Livre(db.Model):
    __tablename__ = 'livres'
    
    id = db.Column(db.Integer, primary_key=True)
    titre = db.Column(db.String(255), nullable=False)
    isbn = db.Column(db.String(50), unique=True)
    annee_publication = db.Column(db.Integer)
    nombre_pages = db.Column(db.Integer)
    langue = db.Column(db.String(50), default='Français')
    nombre_exemplaires = db.Column(db.Integer, default=1)
    exemplaires_disponibles = db.Column(db.Integer, default=1)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id', ondelete='SET NULL'))
    resume = db.Column(db.Text)
    image_url = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    auteurs = db.relationship('Auteur', secondary='livres_auteurs', backref='livres')
    emprunts = db.relationship('Emprunt', backref='livre', lazy=True)
    details = db.relationship('Detail', backref='livre', lazy=True)

    # CRUD Methods
    @staticmethod
    def create(titre, isbn=None, annee_publication=None, nombre_pages=None, langue='Français',
               nombre_exemplaires=1, exemplaires_disponibles=1, category_id=None,
               resume=None, image_url=None):
        livre = Livre(titre=titre, isbn=isbn, annee_publication=annee_publication,
                      nombre_pages=nombre_pages, langue=langue,
                      nombre_exemplaires=nombre_exemplaires,
                      exemplaires_disponibles=exemplaires_disponibles,
                      category_id=category_id, resume=resume, image_url=image_url)
        db.session.add(livre)
        db.session.commit()
        return livre

    @staticmethod
    def get_all():
        return Livre.query.all()

    @staticmethod
    def get_by_id(livre_id):
        return Livre.query.get(livre_id)

    def update(self, **kwargs):
        for key, value in kwargs.items():
            if hasattr(self, key) and value is not None:
                setattr(self, key, value)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()


# ----------------- Auteurs -----------------
class Auteur(db.Model):
    __tablename__ = 'auteurs'
    
    id = db.Column(db.Integer, primary_key=True)
    nom = db.Column(db.String(100), nullable=False)
    prenom = db.Column(db.String(100))
    biographie = db.Column(db.Text)
    date_naissance = db.Column(db.Date)
    nationalite = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # CRUD Methods
    @staticmethod
    def create(nom, prenom=None, biographie=None, date_naissance=None, nationalite=None):
        auteur = Auteur(nom=nom, prenom=prenom, biographie=biographie,
                        date_naissance=date_naissance, nationalite=nationalite)
        db.session.add(auteur)
        db.session.commit()
        return auteur

    @staticmethod
    def get_all():
        return Auteur.query.all()

    @staticmethod
    def get_by_id(auteur_id):
        return Auteur.query.get(auteur_id)

    def update(self, **kwargs):
        for key, value in kwargs.items():
            if hasattr(self, key) and value is not None:
                setattr(self, key, value)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()


# ----------------- Livres_Auteurs -----------------
class LivreAuteur(db.Model):
    __tablename__ = 'livres_auteurs'
    
    id = db.Column(db.Integer, primary_key=True)
    livre_id = db.Column(db.Integer, db.ForeignKey('livres.id', ondelete='CASCADE'))
    auteur_id = db.Column(db.Integer, db.ForeignKey('auteurs.id', ondelete='CASCADE'))

    @staticmethod
    def create(livre_id, auteur_id):
        link = LivreAuteur(livre_id=livre_id, auteur_id=auteur_id)
        db.session.add(link)
        db.session.commit()
        return link


# ----------------- Membres -----------------
class Membre(db.Model):
    __tablename__ = 'membres'
    
    id = db.Column(db.Integer, primary_key=True)
    nom = db.Column(db.String(100), nullable=False)
    prenom = db.Column(db.String(100))
    email = db.Column(db.String(150), unique=True)
    telephone = db.Column(db.String(50))
    adresse = db.Column(db.Text)
    date_inscription = db.Column(db.DateTime, default=datetime.utcnow)
    actif = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    emprunts = db.relationship('Emprunt', backref='membre', lazy=True)

    # CRUD Methods
    @staticmethod
    def create(nom, prenom=None, email=None, telephone=None, adresse=None, actif=True):
        membre = Membre(nom=nom, prenom=prenom, email=email, telephone=telephone,
                        adresse=adresse, actif=actif)
        db.session.add(membre)
        db.session.commit()
        return membre

    @staticmethod
    def get_all():
        return Membre.query.all()

    @staticmethod
    def get_by_id(membre_id):
        return Membre.query.get(membre_id)

    def update(self, **kwargs):
        for key, value in kwargs.items():
            if hasattr(self, key) and value is not None:
                setattr(self, key, value)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()


# ----------------- Emprunts -----------------
class Emprunt(db.Model):
    __tablename__ = 'emprunts'
    
    id = db.Column(db.Integer, primary_key=True)
    livre_id = db.Column(db.Integer, db.ForeignKey('livres.id', ondelete='CASCADE'))
    membre_id = db.Column(db.Integer, db.ForeignKey('membres.id', ondelete='CASCADE'))
    date_emprunt = db.Column(db.DateTime, default=datetime.utcnow)
    date_retour_prevue = db.Column(db.Date)
    date_retour_effective = db.Column(db.Date)
    statut = db.Column(db.String(50), default='En cours')
    amendes = db.Column(db.Numeric(10,2), default=0.00)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # CRUD Methods
    @staticmethod
    def create(livre_id, membre_id, date_retour_prevue=None, statut='En cours', amendes=0.0):
        emprunt = Emprunt(livre_id=livre_id, membre_id=membre_id,
                          date_retour_prevue=date_retour_prevue, statut=statut,
                          amendes=amendes)
        db.session.add(emprunt)
        db.session.commit()
        return emprunt

    @staticmethod
    def get_all():
        return Emprunt.query.all()

    @staticmethod
    def get_by_id(emprunt_id):
        return Emprunt.query.get(emprunt_id)

    def update(self, **kwargs):
        for key, value in kwargs.items():
            if hasattr(self, key) and value is not None:
                setattr(self, key, value)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()


# ----------------- Details -----------------
class Detail(db.Model):
    __tablename__ = 'details'
    
    id = db.Column(db.Integer, primary_key=True)
    livre_id = db.Column(db.Integer, db.ForeignKey('livres.id', ondelete='CASCADE'))
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id', ondelete='SET NULL'))
    isbn = db.Column(db.String(50))
    description = db.Column(db.Text)
    image_url = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # CRUD Methods
    @staticmethod
    def create(livre_id, category_id=None, isbn=None, description=None, image_url=None):
        detail = Detail(livre_id=livre_id, category_id=category_id, isbn=isbn,
                        description=description, image_url=image_url)
        db.session.add(detail)
        db.session.commit()
        return detail

    @staticmethod
    def get_all():
        return Detail.query.all()

    @staticmethod
    def get_by_id(detail_id):
        return Detail.query.get(detail_id)

    def update(self, **kwargs):
        for key, value in kwargs.items():
            if hasattr(self, key) and value is not None:
                setattr(self, key, value)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()
