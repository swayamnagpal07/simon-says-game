// ===== GAME STATE =====
let gameSeq = [];
let userSeq = [];
let gameStarted = false;
let level = 0;
let maxScore = 0;

// ===== SOUNDS =====
let gameSound = new Audio("sounds/beep.wav");
let userSound = new Audio("sounds/user-input.wav");
let wrongSound = new Audio("sounds/game-over.wav");

// ===== ELEMENTS =====
let btns = ["red", "yellow", "green", "purple"];
let h2 = document.querySelector("h2");
let allBtns = document.querySelectorAll(".btn");

// ===== START GAME =====
document.addEventListener("keypress", function () {
  if (!gameStarted) {
    gameStarted = true;
    levelUp();
  }
});

// ===== BUTTON EVENTS =====
for (let btn of allBtns) {
  btn.addEventListener("click", btnPressed);
}

// ===== GAME FLASH (SYNC WITH SOUND) =====
function gameFlash(btn) {
  btn.classList.add("flash");

  gameSound.currentTime = 0;
  gameSound.play();

  gameSound.onended = () => {
    btn.classList.remove("flash");
  };
}

// ===== USER FLASH (SYNC WITH SOUND) =====
function userFlash(btn) {
  btn.classList.add("userflash");

  userSound.currentTime = 0;
  userSound.play();

  userSound.onended = () => {
    btn.classList.remove("userflash");
  };
}

// ===== LEVEL UP =====
function levelUp() {
  userSeq = [];
  level++;

  h2.innerHTML = `Level ${level}<br>Max Score: ${maxScore}`;

  let randIdx = Math.floor(Math.random() * btns.length);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);

  gameSeq.push(randColor);
  gameFlash(randBtn);
}

// ===== BUTTON PRESS =====
function btnPressed() {
  if (!gameStarted) return;

  let btn = this;
  userFlash(btn);

  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

// ===== CHECK ANSWER =====
function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 800);
    }
  } else {
    gameOver();
  }
}

// ===== GAME OVER =====
function gameOver() {
  maxScore = Math.max(maxScore, level - 1);

  h2.innerHTML = `Game Over! <b>Your score was ${level - 1}</b><br>Press any key to start`;

  document.body.classList.add("gameover");

  wrongSound.currentTime = 0;
  wrongSound.play();

  wrongSound.onended = () => {
    document.body.classList.remove("gameover");
  };

  reset();
}

// ===== RESET GAME =====
function reset() {
  gameSeq = [];
  userSeq = [];
  gameStarted = false;
  level = 0;
}
