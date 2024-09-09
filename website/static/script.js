// sidebar in&out

const toggler = document.querySelector(".toggler-btn");
toggler.addEventListener("click", function () {
  document.querySelector("#sidebar").classList.toggle("collapsed");
});


//*game.js*//

const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus"); // constant value 

function jump() {
  if (dino.classList != "jump") {
    dino.classList.add("jump"); 

    setTimeout(function () {
      dino.classList.remove("jump");
    }, 300); //so the jump can be entered every single time the key has been pressed
  }
}

let isAlive = setInterval(function () {
  // get current dino Y position
  let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));

  // get  the current cactus X position
  let cactusLeft = parseInt(
    window.getComputedStyle(cactus).getPropertyValue("left")
  );

  // detect collision
  if (cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 140) {
    // collision
    alert("Game Over!");
  }
}, 10);


document.addEventListener("keydown", function (event) {
  jump();
});


// pomodoro

let focusButton = document.getElementById("focus");
let buttons = document.querySelectorAll(".btn-pomo");
let shortBreakButton = document.getElementById("shortbreak");
let startButton = document.getElementById("btn-start");
let pause = document.getElementById("btn-pause");
let reset = document.getElementById("btn-reset");
let time = document.getElementById("time");

let set;
let active = "focus";
let count = 59;
let paused = true;
let minCount = 24;

time.textContent = `${minCount + 1}:00`;

// adds 0 in front of single digit values
const appendZero = (value) => {
  value = value < 10 ? `0${value}` : value;
  return value;
};

reset.addEventListener(
  "click",
  (resetTime = () => {
    pauseTimer();
    switch (active) {
      case "short":
        minCount = 4;
        break;
      default:
        minCount = 24;
        break;
    }
    count = 59;
    time.textContent = `${minCount + 1}:00`;
  })
);

const removeFocus = () => {
  buttons.forEach((btn) => {
    btn.classList.remove("btn-focus");
  });
};

focusButton.addEventListener("click", () => {
  removeFocus();
  focusButton.classList.add("btn-focus");
  pauseTimer();
  minCount = 24;
  count = 59;
  time.textContent = `${minCount + 1}:00`;
});

shortBreakButton.addEventListener("click", () => {
  active = "short";
  removeFocus();
  shortBreakButton.classList.add("btn-focus");
  pauseTimer();
  minCount = 4;
  count = 59;
  time.textContent = `${appendZero(minCount + 1)}:00`;
});

pause.addEventListener(
  "click",
  (pauseTimer = () => {
    paused = true;
    clearInterval(set);
    startButton.classList.remove("hide");
    pause.classList.remove("show");
    reset.classList.remove("show");
  })
);

startButton.addEventListener("click", () => {
  reset.classList.add("show");
  pause.classList.add("show");
  startButton.classList.add("hide");
  startButton.classList.remove("show");
  if (paused) {
    paused = false;
    time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
    set = setInterval(() => {
      count--;
      time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
      if (count == 0) {
        if (minCount != 0) {
          minCount--;
          count = 60;
        } else {
          clearInterval(set);
        }
      }
    }, 1000);
  }
});
