window.onload = function () {
  console.log("please bro im ab to pass out and die");
  checkPermAudio();
  loadCheckboxState();
};

// window.addEventListener("load", () => {
//   console.log("please bro im ab to pass out and die");
//   checkPermAudio();
//   loadCheckboxState();
// });

// sound toggle button

var checkboxSound = document.getElementById("togg-s");
var checkboxBG = document.querySelector("input[name=togg-bg]");
var background = document.getElementsByTagName("body")[0];

window.checkPermAudio = function () {
  var bgm = document.getElementById("bgm");
  console.log("WORKS");

  if (bgm.paused) {
    let play = document.getElementById("play");

    play.onclick();
    {
      bgm.play();
    }
  }
};

// checkboxSound.addEventListener("change", function () {
//   if (this.checked) {
//     console.log("Checkbox is checked..");
//     bgm.play();
//     localStorage.setItem("togg-s", "true");
//   } else {
//     console.log("Checkbox is not checked..");
//     bgm.pause();
//     localStorage.setItem("togg-s", "false");
//   }
// });

window.loadCheckboxState = function () {
  checkboxSound.addEventListener("change", function () {
    const checkboxResult = this.value;
    if (this.checked) {
      console.log("Checkbox is checked..");
      bgm.play();
      localStorage.setItem("togg-s", checkboxResult);
    } else {
      console.log("Checkbox is not checked..");
      bgm.pause();
      localStorage.setItem("togg-s", checkboxResult);
    }
  });

<<<<<<< HEAD
checkboxSound.addEventListener("change", function () {
  if (this.checked) {
    console.log("Checkbox is checked..");
    bgm.play();
    localStorage.setItem("togg-s", "true");
  } else {
    console.log("Checkbox is not checked..");
    bgm.pause();
    localStorage.setItem("togg-s", "false");
=======
  const savedState = localStorage.getItem("togg-s");
  if (checkboxSound.checked) {
    bgm.play(); // Play music if it's checked
    console.log("please");
  } else {
    bgm.pause(); // Pause music if it's not checked
    console.log("gonna kill myself tn");
>>>>>>> 10627897780d1b12ca0f8161d291c336d1c05d22
  }
};

// Call this function on page load

// window.onload = loadCheckboxState;

function loadCheckboxState() {
  const savedState = localStorage.getItem("togg-s");
  if (savedState !== null) {
    checkboxSound.checked = savedState === "true"; // Set the checkbox state
    if (checkboxSound.checked) {
      bgm.play(); // Play music if it's checked
      console.log("please");
    } else {
      bgm.pause(); // Pause music if it's not checked
      console.log("gonna kill myself tn");
    }
  }
}

// Call this function on page load
// window.addEventListener("load", () => {
//   console.log("please bro im ab to pass out and die")
//   loadCheckboxState();
// });

window.onload = loadCheckboxState;

checkboxBG.addEventListener("change", function () {
  if (this.checked) {
    console.log("Checkbox is checked..");
    body.style.background =
      "url('/static/css/pixel_camp.jpg') no-repeat center";
    body.style.objectFit = "cover";
    body.style.backgroundSize = "cover";
  } else {
    console.log("Checkbox is not checked..");
    body.style.background = "url('/static/css/plain.png') no-repeat center";
    body.style.objectFit = "cover";
    body.style.backgroundSize = "cover";
  }
});

// volbar

let volume = document.querySelector("#volbar");

volume.addEventListener("change", function (e) {
  bgm.volume = e.currentTarget.value / 100;
});
<<<<<<< HEAD
=======

// // Event listener for character selection
// document.getElementById("bg-choices").addEventListener("change", function () {
//   const selectedBackground = this.value;

//   // Update image and store the selected character in localStorage
//   localStorage.setItem("SelectedBackground", selectedBackground);
// });

// // loads the selected character's appearance
// window.onload = function () {
//   const selectedBackground = localStorage.getItem("selectedBackground");

//   // Sets the correct running  character based on the selected character in game
//   switch (selectedBackground) {
//     case "bg1":
//       body.style.background = "url('/static/campside.jpg')";
//       break;
//     case "bg2":
//       body.style.backgroun = "url('/static/pixel_camp.jpg')";
//       break;
//     case "bg3":
//       body.style.background = "url('/static/purplespace.png')";
//       break;
//     case "bg4":
//       body.style.background = "url('/static/css/mountainside.jpg')";
//       break;
//     default:
//       body.style.background = "url('/static/css/pixel_camp.jpg')";
//   }
// };

// // On page load, retrieve saved character from localStorage and update image
// window.onload = function () {
//   const savedBackground = localStorage.getItem("SelectedBackgruond");
// };
>>>>>>> 10627897780d1b12ca0f8161d291c336d1c05d22
