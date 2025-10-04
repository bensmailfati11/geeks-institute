
// EXERCISES XP: ANIMATIONS

console.log("🌟 Exercises XP: Animations - JavaScript Loaded!");

// =============================================
// EXERCISE 1: TIMER FUNCTIONS
// =============================================

const timerExercises = {
    // Variables
    intervalId: null,
    paragraphCounter: 0,
    maxParagraphs: 5,

    // Part I: Alert after 2 seconds
    startPart1: function() {
        console.log("⏰ Part I: Alert scheduled for 2 seconds");
        this.updateTimerStatus("Alert scheduled for 2s", "waiting");
        
        setTimeout(() => {
            alert("Hello World");
            this.updateTimerStatus("Alert completed!", "completed");
            console.log("✅ Part I: Alert displayed");
        }, 2000);
    },

    // Part II: Add paragraph after 2 seconds
    startPart2: function() {
        console.log("⏰ Part II: Paragraph scheduled for 2 seconds");
        this.updateTimerStatus("Paragraph scheduled for 2s", "waiting");
        
        setTimeout(() => {
            this.addParagraph();
            this.updateTimerStatus("Paragraph added!", "completed");
            console.log("✅ Part II: Paragraph added");
        }, 2000);
    },

    // Part III: Add paragraph every 2 seconds
    startPart3: function() {
        console.log("⏰ Part III: Starting interval (paragraph every 2s)");
        this.updateTimerStatus("Interval started - adding paragraphs every 2s", "running");
        
        // Clear any existing interval
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
        
        this.intervalId = setInterval(() => {
            this.addParagraph();
            
            // Stop when we reach maximum paragraphs
            if (this.paragraphCounter >= this.maxParagraphs) {
                this.clearInterval();
                this.updateTimerStatus(`Stopped - reached ${this.maxParagraphs} paragraphs`, "completed");
                console.log(`✅ Part III: Stopped at ${this.maxParagraphs} paragraphs`);
            }
        }, 2000);
    },

    // Add a paragraph to the container
    addParagraph: function() {
        const container = document.getElementById('container1');
        const paragraph = document.createElement('p');
        paragraph.textContent = `Hello World (${this.paragraphCounter + 1})`;
        container.appendChild(paragraph);
        
        this.paragraphCounter++;
        this.updateParagraphCount();
        
        console.log(`📝 Paragraph ${this.paragraphCounter} added`);
    },

    // Clear interval manually
    clearInterval: function() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
            this.updateTimerStatus("Interval cleared", "stopped");
            console.log("🛑 Interval cleared");
        }
    },

    // Update paragraph counter display
    updateParagraphCount: function() {
        document.getElementById('paragraphCount').textContent = this.paragraphCounter;
    },

    // Update timer status display
    updateTimerStatus: function(message, type) {
        const statusElement = document.getElementById('timerStatus');
        statusElement.textContent = message;
        statusElement.className = 'status';
        
        // Set color based on status type
        switch(type) {
            case 'running':
                statusElement.style.background = '#fbbc05'; // Yellow
                break;
            case 'completed':
                statusElement.style.background = '#34a853'; // Green
                break;
            case 'stopped':
                statusElement.style.background = '#ea4335'; // Red
                break;
            default:
                statusElement.style.background = '#4285f4'; // Blue
        }
    },

    // Reset Exercise 1
    reset: function() {
        this.clearInterval();
        
        const container = document.getElementById('container1');
        container.innerHTML = '';
        this.paragraphCounter = 0;
        this.updateParagraphCount();
        this.updateTimerStatus("Reset - Ready", "waiting");
        
        console.log("🔄 Exercise 1 reset");
    }
};

// =============================================
// EXERCISE 2: BOX ANIMATION
// =============================================

const boxAnimation = {
    // Variables
    intervalId: null,
    boxPosition: 0,
    containerWidth: 400,
    boxWidth: 50,
    maxPosition: 0,
    isMoving: false,

    // Initialize the box animation
    init: function() {
        this.maxPosition = this.containerWidth - this.boxWidth;
        this.updateBoxPosition();
        console.log("📦 Box animation initialized");
    },

    // Start box movement
    startMovement: function() {
        if (this.isMoving) {
            console.log("⚠️ Box is already moving");
            return;
        }

        console.log("🚀 Starting box movement");
        this.updateBoxStatus("Moving...", "running");
        this.isMoving = true;
        
        // Reset position if at the end
        if (this.boxPosition >= this.maxPosition) {
            this.boxPosition = 0;
            this.updateBoxPosition();
        }
        
        // Start moving the box
        this.intervalId = setInterval(() => {
            this.boxPosition += 2; // Move 2px for smoother animation
            
            if (this.boxPosition >= this.maxPosition) {
                this.boxPosition = this.maxPosition;
                this.stopMovement();
                this.updateBoxStatus("Reached the end!", "completed");
                console.log("🎯 Box reached the end");
            }
            
            this.updateBoxPosition();
        }, 1); // Update every millisecond
    },

    // Stop box movement
    stopMovement: function() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        this.isMoving = false;
    },

    // Update box position and display
    updateBoxPosition: function() {
        const animateElement = document.getElementById('animate');
        animateElement.style.left = this.boxPosition + 'px';
        
        document.getElementById('boxPosition').textContent = this.boxPosition + 'px';
        
        // Change color based on position (gradient effect)
        const progress = this.boxPosition / this.maxPosition;
        const red = Math.floor(234 * progress + 66 * (1 - progress));
        const green = Math.floor(67 * progress + 133 * (1 - progress));
        const blue = Math.floor(53 * progress + 244 * (1 - progress));
        
        animateElement.style.background = `linear-gradient(45deg, rgb(${red}, ${green}, ${blue}), #d23c2e)`;
    },

    // Update box status display
    updateBoxStatus: function(message, type) {
        const statusElement = document.getElementById('boxStatus');
        statusElement.textContent = message;
        statusElement.className = 'status';
        
        // Set color based on status type
        switch(type) {
            case 'running':
                statusElement.style.background = '#fbbc05'; // Yellow
                break;
            case 'completed':
                statusElement.style.background = '#34a853'; // Green
                break;
            default:
                statusElement.style.background = '#ea4335'; // Red
        }
    },

    // Reset box position
    reset: function() {
        this.stopMovement();
        this.boxPosition = 0;
        this.updateBoxPosition();
        this.updateBoxStatus("Reset - Ready", "stopped");
        
        console.log("🔄 Exercise 2 reset");
    }
};

// =============================================
// EVENT LISTENERS SETUP
// =============================================

function setupEventListeners() {
    // Clear interval button for Exercise 1
    document.getElementById('clearIntervalBtn').addEventListener('click', function() {
        timerExercises.clearInterval();
    });

    console.log("🎯 Event listeners setup completed");
}

// =============================================
// INITIALIZATION
// =============================================

function initializeApp() {
    console.log("🚀 Initializing Exercises XP: Animations...");
    
    // Initialize Exercise 2
    boxAnimation.init();
    
    // Setup event listeners
    setupEventListeners();
    
    // Initialize displays
    timerExercises.updateParagraphCount();
    boxAnimation.updateBoxPosition();
    
    console.log("✅ Application initialized successfully!");
    console.log("\n📋 Available Functions:");
    console.log("   Exercise 1 - Timer:");
    console.log("   • timerExercises.startPart1() - Alert after 2s");
    console.log("   • timerExercises.startPart2() - Add paragraph after 2s");
    console.log("   • timerExercises.startPart3() - Add paragraph every 2s");
    console.log("   • timerExercises.clearInterval() - Stop interval");
    console.log("   • timerExercises.reset() - Reset exercise");
    
    console.log("\n   Exercise 2 - Box Animation:");
    console.log("   • boxAnimation.startMovement() - Start box movement");
    console.log("   • boxAnimation.stopMovement() - Stop box movement");
    console.log("   • boxAnimation.reset() - Reset box position");
}

// =============================================
// START APPLICATION
// =============================================

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Make functions globally available for HTML onclick events
window.timerExercises = timerExercises;
window.boxAnimation = boxAnimation;

// Export for module systems (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { timerExercises, boxAnimation };
}