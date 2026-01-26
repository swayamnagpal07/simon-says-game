// ===== GAME STATE =====
let gameSeq = [];
let userSeq = [];
let level = 0;
let maxScore = 0;
let gameStarted = false;

// ===== SOUNDS =====
let gameSound = new Audio("sounds/beep.wav");
let userSound = new Audio("sounds/user-input.wav");
let wrongSound = new Audio("sounds/game-over.wav");

// ===== ELEMENTS =====
const btns = ["red", "yellow", "green", "purple"];
const statusText = document.getElementById("status");
const startBtn = document.getElementById("startBtn");
const allBtns = document.querySelectorAll(".btn");

// ===== UNLOCK AUDIO (MOBILE FIX) =====
function unlockAudio() {
  [gameSound, userSound, wrongSound].forEach((sound) => {
    sound
      .play()
      .then(() => sound.pause())
      .catch(() => {});
  });
}
document.addEventListener("pointerdown", unlockAudio, { once: true });

// ===== START GAME =====
startBtn.addEventListener("pointerdown", () => {
  if (gameStarted) return;
  gameStarted = true;
  startBtn.style.display = "none";
  levelUp();
});

// ===== BUTTON EVENTS =====
allBtns.forEach((btn) => {
  btn.addEventListener("pointerdown", btnPressed);
});

// ===== GAME FLASH =====
function gameFlash(btn) {
  btn.classList.add("flash");
  gameSound.currentTime = 0;
  gameSound.play();

  setTimeout(() => {
    btn.classList.remove("flash");
  }, 300);
}

// ===== USER FLASH =====
function userFlash(btn) {
  btn.classList.add("userflash");
  userSound.currentTime = 0;
  userSound.play();

  setTimeout(() => {
    btn.classList.remove("userflash");
  }, 200);
}

// ===== LEVEL UP =====
function levelUp() {
  userSeq = [];
  level++;

  statusText.innerHTML = `Level ${level}<br>Max Score: ${maxScore}`;

  const randColor = btns[Math.floor(Math.random() * btns.length)];
  gameSeq.push(randColor);

  const randBtn = document.querySelector(`#${randColor}`);
  setTimeout(() => gameFlash(randBtn), 400);
}

// ===== BUTTON PRESS =====
function btnPressed() {
  if (!gameStarted) return;

  const userColor = this.id;
  userSeq.push(userColor);
  userFlash(this);

  checkAnswer(userSeq.length - 1);
}

// ===== CHECK ANSWER =====
function checkAnswer(index) {
  if (userSeq[index] === gameSeq[index]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 700);
    }
  } else {
    gameOver();
  }
}

// ===== GAME OVER =====
function gameOver() {
  wrongSound.currentTime = 0;
  wrongSound.play();

  maxScore = Math.max(maxScore, level - 1);

  document.body.classList.add("gameover");
  statusText.innerHTML = `Game Over!<br>Your Score: ${level - 1}`;

  setTimeout(() => {
    document.body.classList.remove("gameover");
    resetGame();
  }, 900);
}

// ===== RESET =====
function resetGame() {
  gameSeq = [];
  userSeq = [];
  level = 0;
  gameStarted = false;
  startBtn.innerText = "▶ Restart Game";
  startBtn.style.display = "inline-block";
}
