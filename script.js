const cards = document.querySelectorAll(".card");
const levelDisplay = document.querySelector(".level");
const restartBtn = document.querySelector(".Restart-button");
const highScoreBtn = document.querySelector(".Highscore-button");
let sequence = [];        
let playerSequence = [];  
let level = 1;
let isAnimating = false;  
restartBtn.textContent = "Start"; 

restartBtn.addEventListener("click", () => {
  if (restartBtn.textContent === "Start") {
    startGame();
    restartBtn.textContent = "Restart";
    highScoreBtn.style.display = "none";
  } else {
    startGame(); 
  }
});
function startGame() {
  sequence = [];
  playerSequence = [];
  level = 1;
  levelDisplay.textContent = `Level ${level}`;
  nextRound();
}
function nextRound() {
  playerSequence = [];
  const colors = ["red", "blue", "green", "yellow"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  sequence.push(randomColor);

  levelDisplay.textContent = `Level ${level}`;
  blinkSequence();
}

function blinkSequence() {
  isAnimating = true;
  let delay = 0;

  sequence.forEach((color) => {
    setTimeout(() => {
      blinkCard(color);
    }, delay);
    delay += 700; 
  });

  setTimeout(() => {
    isAnimating = false;
  }, delay);
}

function blinkCard(color) {
  const card = document.querySelector(`.${color}`);
  card.classList.add("blink");
  setTimeout(() => {
    card.classList.remove("blink");
  }, 300);
}

cards.forEach((card) => {
  card.addEventListener("click", () => {
    if (isAnimating) return; 
    const color = card.classList[1];
    playerSequence.push(color);
    blinkCard(color); 

    checkPlayerMove(playerSequence.length - 1);
  });
});

function checkPlayerMove(index) {
  if (playerSequence[index] !== sequence[index]) {
    gameOver();
    return;
  }

  if (playerSequence.length === sequence.length) {
    level++;
    setTimeout(() => {
      nextRound();
    }, 1000);
  }
}

function gameOver() {
  levelDisplay.textContent = `Game Over! You reached Level ${level}`;
  isAnimating = true;
  const highScore = parseInt(localStorage.getItem("memoryblink_highscore")) || 0;
  if (level > highScore) {
    localStorage.setItem("memoryblink_highscore", level);
    alert(`New High Score! Level ${level}`);
  } else {
    alert(`Your Level: ${level}\nHighest Level: ${highScore}`);
  }
  highScoreBtn.style.display = "inline-block";
}

