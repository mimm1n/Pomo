// Function to update character image preview based on selection
function updateCharacter(selectedCharacter) {
    const characterSelect = document.getElementById('characterSelect');
    const characterPreview = document.getElementById('characterPreview');
  
    // Update the image preview to the selected character's image
    characterPreview.src = characterSelect.querySelector(`option[value="${selectedCharacter}"]`).getAttribute('data-img');
  }
  
  // Event listener for character selection
  document.getElementById('characterSelect').addEventListener('change', function() {
    const selectedCharacter = this.value;
  
    // Update image and store the selected character in localStorage
    updateCharacter(selectedCharacter);
    localStorage.setItem('SelectedCharacter', selectedCharacter);
  });
  

  // loads the selected character's appearance
window.onload = function() {
    const selectedCharacter = localStorage.getItem('SelectedCharacter') || 'astro';
    const characterElement = document.getElementById('char');
  
    // Sets the correct running  character based on the selected character in game
    switch (selectedCharacter) {
      case 'astro':
        characterElement.style.backgroundImage = "url('/static/css/astro_run.png')";
        break;
      case 'girl':
        characterElement.style.backgroundImage = "url('/static/css/girl_run.png')";
        break;
      case 'guy':
        characterElement.style.backgroundImage = "url('/static/css/guy_run.png')";
        break;
      default:
        characterElement.style.backgroundImage = "url('/static/css/astro_run.png')";
    }
  };
  
  // On page load, retrieve saved character from localStorage and update image
  window.onload = function() {
    const savedCharacter = localStorage.getItem('SelectedCharacter') || 'astro';
    updateCharacter(savedCharacter); // Set image preview
  };
  

  
  
  