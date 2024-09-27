window.addEventListener("load", () => {
  var bgm = document.getElementById("bgm");

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
  } else {
    console.log("Checkbox is not checked..");
    bgm.pause();
  }
});



// function saveData() {
//   localStorage.setItem("data", listContainer.innerHTML);
// }

// function showTask() {
//   listContainer.innerHTML = localStorage.getItem("data");
// }

// showTask();


// volbar

let volume = document.querySelector("#volbar");

volume.addEventListener("change", function (e) {
  bgm.volume = e.currentTarget.value / 100;
});

// var bgArray = [
//   '//placehold.it/400x300?text=BG1',
//      '//placehold.it/400x300?text=BG2'
//     ]
// $('#dropdown-menu').on('change', function(){
// value = $(this).val() - 1;
// $('#test-bg').css({'background-image':'url(' + bgArray[value] + ')'});
// });
