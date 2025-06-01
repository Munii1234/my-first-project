const ROWS = 8;
const COLS = 4;
let score = 0;
let best = 0;
let cps = 0;
let intervalId;

function createRow() {
    const row = document.createElement('div');
    row.className = 'row';

    const faceCol = Math.floor(Math.random() * COLS);
    for (let i = 0; i < COLS; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';

        if (i === faceCol) {
            const img = document.createElement('img');
            img.src = 'static/img/face' + (Math.floor(Math.random() * 3) + 1) + '.png';
            cell.appendChild(img);
        }

        cell.addEventListener('click', () => {
            const allRows = document.querySelectorAll('.row');
            const lastRow = allRows[allRows.length - 1];
            // Only allow clicking the bottom-most row
            if (!lastRow.contains(cell)) return;

            if (!cell.querySelector('img')) {
                endGame();
                return;
            }

            score++;
            cps++;
            best = Math.max(best, score);
            updateScore();

            document.getElementById('grid').removeChild(lastRow);
            createRow();
        });

        row.appendChild(cell);
    }

    const grid = document.getElementById('grid');
    grid.insertBefore(row, grid.firstChild);
}

function updateScore() {
    document.getElementById('score').textContent = 'Score: ' + score;
    document.getElementById('best').textContent = 'Best: ' + best;
    document.getElementById('cps').textContent = 'CPS: ' + cps;
}

function endGame() {
    clearInterval(intervalId);
    alert("Game Over! Final score: " + score);
    location.reload();
}

function startGame() {
    for (let i = 0; i < ROWS; i++) createRow();
    intervalId = setInterval(() => cps = 0, 1000);
}

window.onload = startGame;
