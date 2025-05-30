let score = 0;
let clicks = 0;
let best = 0;
let timeLeft = 20;
let interval;
let cps = 0;

const grid = document.getElementById('grid');
const timer = document.getElementById('timer');
const results = document.getElementById('results');
const scoreEl = document.getElementById('score');
const bestEl = document.getElementById('best');
const cpsEl = document.getElementById('cps');

function startGame() {
  score = 0;
  clicks = 0;
  timeLeft = 20;
  grid.innerHTML = '';
  results.classList.add('hidden');
  timer.textContent = 'TIME: 20';

  interval = setInterval(() => {
    timeLeft--;
    timer.textContent = 'TIME: ' + timeLeft;
    if (timeLeft <= 0) {
      clearInterval(interval);
      endGame();
    }
  }, 1000);

  spawnFace();
}

function spawnFace() {
  const randomIndex = Math.floor(Math.random() * 16);
  grid.innerHTML = '';
  for (let i = 0; i < 16; i++) {
    const tile = document.createElement('div');
    tile.classList.add('face');
    if (i === randomIndex) {
      tile.onclick = () => {
        score++;
        clicks++;
        spawnFace();
      };
    } else {
      tile.onclick = () => {
        clicks++;
        spawnFace();
      };
    }
    grid.appendChild(tile);
  }
}

function endGame() {
  cps = (clicks / 20).toFixed(2);
  scoreEl.textContent = score;
  best = Math.max(best, score);
  bestEl.textContent = best;
  cpsEl.textContent = cps;
  results.classList.remove('hidden');
}

startGame();
