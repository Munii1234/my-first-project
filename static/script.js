
let score = 0;
let bestScore = 0;
let clicks = 0;
let timeLeft = 20;
let interval;
let startTime;
const faces = ['static/img/face1.jpg', 'static/img/face2.jpg', 'static/img/face3.jpg'];

function startGame() {
  document.getElementById('home-screen').classList.add('hidden');
  document.getElementById('game-over').classList.add('hidden');
  document.getElementById('game-screen').classList.remove('hidden');

  score = 0;
  clicks = 0;
  timeLeft = 20;
  startTime = Date.now();
  document.getElementById('grid').innerHTML = '';
  updateHUD();

  for (let i = 0; i < 7; i++) {
    addRow();
  }

  clearInterval(interval);
  interval = setInterval(() => {
    timeLeft--;
    updateHUD();
    if (timeLeft <= 0) endGame();
  }, 1000);
}

function addRow() {
  const row = document.createElement('div');
  row.className = 'row';
  const correctIndex = Math.floor(Math.random() * 4);
  const randomFace = faces[Math.floor(Math.random() * faces.length)];

  for (let i = 0; i < 4; i++) {
    const tile = document.createElement('div');
    tile.className = 'tile';
    if (i === correctIndex) {
      tile.style.backgroundImage = `url(${randomFace})`;
      tile.dataset.correct = 'true';
    } else {
      tile.classList.add('blank');
    }
    row.appendChild(tile);
  }

  document.getElementById('grid').insertBefore(row, document.getElementById('grid').firstChild);
}

function updateHUD() {
  document.getElementById('timer').textContent = 'Time: ' + timeLeft;
  document.getElementById('score').textContent = 'Score: ' + score;
  const elapsed = (Date.now() - startTime) / 1000;
  const cps = clicks / elapsed;
  document.getElementById('cps').textContent = 'CPS: ' + cps.toFixed(2);
}

function endGame() {
  clearInterval(interval);
  document.getElementById('game-screen').classList.add('hidden');
  document.getElementById('game-over').classList.remove('hidden');
  document.getElementById('final-score').textContent = score;
  bestScore = Math.max(score, bestScore);
  document.getElementById('best-score').textContent = bestScore;
  document.getElementById('final-cps').textContent = (clicks / 20).toFixed(2);
}

function goHome() {
  document.getElementById('game-over').classList.add('hidden');
  document.getElementById('home-screen').classList.remove('hidden');
}

document.getElementById('grid').addEventListener('click', function (e) {
  if (timeLeft <= 0) return;
  const rows = document.querySelectorAll('.row');
  if (rows.length === 0) return;
  const bottomRow = rows[0];
  if (!bottomRow.contains(e.target)) return;

  if (e.target.dataset.correct === 'true') {
    score++;
    clicks++;
    updateHUD();
    bottomRow.remove();
    addRow();
  } else {
    endGame();
  }
});
