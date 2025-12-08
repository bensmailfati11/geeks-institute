# 📝 Mini Project: Notes App

Application en ligne de commande pour gérer des notes avec Node.js. Cette application permet d'ajouter, lire, lister et supprimer des notes stockées dans un fichier JSON.

## 📋 Description

Cette application de prise de notes fonctionne entièrement dans le terminal. Les notes sont stockées dans un fichier JSON local (`notes-data.json`) et peuvent être manipulées via des commandes simples.

## 🚀 Installation

```bash
# Installer les dépendances
npm install

# L'application est maintenant prête à être utilisée
```

## 🎯 Utilisation

### Ajouter une note

```bash
node app add --title="Note Title" --body="Note's body"
```

Exemple:
```bash
node app add --title="Achats" --body="Acheter du lait et du pain"
```

**Sortie**:
```
Note created successfully
--
Title: Achats
Body: Acheter du lait et du pain
```

Si la note existe déjà:
```
Note already exists
```

### Lister toutes les notes

```bash
node app list
```

**Sortie**:
```
Printing 2 note(s).
--
Title: Achats
Body: Acheter du lait et du pain
--
Title: Travail
Body: Finir le projet Node.js
```

### Lire une note spécifique

```bash
node app read --title="Note Title"
```

Exemple:
```bash
node app read --title="Achats"
```

**Sortie**:
```
Note found
--
Title: Achats
Body: Acheter du lait et du pain
```

Si la note n'existe pas:
```
Note not found
```

### Supprimer une note

```bash
node app remove --title="Note Title"
```

Exemple:
```bash
node app remove --title="Achats"
```

**Sortie**:
```
Note was removed
```

Si la note n'existe pas:
```
Note not found
```

### Afficher l'aide

```bash
node app --help
```

## 🛠️ Technologies Utilisées

- **Node.js**: Runtime JavaScript
- **Yargs**: Parsing des arguments en ligne de commande
- **Lodash**: Bibliothèque utilitaire JavaScript
- **fs (File System)**: Module Node.js natif pour les opérations sur les fichiers

## 📁 Structure du Projet

```
Mini_Project_Notes_App/
├── app.js              # Point d'entrée de l'application
├── notes.js            # Module de gestion des notes
├── notes-data.json     # Fichier de stockage des notes (créé automatiquement)
├── package.json        # Configuration npm
├── .gitignore          # Fichiers à ignorer par Git
└── README.md           # Documentation
```

## 📦 Dépendances

### Yargs
Yargs permet de créer des interfaces en ligne de commande élégantes en parsant les arguments et en générant automatiquement de l'aide.

**Fonctionnalités utilisées**:
- Définition de commandes (`add`, `list`, `read`, `remove`)
- Options requises (`demand: true`)
- Alias pour les options (`--title` ou `-t`)
- Génération automatique d'aide

### Lodash
Bibliothèque utilitaire JavaScript qui fournit des fonctions pour manipuler des tableaux, objets, etc.

**Dans ce projet**: Utilisé pour démontrer l'intégration de dépendances npm.

## 🔍 Fonctionnalités du Module `notes.js`

### `fetchNotes()`
Lit et parse le fichier JSON contenant les notes.

### `saveNotes(notes)`
Sauvegarde les notes dans le fichier JSON avec formatage.

### `addNote(title, body)`
Ajoute une nouvelle note si elle n'existe pas déjà.

### `getAll()`
Retourne toutes les notes.

### `getNote(title)`
Trouve et retourne une note spécifique par son titre.

### `removeNote(title)`
Supprime une note par son titre.

### `logNote(note)`
Affiche une note formatée dans la console.

## ⚙️ Détails d'Implémentation

### Validation des Doublons
Lors de l'ajout d'une note, l'application vérifie si une note avec le même titre existe déjà:
```javascript
const duplicateNotes = notes.filter((note) => note.title === title);
if (duplicateNotes.length === 0) {
    // Ajouter la note
}
```

### Gestion des Erreurs
- Si le fichier `notes-data.json` n'existe pas, il sera créé automatiquement
- Les commandes invalides affichent "Command not recognized"
- Les opérations sur des notes inexistantes retournent des messages appropriés

### Format du Fichier JSON
```json
[
  {
    "title": "Achats",
    "body": "Acheter du lait et du pain"
  },
  {
    "title": "Travail",
    "body": "Finir le projet Node.js"
  }
]
```

## 🧪 Exemples de Commandes

```bash
# Ajouter plusieurs notes
node app add --title="Rendez-vous" --body="Dentiste à 14h"
node app add --title="Idées" --body="Créer une app mobile"

# Lister toutes les notes
node app list

# Lire une note spécifique
node app read --title="Rendez-vous"

# Supprimer une note
node app remove --title="Idées"

# Utiliser les alias
node app add -t "Test" -b "Ceci est un test"
```

## 🐛 Dépannage

**Erreur: Command not found**
- Assurez-vous d'être dans le bon répertoire
- Vérifiez que Node.js est installé: `node --version`

**Les notes ne sont pas sauvegardées**
- Vérifiez les permissions d'écriture du dossier
- Le fichier `notes-data.json` sera créé automatiquement

**Erreur lors de l'installation**
- Supprimez `node_modules` et réinstallez: `npm install`

## 💡 Améliorations Possibles

- Ajouter la possibilité de modifier une note existante
- Implémenter des catégories pour les notes
- Ajouter des timestamps (date de création/modification)
- Créer une commande de recherche par mot-clé
- Ajouter des couleurs dans le terminal (avec chalk)
- Exporter les notes en différents formats (CSV, Markdown)
- Ajouter la possibilité de trier les notes

## 📄 Licence

ISC

## 👨‍💻 Auteur

Geeks Institute - Week 6, Day 4

## 🎓 Concepts Appris

- Utilisation du module File System de Node.js
- Parsing d'arguments en ligne de commande avec Yargs
- Manipulation de fichiers JSON
- Création de modules Node.js réutilisables
- Gestion d'erreurs et validation de données
- Création d'interfaces CLI interactives
