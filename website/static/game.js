//game.js//

const char = document.getElementById("char");
const ufo = document.getElementById("ufo"); // constant value
const gameOver1 = document.getElementById("gameover");

function jump() {
  if (char.classList != "jump") {
    char.classList.add("jump");

    setTimeout(function () {
      char.classList.remove("jump");
    }, 300);
  }
}

// function gameOver() {
//   let paused = true;
  
// }

let isAlive = setInterval(function () {
  // get current dino Y position
  let charTop = parseInt(window.getComputedStyle(char).getPropertyValue("top"));

  // get current cactus X position
  let ufoLeft = parseInt(
    window.getComputedStyle(ufo).getPropertyValue("left")
  );

  // detect collision
  if (ufoLeft < 50 && ufoLeft > 0 && charTop >= 80) {
    alert("Game over!")
    // gameOver1.innerHTML = "Game Over!";
 
    // ends the game
    clearInterval(isAlive);
  
    
  }
}, 10);

document.addEventListener("keydown", function (event) {
  jump();
});
