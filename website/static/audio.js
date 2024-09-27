window.addEventListener("load", () => {
  var bgm = document.getElementById("bgm");
  console.log("WORKS");

  if (bgm.paused) {
    let play = document.getElementById("play");

    play.onclick();
    {
      bgm.play();
    }
  }
});

// sound toggle button

var checkboxSound = document.querySelector("input[name=togg-s]");
var checkboxBG = document.querySelector("input[name=togg-bg]");
var background = document.getElementsByTagName("body")[0];

checkboxSound.addEventListener("change", function () {
  if (this.checked) {
    console.log("Checkbox is checked..");
    bgm.play();
    localStorage.setItem("togg-s", "true");
  } else {
    console.log("Checkbox is not checked..");
    bgm.pause();
    localStorage.setItem("togg-s", "false");
  }
});

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
