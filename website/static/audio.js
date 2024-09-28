//testing//

// window.addEventListener("load", () => {
//   const bgm = document.getElementById("bgm"); //background music
//   const checkboxSound = document.querySelector("input[name=togg-s]");

//   localStorage.setItem("bgm", bgm);

//   // loads the saved sound state from localStorage
//   function loadSoundState() {
//     const soundState = localStorage.getItem("soundEnabled");
//     if (soundState === "false") {
//       bgm.pause();
//       if (checkboxSound) {
//         checkboxSound.checked = false;
//       }
//     } else {
//       bgm.play();
//       if (checkboxSound) {
//         checkboxSound.checked = true;
//       }
//     }
//   }

//   // Event listener for toggling sound using the checkbox
//   if (checkboxSound) {
//     checkboxSound.addEventListener("change", function () {
//       if (this.checked) {
//         bgm.play();
//         localStorage.setItem("soundEnabled", "true");
//       } else {
//         bgm.pause();
//         localStorage.setItem("soundEnabled", "false");
//       }
//     });
//   }

//   if (soundState) {
//     function updateSound(selectedSound) {
//       const SoundSelect = document.getElementById("SoundSelect");

//       // Find the image to the option picked
//       const selectedSoundOption = BackgroundSelect.querySelector(
//         `option[value="${selectedSound}"]`
//       );
//       const SoundBgm = SoundBgm ? SoundBgm.getAttribute("sound-data") : null;

//       applySound(SoundBgm);
//     }

//     // apply the background to the body
//     function applySound(SoundBgm) {
//       audio.load(); //call just preload the audio without playing
//       audio.play(); //call this to play the song right away
//     }

//     // Loads the saved background from localStorage on the page
//     window.onload = function () {
//       const savedSound = localStorage.getItem("selectedSound") || "Sound1";
//       const savedSoundSource =
//         localStorage.getItem("SoundBgm") ||
//         '{{ url_for("static", filename="Sound1.mp3") }}';

//       if (savedSoundSource) {
//         applyBackground(savedSoundSource);
//       }

//       // Sync the dropdown with the saved background
//       const SoundSelect = document.getElementById("SoundSelect");
//       if (SoundSelect) {
//         SoundSelect.value = savedSound; // Set the dropdown to the saved selection
//         updateSound(savedSound);
//         SoundSelect.addEventListener("change", function () {
//           const selectedSound = this.value;
//           updateBackground(selectedSound);

//           // Save the new selection to localStorage
//           const selectedSoundOption = this.querySelector(
//             `option[value="${selectedSound}"]`
//           );
//           const SoundBgm = selectedOption.getAttribute("sound-data");
//           localStorage.setItem("selectedSound", selectedSound);
//           localStorage.setItem("SoundBgm", SoundBgm);
//         });
//       }
//     };

//     // volbar

//     let volume = document.querySelector("#volbar");

//     volume.addEventListener("change", function (e) {
//       bgm.volume = e.currentTarget.value / 100;
//     });
//   }

//   // Load the sound state when the page loads
//   loadSoundState();
// });

window.addEventListener("load", () => {
  const bgm = document.getElementById("bgm"); // background music
  const checkboxSound = document.querySelector("input[name=togg-s]");

  // Load the saved sound state from localStorage
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

  // Function to update the sound based on the selected option
  function updateSound(selectedSound) {
    const SoundSelect = document.getElementById("SoundSelect");

    // Ensure we are referencing the correct dropdown
    const selectedSoundOption = SoundSelect.querySelector(
      `option[value="${selectedSound}"]`
    );

    const soundBgm = selectedSoundOption
      ? selectedSoundOption.getAttribute("sound-data")
      : null;

    if (soundBgm) {
      applySound(soundBgm);
    }
  }

  // Apply the sound
  function applySound(soundBgm) {
    bgm.src = soundBgm; // Set the source of the audio
    bgm.load(); // Preload the audio
    bgm.play(); // Play the audio
  }

  // Load the saved background from localStorage on the page
  const savedSound = localStorage.getItem("selectedSound") || "Sound1";
  const savedSoundSource =
    localStorage.getItem("SoundBgm") ||
    '{{ url_for("static", filename="Sound1.mp3") }}';

  if (savedSoundSource) {
    applySound(savedSoundSource); // Apply the saved sound
  }

  // Sync the dropdown with the saved background
  const SoundSelect = document.getElementById("SoundSelect");
  if (SoundSelect) {
    SoundSelect.value = savedSound; // Set the dropdown to the saved selection
    updateSound(savedSound); // Update the sound based on the saved selection
    SoundSelect.addEventListener("change", function () {
      const selectedSound = this.value;
      updateSound(selectedSound); // Update sound when selection changes

      // Save the new selection to localStorage
      const selectedSoundOption = this.querySelector(
        `option[value="${selectedSound}"]`
      );
      const soundBgm = selectedSoundOption.getAttribute("sound-data");
      localStorage.setItem("selectedSound", selectedSound);
      localStorage.setItem("SoundBgm", soundBgm);
    });
  }

  // Volume control
  let volume = document.querySelector("#volbar");
  volume.addEventListener("change", function (e) {
    bgm.volume = e.currentTarget.value / 100; // Adjust volume based on the slider value
  });

  // Load the sound state when the page loads
  loadSoundState();
});

// // Event listener for character selection
// document
//   .getElementById("sound-options")
//   .addEventListener("change", function () {
//     const selectedBGM = this.value;
//     const selectedBGMOption = this.querySelector(
//       `option[value="${selectedBGM}"]`
//     );
//     const bgmSrc = document.getElementById("bgmSRC");
//     const bgmChoice = selectedBGMOption.getAttribute("src");

//     localStorage.setItem("selectedBGM", selectedBGM); // Save the selection to localStorage
//     localStorage.setItem("bgmChoice", bgmChoice);
//     localStorage.setItem("bgmSRC", bgmSrc); // Save the image to localStorage
//   });

// window.onload = function () {
//   const SoundChoice = localStorage.getItem("selectedBGM");
//   const storedBGM = localStorage.getItem("bgmSRC");
//   const SoundSelect = document.getElementById("sound-options");

//   // Choose the correct character animation for the game
//   if (SoundChoice == "1") {
//     storedBGM.src = "url('/static/Sound1.mp3')";
//   } else if (SoundChoice == "2") {
//     storedBGM.src = "url('/static/Sound2.mp3')";
//   } else if (SoundChoice == "3") {
//     storedBGM.src = "url('/static/Sound3.mp3')";
//   } else if (SoundChoice == "4") {
//     storedBGM.src = "url('/static/Sound4.mp3')";
//   } else {
//     storedBGM.src = "url('/static/Sound1.mp3')";
//   }

//   // Set the dropdown to the saved character
//   SoundChoice.value = SoundSelect;
// };

// Function to update the background across all pages

// if (soundState) {
//   function updateSound(selectedSound) {
//     const SoundSelect = document.getElementById("SoundSelect");

//     // Find the image to the option picked
//     const selectedSoundOption = BackgroundSelect.querySelector(
//       `option[value="${selectedSound}"]`
//     );
//     const SoundBgm = SoundBgm ? SoundBgm.getAttribute("sound-data") : null;

//     applySound(SoundBgm);
//   }

//   // apply the background to the body
//   function applySound(SoundBgm) {
//     const audioSource = document.getElementById("track");
//     var test = SoundBgm.target;
//     var audio = document.getElementById("bgm");

//     source.src = test.getAttribute("sound-data");

//     audio.load(); //call this to just preload the audio without playing
//     audio.play(); //call this to play the song right away
//   }

//   // Loads the saved background from localStorage on the page
//   window.onload = function () {
//     const savedSound = localStorage.getItem("selectedSound") || "Sound1";
//     const savedSoundSource =
//       localStorage.getItem("SoundBgm") ||
//       '{{ url_for("static", filename="Sound1.mp3") }}';

//     if (savedSoundSource) {
//       applyBackground(savedSoundSource);
//     }

//     // Sync the dropdown with the saved background
//     const SoundSelect = document.getElementById("SoundSelect");
//     if (SoundSelect) {
//       SoundSelect.value = savedSound; // Set the dropdown to the saved selection
//       updateSound(savedSound);
//       SoundSelect.addEventListener("change", function () {
//         const selectedSound = this.value;
//         updateBackground(selectedSound);

//         // Save the new selection to localStorage
//         const selectedSoundOption = this.querySelector(
//           `option[value="${selectedSound}"]`
//         );
//         const SoundBgm = selectedOption.getAttribute("sound-data");
//         localStorage.setItem("selectedSound", selectedSound);
//         localStorage.setItem("SoundBgm", SoundBgm);
//       });
//     }
//   };

//   // volbar

//   let volume = document.querySelector("#volbar");

//   volume.addEventListener("change", function (e) {
//     bgm.volume = e.currentTarget.value / 100;
//   });
// }

// document
// .getElementById("SoundSelect")
// .addEventListener("change", function () {
//   const selectedSound = this.value;
//   const selectedSoundOption = this.querySelector(
//     `option[value="${selectedSound}"]`
//   );
//   const SoundData = selectedOption.getAttribute("sound-data");

//   updateSound(selectedSound);
//   localStorage.setItem("SelectedSound", selectedSound); // Save the selection to localStorage
//   localStorage.setItem("SoundData", SoundData); // Save the image to localStorage
//   localStorage.setItem("SelectedSoundOption", selectedSoundOption);
// });

// // loads the selected character
// window.onload = function () {
// const savedSound = localStorage.getItem("SelectedSound") || "Sound1";
// const SoundSelect = document.getElementById("SoundSelect");
// const savedSrc =
//   localStorage.getItem("SoundData") ||
//   "{{url_for('static', filename='Sound1.mp3')}}";
// const savedSoundOption = localStorage.getItem("SelectedSoundOption");

// const audioSource = document.getElementById("track");
// var audio = document.getElementById("bgm");

// if (savedSound == "Sound1") {
//   audioSource.src = "{{url_for('static', filename='Sound1.mp3')}}";
//   audio.play();
// } else if (savedSound == "Sound2") {
//   audioSource.src = "{{url_for('static', filename='Sound2.mp3')}}";
//   audio.play();
// } else if (savedSound == "Sound3") {
//   audioSource.src = "{{url_for('static', filename='Sound3.mp3')}}";
//   audio.play();
// } else if (savedSound == "Sound4") {
//   audioSource.src = "{{url_for('static', filename='Sound4.mp3')}}";
//   audio.play();
// }
