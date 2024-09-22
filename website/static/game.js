//game.js//

const char = document.getElementById("char");
const ufo = document.getElementById("ufo");
const gameOverText = document.getElementById("gameover");

let gameOver = false;  // Initial state of the game

function jump() {
  if (char.classList != "jump") {
    char.classList.add("jump");

    setTimeout(function () {
      char.classList.remove("jump");
    }, 300);
  }
}

// a function to detect collisions
function detectCollisions() {
  let charTop = parseInt(window.getComputedStyle(char).getPropertyValue("top"));
  let ufoLeft = parseInt(window.getComputedStyle(ufo).getPropertyValue("left"));

  // Detect if the character hits the UFO
  if (ufoLeft < 50 && ufoLeft > 0 && charTop >= 80) {
    gameOver = true;  // Set gameOver to true when collision happens
  }
}

// Game loop that runs continuously
function gameLoop() {
  // Detect collision and set gameOver to true if needed
  detectCollisions();
  
  if (gameOver) {
    // Display "Game Over!" message if the game is over
    gameOverText.innerHTML = "Game Over!";
    gameOverText.style.color = "red";
    gameOverText.style.fontSize = "30px";
    gameOverText.style.display = "block";  // Make sure the text is visible

    // End the game loop by stopping further actions
    clearInterval(isAlive);
  } 
}

// Set an interval for the game loop to run
let isAlive = setInterval(gameLoop, 10);

// Listen for keydown events to trigger the jump
document.addEventListener("keydown", function (event) {
  if (!gameOver) {
    jump();
  }
});
