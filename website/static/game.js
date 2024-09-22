//game.js//

const char = document.getElementById("char");
const ufo = document.getElementById("ufo"); // constant value
const gameOver = document.getElementById("gameover");

function jump() {
  if (char.classList != "jump") {
    char.classList.add("jump");

    setTimeout(function () {
      char.classList.remove("jump");
    }, 300);
  }
}

let isAlive = setInterval(function () {
  // get current dino Y position
  let charTop = parseInt(window.getComputedStyle(char).getPropertyValue("top"));

  // get current cactus X position
  let ufoLeft = parseInt(
    window.getComputedStyle(ufo).getPropertyValue("left")
  );

  // detect collision
  if (ufoLeft < 50 && ufoLeft > 0 && charTop >= 80) {

    gameOver.innerHTML = "Game Over!";
    gameOver.style.color = "red";
    gameOver.style.fontSize = "30px";
    
    // ends the game
    clearInterval(isAlive);
  
    
  }
}, 10);

document.addEventListener("keydown", function (event) {
  jump();
});
