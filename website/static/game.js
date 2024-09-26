//game.js//

const char = document.getElementById("char");
const ufo = document.getElementById("ufo");
const gameOverText = document.getElementById("gameover");
const scoreDisplay = document.getElementById("score");

let gameOver = false;  // Initial state of the game

gameOverText.style.display = "none";//it hides the gameover text

function jump() {
  if (char.classList != "jump") {
    char.classList.add("jump");

    setTimeout(function () {
      char.classList.remove("jump");
    }, 300); //controls the time of the jump
  }
}

//detects collisions
function detectCollisions() {
  let charTop = parseInt(window.getComputedStyle(char).getPropertyValue("top"));
  let ufoLeft = parseInt(window.getComputedStyle(ufo).getPropertyValue("left"));

  // Detect if the character hits the UFO
  if (ufoLeft < 50 && ufoLeft > 0 && charTop >= 80) {
    gameOver = true;  // Set gameOver to true when collision happens
  }
}

let score = 0;

function updateScore() {
  if (!gameOver) {
    score++;  // counts how many ufo has passed
    scoreDisplay.innerHTML = score;  // Update the score on the screen
  }
}



function gameLoop() {
  detectCollisions(); // set gameOver to true
  
  if (gameOver) {
    // Display message 
    gameOverText.innerHTML = `Game Over! score: ${score}`;
    gameOverText.style.display = "block";
    ufo.style.animation = "none";
    ufo.style.display = "none";

    // End the game loop by stopping further actions
    clearInterval(isAlive);
  } 
}

// Set an interval for the game loop to run
let isAlive = setInterval(gameLoop, 10);

let scoreInterval = setInterval(updateScore, 100); 


// Listen for keydown events to trigger the jump
document.addEventListener("keydown", function (event) {
  if (!gameOver) {
    jump();
  }
});

//user's option on the character

window.onload = function() {
  const SelectedCharacter = localStorage.getItem('SelectedCharacter') || 'astro';
  const characterElement = document.getElementById('char');

  characterElement.style.backgroundImage = `url('${SelectedCharacter}_run.png')`;

  
};