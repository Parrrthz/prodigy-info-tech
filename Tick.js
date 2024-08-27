const board = document.querySelector('.board');
const cells = Array.from(document.querySelectorAll('.cell'));
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Handle cell click
board.addEventListener('click', (event) => {
    const cell = event.target;
    const index = cell.dataset.index;

    if (gameBoard[index] || !gameActive) return;

    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWinner()) {
        message.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
    } else if (gameBoard.every(cell => cell)) {
        message.textContent = 'It\'s a tie!';
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `Player ${currentPlayer}'s turn`;
    }
});

// Check for a winner
function checkWinner() {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winningCombos.some(combo => {
        const [a, b, c] = combo;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

// Reset game
resetButton.addEventListener('click', () => {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    message.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = '');
});
