// Function to update the background across all pages
function updateBackground(selectedBackground) {
  const BackgroundSelect = document.getElementById("BackgroundSelect");

 // Find the image to the option picked
  const selectedOption = BackgroundSelect.querySelector(`option[value="${selectedBackground}"]`);
  const backgroundImage = selectedOption ? selectedOption.getAttribute('background-img') : null;

  
  applyBackground(backgroundImage);
 
}

// apply the background to the body
function applyBackground(backgroundImage) {
  const body = document.getElementsByTagName("body")[0];
  body.style.backgroundImage = `url('${backgroundImage}')`;
  body.style.backgroundSize = 'cover'; // Ensure it covers the entire page
}

// Loads the saved background from localStorage on the page
window.onload = function () {
  const savedBackground = localStorage.getItem('selectedBackground') || 'pixel_camp';
  const savedImageBg = localStorage.getItem('backgroundImage') || '{{ url_for("static", filename="pixel_camp.jpg") }}';

  
  if (savedImageBg) {
    applyBackground(savedImageBg);
  }

    // Sync the dropdown with the saved background
    const BackgroundSelect = document.getElementById("BackgroundSelect");
    if (BackgroundSelect) {
      BackgroundSelect.value = savedBackground; // Set the dropdown to the saved selection
      updateBackground(savedBackground); 
      BackgroundSelect.addEventListener('change', function () {
        const selectedBackground = this.value;
        updateBackground(selectedBackground);
        
        // Save the new selection to localStorage
        const selectedOption = this.querySelector(`option[value="${selectedBackground}"]`);
        const backgroundImage = selectedOption.getAttribute('background-img');
        localStorage.setItem('selectedBackground', selectedBackground);
        localStorage.setItem('backgroundImage', backgroundImage);
      });
  }
};

