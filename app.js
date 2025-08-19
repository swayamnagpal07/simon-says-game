let gameSeq = [];
let userSeq = [];
let gameStarted = false;
let level = 0;
let maxScore=0;
let btns = ["red", "yellow", "green", "purple"];
let h2 = document.querySelector("h2");
document.addEventListener("keypress", function () {
    if (gameStarted == false) {
        console.log("game started");
        gameStarted = true;
        levelUp();
    }
});

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPressed);
}


function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 100);
}
function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 100);
}

function levelUp() {
    userSeq = [];
    level++;
    if (level>=maxScore){
        maxScore=level;
    }
    h2.innerHTML = `Level ${level}<br>Your maximum score ${maxScore} ` ;
    let randIdx = Math.floor(Math.random() * allBtns.length);
    let randBtn = document.querySelector(`.${btns[randIdx]}`);
    gameSeq.push(btns[randIdx]);
    console.log("game ", gameSeq);
    gameFlash(randBtn);
}
function btnPressed() {
    btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute("id");
    console.log(userColor);
    userSeq.push(userColor);
    console.log("user ", userSeq);
    checkAns(userSeq.length - 1);
}
function checkAns(idx) {
    // console.log(level);
    if (userSeq[idx] == gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp(), 1000);
        }
    }
    else {
        h2.innerHTML = `Game Over! <b>your score was ${level}</b><br>Press any key to start`;
        let body=document.querySelector("body");
        body.classList.add("gameover")
        setTimeout(function(){
            body.classList.remove("gameover")
        },150);
        reset();
    }
}
function reset() {
    gameSeq = [];
    userSeq = [];
    gameStarted = false;
    level = 0;
}