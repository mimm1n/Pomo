// Function to update character image preview based on selection
function updateCharacter(selectedCharacter) {
    const characterSelect = document.getElementById('characterSelect');
    const characterPreview = document.getElementById('characterPreview');
  
    // Find the corresponding image for the selected character
    const selectedOption = characterSelect.querySelector(`option[value="${selectedCharacter}"]`);
    const characterImage = selectedOption.getAttribute('data-img');

    // Update the preview image based on the selection
    characterPreview.src = characterImage;
  }
  
// Event listener for character selection
document.getElementById('characterSelect').addEventListener('change', function() {
  const selectedCharacter = this.value;
  const selectedOption = this.querySelector(`option[value="${selectedCharacter}"]`);
  const characterImage = selectedOption.getAttribute('data-img');

  // Update preview image and store the selected character in localStorage
  updateCharacter(selectedCharacter);
  localStorage.setItem('SelectedCharacter', selectedCharacter); // Save the selection to localStorage
  localStorage.setItem('CharacterImage', characterImage);       // Save the image to localStorage
});

  // loads the selected character's appearance
  window.onload = function() {
    const savedCharacter = localStorage.getItem('SelectedCharacter') || 'astro';
    const characterElement = document.getElementById('char');
    const characterSelect = document.getElementById('characterSelect');
    const savedImage = localStorage.getItem('CharacterImage') || '/static/css/astro_run.png';
    

    // Choose the correct character animation for the game
    if (savedCharacter == 'Astro') {
      characterElement.style.backgroundImage = "url('/static/css/astro_run.png')";
    } else if (savedCharacter == 'Girl') {
      characterElement.style.backgroundImage = "url('/static/css/girl_run.png')";
    } else if (savedCharacter == 'Guy') {
      characterElement.style.backgroundImage = "url('/static/css/guy_run.png')";
    } else {
      characterElement.style.backgroundImage = "url('/static/css/astro_run.png')";
    }
    
    // Use the saved image to set the character's animation in the game
    characterElement.style.backgroundImage = `url('${savedImage}')`;

     // Set the dropdown to the saved character
     characterSelect.value = savedCharacter;
     
    // Set image preview for character select page
    updateCharacter(savedCharacter);
  };
  
  

  
  
  