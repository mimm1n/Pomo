
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
    bgm.volume = e.currentTarget.value / 100; 
  });

  // Load the sound state when the page loads
  loadSoundState();
});

