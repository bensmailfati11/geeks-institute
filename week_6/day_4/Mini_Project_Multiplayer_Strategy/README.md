# 🎮 Mini Project: Multiplayer Strategy Game

Un jeu de stratégie au tour par tour sur une grille 10x10 où deux joueurs s'affrontent pour capturer la base adverse.

## 📋 Description

Ce projet est un jeu de stratégie multijoueur où chaque joueur contrôle un personnage sur une grille de 10x10. L'objectif est d'atteindre et de capturer la base de l'adversaire tout en évitant les obstacles. Les joueurs se déplacent à tour de rôle dans quatre directions (haut, bas, gauche, droite).

## 🎯 Règles du Jeu

1. **Grille de jeu**: Terrain de 10x10 cases
2. **Obstacles**: 10 obstacles placés aléatoirement sur la grille
3. **Positions de départ**:
   - Joueur 1 (🔵): Coin supérieur gauche (0, 0)
   - Joueur 2 (🔴): Coin inférieur droit (9, 9)
4. **Bases**:
   - Base Joueur 1 (🏠): Position (0, 9)
   - Base Joueur 2 (🏠): Position (9, 0)
5. **Tour par tour**: Les joueurs jouent alternativement
6. **Mouvements**: 4 directions possibles (↑ ↓ ← →)
7. **Condition de victoire**: Atteindre une case adjacente à la base adverse et cliquer sur "Attaquer"

## 🚀 Installation

```bash
# Installer les dépendances
npm install

# Démarrer le serveur
npm start

# Mode développement avec auto-reload
npm run dev
```

Le jeu sera accessible sur `http://localhost:3000`

## 🛠️ Technologies Utilisées

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Architecture**: RESTful API
- **Gestion d'état**: En mémoire (GameManager)

## 📁 Structure du Projet

```
Mini_Project_Multiplayer_Strategy/
├── server.js                 # Serveur Express principal
├── package.json              # Configuration npm
├── models/
│   └── Game.js              # Logique du jeu et GameManager
├── routes/
│   └── game.js              # Routes API REST
└── public/
    ├── index.html           # Interface utilisateur
    ├── css/
    │   └── style.css        # Styles du jeu
    └── js/
        └── main.js          # Logique frontend
```

## 🔌 API Endpoints

### Créer une partie
```http
POST /api/game/create
Content-Type: application/json

{
  "player1": "Alice",
  "player2": "Bob"
}
```

**Réponse**:
```json
{
  "gameId": "unique-id",
  "message": "Game created successfully"
}
```

### Obtenir l'état du jeu
```http
GET /api/game/:gameId
```

**Réponse**:
```json
{
  "gameId": "unique-id",
  "grid": [[...]],
  "player1": {
    "name": "Alice",
    "position": {"x": 0, "y": 0},
    "base": {"x": 0, "y": 9}
  },
  "player2": {
    "name": "Bob",
    "position": {"x": 9, "y": 9},
    "base": {"x": 9, "y": 0}
  },
  "currentTurn": "player1",
  "winner": null
}
```

### Effectuer un mouvement
```http
POST /api/game/:gameId/move
Content-Type: application/json

{
  "player": "player1",
  "direction": "up"
}
```

**Réponse**:
```json
{
  "success": true,
  "message": "Move successful",
  "gameState": {...}
}
```

### Attaquer la base
```http
POST /api/game/:gameId/attack
Content-Type: application/json

{
  "player": "player1"
}
```

**Réponse**:
```json
{
  "success": true,
  "message": "Base captured!",
  "winner": "player1"
}
```

### Lister toutes les parties
```http
GET /api/game/
```

### Supprimer une partie
```http
DELETE /api/game/:gameId
```

## 🎮 Comment Jouer

1. **Démarrage**:
   - Entrez les noms des deux joueurs
   - Cliquez sur "Commencer la partie"

2. **Pendant le jeu**:
   - Le joueur actif voit ses contrôles activés
   - Utilisez les boutons directionnels pour vous déplacer
   - Les mouvements sont validés (pas de sortie de grille, pas d'obstacles)
   - Le tour passe automatiquement au joueur suivant

3. **Victoire**:
   - Approchez-vous de la base adverse (case adjacente)
   - Cliquez sur "Attaquer" pour capturer la base
   - L'écran de victoire s'affiche avec le gagnant

4. **Nouvelle partie**:
   - Cliquez sur "Nouvelle Partie" pour recommencer

## 💡 Fonctionnalités

- ✅ Interface responsive
- ✅ Validation des mouvements en temps réel
- ✅ Journal des actions (game log)
- ✅ Affichage des positions des joueurs
- ✅ Indicateur de tour actif
- ✅ Gestion d'obstacles aléatoires
- ✅ Détection automatique de victoire
- ✅ Animations et transitions CSS

## 🐛 Dépannage

**Le serveur ne démarre pas**:
- Vérifiez que le port 3000 est disponible
- Assurez-vous que les dépendances sont installées

**Les mouvements ne fonctionnent pas**:
- Vérifiez que c'est bien votre tour
- Assurez-vous de ne pas sortir de la grille
- Vérifiez qu'il n'y a pas d'obstacle sur la case cible

## 📝 Améliorations Possibles

- Ajouter un système de score
- Implémenter un mode multijoueur en temps réel avec WebSocket
- Ajouter des power-ups sur la grille
- Créer différents types de terrains
- Sauvegarder l'historique des parties
- Ajouter un système de replay

## 📄 Licence

ISC

## 👨‍💻 Auteur

Geeks Institute - Week 6, Day 4
