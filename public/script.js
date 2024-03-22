document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const winnerDisplay = document.getElementById('winnerDisplay');
    const resetBtn = document.getElementById('resetBtn');
    const rows = 6;
    const cols = 7;
    let currentPlayer = 'red';
    let gameBoard = [];

    // Initialize the game board
    function initBoard() {
        for (let row = 0; row < rows; row++) {
            gameBoard[row] = [];
            for (let col = 0; col < cols; col++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = row;
                cell.dataset.col = col;
                board.appendChild(cell);
                gameBoard[row][col] = null;
            }
        }
    }

    // Check for a win
    function checkWin(row, col) {
        const directions = [
            [0, 1],  // horizontal
            [1, 0],  // vertical
            [1, 1],  // diagonal \
            [-1, 1]  // diagonal /
        ];

        for (const [dx, dy] of directions) {
            let count = 1;
            for (let i = 1; i < 4; i++) {
                const newRow = row + i * dx;
                const newCol = col + i * dy;
                if (newRow < 0 || newRow >= rows || newCol < 0 || newCol >= cols)
                    break;
                if (gameBoard[newRow][newCol] === currentPlayer)
                    count++;
                else
                    break;
            }
            for (let i = 1; i < 4; i++) {
                const newRow = row - i * dx;
                const newCol = col - i * dy;
                if (newRow < 0 || newRow >= rows || newCol < 0 || newCol >= cols)
                    break;
                if (gameBoard[newRow][newCol] === currentPlayer)
                    count++;
                else
                    break;
            }
            if (count >= 4)
                return true;
        }
        return false;
    }

    // Handle player move
    function handleMove(col) {
        for (let row = rows - 1; row >= 0; row--) {
            if (gameBoard[row][col] === null) {
                const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
                cell.classList.add(currentPlayer);
                gameBoard[row][col] = currentPlayer;
                if (checkWin(row, col)) {
                    winnerDisplay.innerHTML = `<p style="color: ${currentPlayer}; animation: blink 1s infinite;">${currentPlayer.toUpperCase()} wins!</p>`;
                    return;
                }
                currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
                return;
            }
        }
    }

    // Reset the game board
    function resetBoard() {
        board.innerHTML = '';
        gameBoard = [];
        currentPlayer = 'red';
        initBoard();
        winnerDisplay.innerHTML = '';
    }

    // Initialize the game
    initBoard();

    // Event listener for column click
    board.addEventListener('click', (e) => {
        if (e.target.classList.contains('cell')) {
            const col = parseInt(e.target.dataset.col);
            handleMove(col);
        }
    });

    // Event listener for reset button click
    resetBtn.addEventListener('click', () => {
        resetBoard();
    });
});




