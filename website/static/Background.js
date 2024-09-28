function updateBackground(selectedBackground) {
  const BackgroundSelect = document.getElementById("BackgroundSelect");

  // Get the selected option and its background image
  const selectedOption = BackgroundSelect.querySelector(`option[value="${selectedBackground}"]`);
  const backgroundImage = selectedOption ? selectedOption.getAttribute('background-img') : null;

  // Check if the background image is valid
  if (backgroundImage) {
    const body = document.getElementsByTagName("body")[0];
    body.style.backgroundImage = `url('${backgroundImage}')`;
    body.style.backgroundSize = 'cover'; // Ensure it covers the entire page
    body.style.backgroundPosition = 'center';
    body.style.backgroundRepeat = 'no-repeat';

    // Save to localStorage
    localStorage.setItem('selectedBackground', selectedBackground);
    localStorage.setItem('backgroundImage', backgroundImage);
  } else {
    console.error("Background image not found!");
  }
}

// Load saved background from localStorage on page load
window.onload = function () {
  const savedBackground = localStorage.getItem('selectedBackground') || 'pixel_camp';
  const savedImageBg = localStorage.getItem('backgroundImage') || '{{ url_for("static", filename="pixel_camp.jpg") }}';

  // Apply the saved background
  updateBackground(savedBackground); // Call to update background immediately

  // Update dropdown to reflect saved selection
  const BackgroundSelect = document.getElementById("BackgroundSelect");
  if (BackgroundSelect) {
    BackgroundSelect.value = savedBackground;
    // Add event listener for dropdown change
    BackgroundSelect.addEventListener('change', function () {
      updateBackground(this.value);
    });
  }
};

