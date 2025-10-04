
console.log("🎭 Mad Libs Game - JavaScript Loaded!");

const madLibsGame = {
    // Array of different story templates
    stories: [
        // Story 1: Funny adventure
        (noun, adjective, person, verb, place) => 
            `One day, a ${adjective} ${noun} decided to ${verb} with ${person} in the ${place}. ` +
            `It was the most hilarious thing anyone had ever seen! ` +
            `People couldn't believe their eyes when ${person} started ${verb}ing too. ` +
            `The ${place} will never be the same again!`,

        // Story 2: Mystery story
        (noun, adjective, person, verb, place) => 
            `In the dark of night, ${person} discovered a ${adjective} ${noun} that could ${verb}. ` +
            `They took it to the ${place} where strange things began to happen. ` +
            `Suddenly, the ${noun} started ${verb}ing uncontrollably! ` +
            `What secrets does the ${place} hold? Only ${person} knows...`,

        // Story 3: Superhero tale
        (noun, adjective, person, verb, place) => 
            `Meet ${person}, the superhero with the power of a ${adjective} ${noun}! ` +
            `When danger appears, they ${verb} to save the day at the ${place}. ` +
            `With their incredible ability to ${verb}, no villain stands a chance. ` +
            `The ${place} is safe thanks to ${person} and their ${adjective} ${noun}!`,

        // Story 4: Cooking disaster
        (noun, adjective, person, verb, place) => 
            `${person} tried to cook a ${adjective} ${noun} in the ${place}. ` +
            `But when they started to ${verb}, everything went wrong! ` +
            `The ${noun} began to ${verb} all over the ${place}. ` +
            `Now ${person} is known as the chef who made a ${adjective} mess!`,

        // Story 5: Space adventure
        (noun, adjective, person, verb, place) => 
            `Captain ${person} boarded the ${adjective} ${noun} and prepared to ${verb} through space. ` +
            `Their destination: the mysterious ${place} at the edge of the galaxy. ` +
            `As they began to ${verb}, strange alien ${noun}s appeared! ` +
            `The fate of the ${place} rests in ${person}'s hands!`,

        // Story 6: Fairy tale
        (noun, adjective, person, verb, place) => 
            `Once upon a time, in a ${adjective} ${place}, lived ${person} and their magical ${noun}. ` +
            `Every day, they would ${verb} together under the moonlight. ` +
            `One day, the ${noun} learned to ${verb} on its own! ` +
            `And they all lived ${adjective}ly ever after in the ${place}.`,

        // Story 7: Sports story
        (noun, adjective, person, verb, place) => 
            `In the championship game at the ${place}, ${person} brought their lucky ${adjective} ${noun}. ` +
            `When it was time to ${verb}, everyone held their breath. ` +
            `With an incredible ${verb}, ${person} scored the winning point! ` +
            `The ${place} erupted in cheers for ${person} and their ${adjective} ${noun}!`
    ],

    // Current story index
    currentStoryIndex: 0,

    // Initialize the game
    init: function() {
        console.log("🚀 Initializing Mad Libs Game...");
        
        // Add event listener to the form
        const libForm = document.getElementById('libform');
        libForm.addEventListener('submit', this.handleFormSubmit.bind(this));
        
        // Add event listener to shuffle button
        const shuffleButton = document.getElementById('shuffle-button');
        shuffleButton.addEventListener('click', this.shuffleStory.bind(this));
        
        // Add input listeners for word counting
        this.setupInputListeners();
        
        console.log("✅ Mad Libs Game initialized successfully!");
        console.log(`📚 Loaded ${this.stories.length} story templates`);
    },

    // Handle form submission
    handleFormSubmit: function(event) {
        event.preventDefault();
        console.log("📝 Form submitted!");
        
        // Get all input values
        const words = this.getInputValues();
        
        // Validate inputs
        if (!this.validateInputs(words)) {
            this.showMessage("❌ Please fill in all the words!", "error");
            return;
        }
        
        // Generate and display story
        this.generateStory(words);
        this.showMessage("✅ Story generated successfully! Click 'Shuffle Story' for more!", "success");
    },

    // Get values from all inputs
    getInputValues: function() {
        const words = {
            noun: document.getElementById('noun').value.trim(),
            adjective: document.getElementById('adjective').value.trim(),
            person: document.getElementById('person').value.trim(),
            verb: document.getElementById('verb').value.trim(),
            place: document.getElementById('place').value.trim()
        };
        
        console.log("📖 Words collected:", words);
        return words;
    },

    // Validate that all inputs have values
    validateInputs: function(words) {
        for (let key in words) {
            if (words[key] === '') {
                console.log(`❌ Missing word: ${key}`);
                return false;
            }
        }
        return true;
    },

    // Generate and display a story
    generateStory: function(words) {
        // Use the current story template
        const storyTemplate = this.stories[this.currentStoryIndex];
        const storyText = storyTemplate(
            words.noun, 
            words.adjective, 
            words.person, 
            words.verb, 
            words.place
        );
        
        // Display the story with highlighted words
        this.displayStory(storyText, words);
        
        console.log(`📖 Story ${this.currentStoryIndex + 1} generated`);
    },

    // Display the story with highlighted words
    displayStory: function(storyText, words) {
        const storyElement = document.getElementById('story');
        
        // Highlight the user's words in the story
        let highlightedStory = storyText;
        for (let key in words) {
            const regex = new RegExp(words[key], 'gi');
            highlightedStory = highlightedStory.replace(
                regex, 
                `<span class="story-highlight">${words[key]}</span>`
            );
        }
        
        storyElement.innerHTML = highlightedStory;
        storyElement.style.animation = 'fadeIn 0.5s ease';
    },

    // Shuffle to a different story
    shuffleStory: function() {
        console.log("🔀 Shuffling story...");
        
        // Get current words
        const words = this.getInputValues();
        
        // Check if we have words to work with
        if (!this.validateInputs(words)) {
            this.showMessage("❌ Please fill in all words first!", "error");
            return;
        }
        
        // Get a random story index (different from current)
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.stories.length);
        } while (newIndex === this.currentStoryIndex && this.stories.length > 1);
        
        this.currentStoryIndex = newIndex;
        
        // Generate new story
        this.generateStory(words);
        this.showMessage(`🔄 Story shuffled! (Story ${this.currentStoryIndex + 1}/${this.stories.length})`, "success");
        
        console.log(`🔀 Shuffled to story ${this.currentStoryIndex + 1}`);
    },

    // Setup input listeners for word counting
    setupInputListeners: function() {
        const inputs = ['noun', 'adjective', 'person', 'verb', 'place'];
        
        inputs.forEach(inputId => {
            const input = document.getElementById(inputId);
            input.addEventListener('input', this.updateWordCount.bind(this));
        });
    },

    // Update the word counter
    updateWordCount: function() {
        const words = this.getInputValues();
        let filledCount = 0;
        
        for (let key in words) {
            if (words[key] !== '') {
                filledCount++;
            }
        }
        
        document.getElementById('wordCount').textContent = filledCount;
        
        // Change color based on completion
        const wordCountElement = document.getElementById('wordCount');
        if (filledCount === 5) {
            wordCountElement.style.color = '#27ae60';
            wordCountElement.style.fontWeight = 'bold';
        } else {
            wordCountElement.style.color = '#666';
            wordCountElement.style.fontWeight = 'normal';
        }
    },

    // Show message to user
    showMessage: function(message, type) {
        const messageElement = document.getElementById('message');
        messageElement.textContent = message;
        messageElement.className = type;
        
        // Auto-hide success messages after 3 seconds
        if (type === 'success') {
            setTimeout(() => {
                messageElement.textContent = '';
                messageElement.className = '';
            }, 3000);
        }
    }
};

// =============================================
// INITIALIZATION
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    madLibsGame.init();
    
    console.log("\n🎯 Game Features:");
    console.log("   • 7 different story templates");
    console.log("   • Input validation");
    console.log("   • Word highlighting in stories");
    console.log("   • Shuffle functionality");
    console.log("   • Real-time word counting");
    console.log("   • Beautiful animations and UI");
});

// Make the game globally available
window.madLibsGame = madLibsGame;