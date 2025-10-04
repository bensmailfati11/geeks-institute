// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get all drum pads
    const drumPads = document.querySelectorAll('.drum-pad');
    
    // Add click event listeners to each drum pad
    drumPads.forEach(pad => {
        pad.addEventListener('click', function() {
            const key = this.getAttribute('data-key');
            playSound(key);
        });
    });
    
    // Add keyboard event listener
    document.addEventListener('keydown', function(event) {
        const key = event.key.toUpperCase();
        playSound(key);
    });
    
    // Function to play sound
    function playSound(key) {
        // Check if key is valid
        const validKeys = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
        if (!validKeys.includes(key)) return;
        
        // Get the audio element
        const audio = document.getElementById(key);
        if (!audio) return;
        
        // Get the drum pad element
        const drumPad = document.querySelector(`.drum-pad[data-key="${key}"]`);
        
        // Reset audio and play
        audio.currentTime = 0;
        audio.play().catch(error => {
            console.log('Error playing audio:', error);
        });
        
        // Add visual feedback
        if (drumPad) {
            drumPad.classList.add('playing');
            
            // Remove playing class after animation
            setTimeout(() => {
                drumPad.classList.remove('playing');
            }, 100);
        }
    }
    
    // Preload audio files
    function preloadAudio() {
        const audioElements = document.querySelectorAll('audio');
        audioElements.forEach(audio => {
            audio.preload = 'auto';
        });
    }
    
    // Initialize audio preloading
    preloadAudio();
});