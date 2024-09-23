window.addEventListener("load", () => {
  let bgm = document.getElementById("bgm");

  if (bgm.paused) {
    let play = document.getElementById("play");

    play.onclick();
    {
      bgm.play();
    }
  }
});

// sound toggle button

var checkbox = document.querySelector("input[name=togg-s]");

checkbox.addEventListener("change", function () {
  if (this.checked) {
    console.log("Checkbox is checked..");
    bgm.play();
  } else {
    console.log("Checkbox is not checked..");
    bgm.pause();
  }
});
