
const faceImages = [
    "static/img/face1.png",
    "static/img/face2.png",
    "static/img/face3.png",
    "static/img/face4.png"
];

let gameBoard = document.getElementById("game-board");
let score = 0;
let isGameOver = false;

function getRandomImage() {
    return faceImages[Math.floor(Math.random() * faceImages.length)];
}

function getRandomColumn() {
    return Math.floor(Math.random() * 4);
}

function addNewRow() {
    const row = document.createElement("div");
    row.className = "row d-flex";

    const faceCol = getRandomColumn();

    for (let i = 0; i < 4; i++) {
        const tile = document.createElement("div");
        tile.className = "tile border";

        if (i === faceCol) {
            const img = document.createElement("img");
            img.src = getRandomImage();
            img.style.width = "100%";
            img.onclick = () => {
                if (isGameOver) return;
                score++;
                document.getElementById("score").innerText = score;
                scrollDown();
            };
            tile.appendChild(img);
        } else {
            tile.onclick = () => {
                if (!isGameOver) {
                    alert("Game Over!");
                    isGameOver = true;
                }
            };
        }

        row.appendChild(tile);
    }

    gameBoard.insertBefore(row, gameBoard.firstChild);

    // Keep only 8 rows
    while (gameBoard.children.length > 8) {
        gameBoard.removeChild(gameBoard.lastChild);
    }
}

function scrollDown() {
    addNewRow();
}

function startGame() {
    score = 0;
    isGameOver = false;
    gameBoard.innerHTML = "";
    for (let i = 0; i < 8; i++) {
        addNewRow();
    }
    document.getElementById("score").innerText = score;
}

window.onload = startGame;


let gameTime = 10;
let gameTimer;

function startGameWithTime(seconds) {
    gameTime = seconds;
    document.querySelector(".main-menu").style.display = "none";
    document.getElementById("game-section").style.display = "block";
    startGame();
    gameTimer = setTimeout(() => {
        alert("タイムアップ！ スコア: " + score);
        isGameOver = true;
    }, gameTime * 1000);
}
