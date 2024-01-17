const board = document.getElementById('board');
const message = document.getElementById('message');
const resetButton = document.querySelector('#buttons button:nth-child(1)');
const pauseButton = document.querySelector('#buttons button:nth-child(2)');
let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function handleCellClick(index) {
    if (!gameActive || boardState[index] !== '') return;

    boardState[index] = currentPlayer;
    renderBoard();
    checkWin();
    checkTie();
    togglePlayer();
}

function renderBoard() {
    board.innerHTML = '';
    boardState.forEach((value, index) => {
        const cell = document.createElement('div');
        cell.className = `cell ${value}`;
        cell.textContent = value;
        cell.addEventListener('click', () => handleCellClick(index));
        board.appendChild(cell);
    });
}

function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            gameActive = false;
            message.textContent = `${currentPlayer} wins!`;
            celebrateWin();
            return;
        }
    }
}

function checkTie() {
    if (!boardState.includes('') && gameActive) {
        gameActive = false;
        message.textContent = 'It\'s a tie!';
    }
}

function celebrateWin() {
    const confettiConfig = {
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    };

    if (window.innerWidth < 768) {
        confettiConfig.particleCount = 50;
    }

    confetti(confettiConfig);
}

function resetGame() {
    boardState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    message.textContent = '';
    renderBoard();
}

function togglePause() {
    gameActive = !gameActive;
    message.textContent = gameActive ? '' : 'Game paused';
}

renderBoard();
