let gameId = null;
let currentPlayer = null;
let gameState = null;
let playerNames = { player1: '', player2: '' };

// Get DOM elements
const setupScreen = document.getElementById('setup-screen');
const gameScreen = document.getElementById('game-screen');
const gameoverScreen = document.getElementById('gameover-screen');
const startGameBtn = document.getElementById('start-game');
const player1Input = document.getElementById('player1-name');
const player2Input = document.getElementById('player2-name');
const gameBoard = document.getElementById('game-board');
const turnIndicator = document.getElementById('turn-indicator');
const player1NameDisplay = document.getElementById('player1-name-display');
const player2NameDisplay = document.getElementById('player2-name-display');
const player1PosDisplay = document.getElementById('player1-pos');
const player2PosDisplay = document.getElementById('player2-pos');
const controlButtons = document.querySelectorAll('.control-btn');
const attackBtn = document.getElementById('attack-btn');
const logMessages = document.getElementById('log-messages');
const newGameBtn = document.getElementById('new-game');
const winnerTitle = document.getElementById('winner-title');
const winnerMarker = document.getElementById('winner-marker');
const winnerName = document.getElementById('winner-name');
const winnerMessage = document.getElementById('winner-message');
const totalTurnsDisplay = document.getElementById('total-turns');

// Start Game
startGameBtn.addEventListener('click', async () => {
    const player1Name = player1Input.value.trim();
    const player2Name = player2Input.value.trim();

    if (!player1Name || !player2Name) {
        addLog('Veuillez entrer les noms des deux joueurs!', 'error');
        return;
    }

    playerNames.player1 = player1Name;
    playerNames.player2 = player2Name;

    try {
        const response = await fetch('/api/game/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                player1: player1Name,
                player2: player2Name
            })
        });

        const data = await response.json();

        if (response.ok) {
            gameId = data.gameId;
            currentPlayer = 'player1';
            setupScreen.classList.remove('active');
            gameScreen.classList.add('active');
            await loadGameState();
            addLog(`Partie créée! ${player1Name} commence.`, 'success');
        } else {
            addLog(data.error || 'Erreur lors de la création de la partie', 'error');
        }
    } catch (error) {
        console.error('Error creating game:', error);
        addLog('Erreur de connexion au serveur', 'error');
    }
});

// Load Game State
async function loadGameState() {
    try {
        const response = await fetch(`/api/game/${gameId}`);
        const data = await response.json();

        if (response.ok) {
            gameState = data;
            renderGame();
        } else {
            addLog(data.error || 'Erreur lors du chargement de la partie', 'error');
        }
    } catch (error) {
        console.error('Error loading game:', error);
        addLog('Erreur de connexion au serveur', 'error');
    }
}

// Render Game
function renderGame() {
    if (!gameState) return;

    // Update player names
    player1NameDisplay.textContent = gameState.player1.name;
    player2NameDisplay.textContent = gameState.player2.name;

    // Update positions
    player1PosDisplay.textContent = `Position: (${gameState.player1.position.x}, ${gameState.player1.position.y})`;
    player2PosDisplay.textContent = `Position: (${gameState.player2.position.x}, ${gameState.player2.position.y})`;

    // Update turn indicator
    const currentPlayerName = gameState.currentTurn === 'player1' ? gameState.player1.name : gameState.player2.name;
    turnIndicator.textContent = `Tour de: ${currentPlayerName}`;

    // Enable/disable controls based on turn
    const isMyTurn = gameState.currentTurn === currentPlayer;
    controlButtons.forEach(btn => {
        btn.disabled = !isMyTurn;
    });

    // Render board
    renderBoard();
}

// Render Board
function renderBoard() {
    gameBoard.innerHTML = '';

    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.x = x;
            cell.dataset.y = y;

            const cellContent = gameState.grid[y][x];

            // Check for obstacles
            if (cellContent === 'X') {
                cell.classList.add('obstacle');
                cell.textContent = '🚧';
            }

            // Check for bases
            if (x === gameState.player1.base.x && y === gameState.player1.base.y) {
                cell.classList.add('base-player1');
                cell.textContent = '🏠';
            }
            if (x === gameState.player2.base.x && y === gameState.player2.base.y) {
                cell.classList.add('base-player2');
                cell.textContent = '🏠';
            }

            // Check for player positions
            if (x === gameState.player1.position.x && y === gameState.player1.position.y) {
                cell.classList.add('player1-pos');
                cell.textContent = '🔵';
            }
            if (x === gameState.player2.position.x && y === gameState.player2.position.y) {
                cell.classList.add('player2-pos');
                cell.textContent = '🔴';
            }

            gameBoard.appendChild(cell);
        }
    }
}

// Move Controls
controlButtons.forEach(btn => {
    if (btn.id !== 'attack-btn') {
        btn.addEventListener('click', async () => {
            const direction = btn.dataset.direction;
            await makeMove(direction);
        });
    }
});

// Make Move
async function makeMove(direction) {
    try {
        const response = await fetch(`/api/game/${gameId}/move`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                player: gameState.currentTurn,
                direction: direction
            })
        });

        const data = await response.json();

        if (response.ok) {
            if (data.success) {
                addLog(`${gameState[gameState.currentTurn].name} s'est déplacé vers ${direction}`, 'success');
                gameState = data.gameState;
                
                // Switch turn
                currentPlayer = currentPlayer === 'player1' ? 'player2' : 'player1';
                
                renderGame();

                // Check for winner
                if (data.gameState.winner) {
                    setTimeout(() => {
                        showGameOver(data.gameState.winner);
                    }, 1000);
                }
            } else {
                addLog(data.message || 'Mouvement invalide', 'error');
            }
        } else {
            addLog(data.error || 'Erreur lors du mouvement', 'error');
        }
    } catch (error) {
        console.error('Error making move:', error);
        addLog('Erreur de connexion au serveur', 'error');
    }
}

// Attack
attackBtn.addEventListener('click', async () => {
    try {
        const response = await fetch(`/api/game/${gameId}/attack`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                player: gameState.currentTurn
            })
        });

        const data = await response.json();

        if (response.ok) {
            if (data.success) {
                addLog(`${gameState[gameState.currentTurn].name} a capturé la base adverse!`, 'success');
                setTimeout(() => {
                    showGameOver(data.winner);
                }, 1000);
            } else {
                addLog(data.message || 'Attaque impossible', 'error');
            }
        } else {
            addLog(data.error || 'Erreur lors de l\'attaque', 'error');
        }
    } catch (error) {
        console.error('Error attacking:', error);
        addLog('Erreur de connexion au serveur', 'error');
    }
});

// Add Log Entry
function addLog(message, type = 'info') {
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    entry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
    logMessages.prepend(entry);

    // Keep only last 20 entries
    while (logMessages.children.length > 20) {
        logMessages.removeChild(logMessages.lastChild);
    }
}

// Show Game Over
function showGameOver(winner) {
    gameScreen.classList.remove('active');
    gameoverScreen.classList.add('active');

    const winnerData = gameState[winner];
    winnerTitle.textContent = '🏆 Victoire! 🏆';
    winnerMarker.textContent = winner === 'player1' ? '🔵' : '🔴';
    winnerName.textContent = winnerData.name;
    winnerMessage.textContent = `${winnerData.name} a capturé la base adverse!`;
    
    // Calculate turns (each player's move counts as one turn)
    const turns = Math.ceil(gameState.grid.flat().filter(cell => cell === 'P1' || cell === 'P2').length / 2);
    totalTurnsDisplay.textContent = `Nombre total de tours: ${turns}`;
}

// New Game
newGameBtn.addEventListener('click', () => {
    gameoverScreen.classList.remove('active');
    setupScreen.classList.add('active');
    gameId = null;
    gameState = null;
    currentPlayer = null;
    logMessages.innerHTML = '';
    player1Input.value = '';
    player2Input.value = '';
});
