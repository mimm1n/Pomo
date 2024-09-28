//testing//

window.addEventListener("load", () => {
  const bgm = document.getElementById("bgm"); //background music
  const checkboxSound = document.querySelector("input[name=togg-s]");

  // Function to update the background across all pages
  function updateSound(selectedSound) {
    const SoundSelect = document.getElementById("SoundSelect");

    // Find the image to the option picked
    const selectedOptionSound = SoundSelect.querySelector(
      `option[value="${selectedSound}"]`
    );
    const bgmSound = selectedOptionSound
      ? selectedOptionSound.getAttribute("sound")
      : null;

    applySound(bgmSound);
  }

  // apply the background to the body
  function applySound(bgmSound) {
    document.getElementById("bgm").src = `url('${bgmSound}')`;
    // bgm.src = `url('${bgmSound}')`;
    // bgm.load();
  }

  // Loads the saved background from localStorage on the page
  window.onload = function () {
    const savedSound =
      localStorage.getItem("selectedSound") || "A Lonely Cherry Tree";
    const savedSoundBGM =
      localStorage.getItem("bgmSound") ||
      '{{url_for("static", filename="A Lonely Cherry Tree.mp3")}}';

    if (savedSoundBGM) {
      applyBackground(savedSoundBGM);
    }

    // Sync the dropdown with the saved background
    const SoundSelect = document.getElementById("SoundSelect");
    if (SoundSelect) {
      SoundSelect.value = savedSound; // Set the dropdown to the saved selection
      updateSound(savedSound);
      SoundSelect.addEventListener("change", function () {
        const selectedSound = this.value;
        updateSound(selectedSound);

        // Save the new selection to localStorage
        const selectedOptionSound = this.querySelector(
          `option[value="${selectedSound}"]`
        );
        const bgmSound = selectedOption.getAttribute("sound");
        localStorage.setItem("selectedSound", selectedSound);
        localStorage.setItem("bgmSound", bgmSound);
      });
    }
  };

  // loads the saved sound state from localStorage
  function loadSoundState() {
    const soundState = localStorage.getItem("soundEnabled");
    if (soundState === "false") {
      bgm.pause();
      if (checkboxSound) {
        checkboxSound.checked = false;
      }
    } else {
      bgm.play();
      if (checkboxSound) {
        checkboxSound.checked = true;
      }
    }
  }

  // Event listener for toggling sound using the checkbox
  if (checkboxSound) {
    checkboxSound.addEventListener("change", function () {
      if (this.checked) {
        bgm.play();
        localStorage.setItem("soundEnabled", "true");
      } else {
        bgm.pause();
        localStorage.setItem("soundEnabled", "false");
      }
    });
  }

  // Load the sound state when the page loads
  loadSoundState();
});

// volbar

let volume = document.querySelector("#volbar");

volume.addEventListener("change", function (e) {
  bgm.volume = e.currentTarget.value / 100;
});

//

// // Function to update the background across all pages
// function updateSound(selectedSound) {
//   const SoundSelect = document.getElementById("SoundSelect");

//   // Find the image to the option picked
//   const selectedOptionSound = SoundSelect.querySelector(
//     `option[value="${selectedSound}"]`
//   );
//   const bgmSound = selectedOptionSound
//     ? selectedOptionSound.getAttribute("sound")
//     : null;

//   applySound(bgmSound);
// }

// // apply the background to the body
// function applySound(bgmSound) {
//   document.getElementById("bgm").src = `url('${bgmSound}')`;
//   // bgm.src = `url('${bgmSound}')`;
//   // bgm.load();
// }

// // Loads the saved background from localStorage on the page
// window.onload = function () {
//   const savedSound =
//     localStorage.getItem("selectedSound") || "A Lonely Cherry Tree";
//   const savedSoundBGM =
//     localStorage.getItem("bgmSound") ||
//     '{{url_for("static", filename="A Lonely Cherry Tree.mp3")}}';

//   if (savedSoundBGM) {
//     applyBackground(savedSoundBGM);
//   }

//   // Sync the dropdown with the saved background
//   const SoundSelect = document.getElementById("SoundSelect");
//   if (SoundSelect) {
//     SoundSelect.value = savedSound; // Set the dropdown to the saved selection
//     updateSound(savedSound);
//     SoundSelect.addEventListener("change", function () {
//       const selectedSound = this.value;
//       updateSound(selectedSound);

//       // Save the new selection to localStorage
//       const selectedOptionSound = this.querySelector(
//         `option[value="${selectedSound}"]`
//       );
//       const bgmSound = selectedOption.getAttribute("sound");
//       localStorage.setItem("selectedSound", selectedSound);
//       localStorage.setItem("bgmSound", bgmSound);
//     });
//   }
// };
