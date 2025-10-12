let board = ['','','','','','','','',''];
let currentPlayer = 'X';
let gameActive = true;

const winCombos = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

function handleClick(e) {
    const index = e.target.getAttribute('data-index');
    
    if (board[index] !== '' || !gameActive) return;
    
    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    
    if (checkWin(currentPlayer)) {
        document.getElementById('status').textContent = `${currentPlayer} wins!`;
        gameActive = false;
        return;
    }
    
    if (board.every(cell => cell !== '')) {
        document.getElementById('status').textContent = 'Tie game!';
        gameActive = false;
        return;
    }
    
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.getElementById('status').textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin(player) {
    return winCombos.some(combo => {
        return combo.every(index => board[index] === player);
    });
}

function restart() {
    board = ['','','','','','','','',''];
    currentPlayer = 'X';
    gameActive = true;
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
    });
    document.getElementById('status').textContent = 'Your turn (X)';
}

document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', handleClick);
});

document.getElementById('restart').addEventListener('click', restart);