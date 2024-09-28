// sidebar in&out

const toggler = document.querySelector(".toggler-btn");
toggler.addEventListener("click", function () {
  document.querySelector("#sidebar").classList.toggle("collapsed");
});

// pomodoro

let focusButton = document.getElementById("focus");
let buttons = document.querySelectorAll(".btn-pomo");
let shortBreakButton = document.getElementById("shortbreak");
let startButton = document.getElementById("btn-start");
let pause = document.getElementById("btn-pause");
let reset = document.getElementById("btn-reset");
let game = document.getElementById("btn-game");
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
  game.classList.remove("show");
  game.classList.add("hide");
  removeFocus();
  focusButton.classList.add("btn-focus");
  pauseTimer();
  minCount = 24;
  count = 59;
  time.textContent = `${minCount + 1}:00`;
});

shortBreakButton.addEventListener("click", () => {
  game.classList.remove("hide");
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

// to-do list

const inputTodo = document.getElementById("input-todo");
const listContainer = document.getElementById("list-container");

function addTask() {
  if (inputTodo.value === "") {
    alert("Write something!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputTodo.value;
    listContainer.appendChild(li);
    let span = document.createElement("Span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  inputTodo.value = "";
  saveData();
}

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}

showTask();

//
// var bgArray = ["pixel_camp.jpg", "campsite.jpg", "mountainside.jpg"];

// $("#bg-choices").on("click", function () {
//   value = $(this).val() - 1;
//   $("body").css({ "background-image": "url(" + bgArray[value] + ")" });
// });


// 

// Function to update the background based on user selection
function updateBackground(selectedBackground) {
  const BackgroundSelect = document.getElementById("BackgroundSelect");

  // Find the selected option
  const selectedOption = BackgroundSelect.querySelector(`option[value="${selectedBackground}"]`);
  const backgroundImage = selectedOption.getAttribute('background-img'); // Get the background image URL from the selected option

  // Check if the background image is valid
  if (backgroundImage) {
    // Update the body background
    const body = document.getElementsByTagName("body")[0];
    body.style.backgroundImage = `url('${backgroundImage}')`;
    body.style.backgroundSize = 'cover'; // Ensure it covers the entire page
    body.style.backgroundPosition = 'center';
    body.style.backgroundRepeat = 'no-repeat';

    // Save the selection to localStorage so it persists
    localStorage.setItem('selectedBackground', selectedBackground);
    localStorage.setItem('backgroundImage', backgroundImage);
  } else {
    console.error("Background image not found!");
  }
}

// Event listener for Background selection change
document.getElementById("BackgroundSelect").addEventListener('change', function () {
  const selectedBackground = this.value;
  updateBackground(selectedBackground);  // Update background when user selects a new option
});

// Load saved background from localStorage on page load
window.onload = function () {
  const savedBackground = localStorage.getItem('selectedBackground') || 'pixel_camp';
  const savedImageBg = localStorage.getItem('backgroundImage') || '{{ url_for("static", filename="pixel_camp.jpg") }}';

  const BackgroundElement = document.getElementsByTagName("body")[0];
  const BackgroundSelect = document.getElementById("BackgroundSelect");

  // Set the body background to the saved background image
  if (savedImageBg) {
    BackgroundElement.style.backgroundImage = `url('${savedImageBg}')`;
    BackgroundElement.style.backgroundSize = 'cover'; // Ensure it covers the entire page
    BackgroundElement.style.backgroundPosition = 'center';
    BackgroundElement.style.backgroundRepeat = 'no-repeat';
  }

  // Set the dropdown value to the saved background option
  BackgroundSelect.value = savedBackground;
};