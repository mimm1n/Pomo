window.addEventListener("load", () => {
  const bgm = document.getElementById("bgm"); // Background music
  const checkboxSound = document.querySelector("input[name=togg-s]");
  const SoundSelect = document.getElementById("SoundSelect");
  const volume = document.querySelector("#volbar");

  // Function to load the saved sound state from localStorage
  function loadSoundState() {
    const soundState = localStorage.getItem("soundEnabled");
    if (soundState === "false") {
      bgm.pause();
      if (checkboxSound) {
        checkboxSound.checked = false;
      }
    } else {
      if (checkboxSound) {
        checkboxSound.checked = true;
      }
      bgm.play().catch(error => {
        console.error("Error playing audio:", error);
      });
    }
  }

  // Load saved volume from localStorage and apply it
  function loadVolume() {
    const savedVolume = localStorage.getItem("bgmVolume");
    if (savedVolume) {
      bgm.volume = savedVolume; // Set volume from saved value
      volume.value = savedVolume * 100; // Update volume slider
    } else {
      bgm.volume = 1; // Default volume (100%)
      volume.value = 100; 
    }
  }

  // Event listener for toggling sound using the checkbox
  if (checkboxSound) {
    checkboxSound.addEventListener("change", function () {
      if (this.checked) {
        localStorage.setItem("soundEnabled", "true");
        bgm.play().catch(error => {
          console.error("Error playing audio:", error);
        });
      } else {
        localStorage.setItem("soundEnabled", "false");
        bgm.pause();
      }
    });
  }

  // Function to update the sound based on the selected option
  function updateSound(selectedSound) {
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

  function applySound(soundBgm) {
    bgm.src = soundBgm; // Set the source of the audio
    bgm.load(); 
    if (localStorage.getItem("soundEnabled") === "true") {
      bgm.play().catch(error => {
        console.error("Error playing audio:", error);
      }); // Play the audio if enabled
    }
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
  if (SoundSelect) {
    SoundSelect.value = savedSound; // Set the dropdown to the saved selection
    updateSound(savedSound); 
    SoundSelect.addEventListener("change", function () {
      const selectedSound = this.value;
      updateSound(selectedSound); 

      // Save the new selection to localStorage
      const selectedSoundOption = this.querySelector(
        `option[value="${selectedSound}"]`
      );
      const soundBgm = selectedSoundOption.getAttribute("sound-data");
      localStorage.setItem("selectedSound", selectedSound);
      localStorage.setItem("SoundBgm", soundBgm);
    });
  }

//VOLBAR

  if (volume) {
    volume.addEventListener("change", function (e) {
      bgm.volume = e.currentTarget.value / 100; 
      localStorage.setItem("bgmVolume", bgm.volume);
    });
  }

  // Load the sound state and volume when the page loads
  loadSoundState();
  loadVolume();
});
