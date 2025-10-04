// =============================================
// DAILY CHALLENGE: LETTERS ONLY


console.log("🔤 Letters Only Challenge - JavaScript Loaded!");

const lettersApp = {
    // App state
    currentEvent: 'input',
    totalCharacters: 0,
    acceptedCharacters: 0,
    rejectedCharacters: 0,

    // Initialize the application
    init: function() {
        console.log("🚀 Initializing Letters Only App...");
        
        const inputElement = document.getElementById('lettersInput');
        
        // Set up the initial event listener
        this.setupEventListeners();
        
        // Initialize displays
        this.updateStats();
        this.updateEventDisplay();
        
        console.log("✅ Letters Only App initialized successfully!");
        console.log("🎯 Available event types: input, keyup, keydown, keypress");
    },

    // Set up event listeners based on current event type
    setupEventListeners: function() {
        const inputElement = document.getElementById('lettersInput');
        
        // Remove all existing event listeners by cloning the element
        const newInput = inputElement.cloneNode(true);
        inputElement.parentNode.replaceChild(newInput, inputElement);
        
        // Add new event listener based on current type
        switch(this.currentEvent) {
            case 'input':
                newInput.addEventListener('input', this.handleInputEvent.bind(this));
                console.log("📝 Input event listener added");
                break;
            case 'keyup':
                newInput.addEventListener('keyup', this.handleKeyUpEvent.bind(this));
                console.log("⌨️ KeyUp event listener added");
                break;
            case 'keydown':
                newInput.addEventListener('keydown', this.handleKeyDownEvent.bind(this));
                console.log("⌨️ KeyDown event listener added");
                break;
            case 'keypress':
                newInput.addEventListener('keypress', this.handleKeyPressEvent.bind(this));
                console.log("⌨️ KeyPress event listener added");
                break;
        }
        
        // Add focus event for better UX
        newInput.addEventListener('focus', this.handleFocus.bind(this));
    },

    // METHOD 1: Input Event (Recommended - Most reliable)
    handleInputEvent: function(event) {
        const input = event.target;
        const originalValue = input.value;
        
        console.log(`📝 Input Event: "${originalValue}"`);
        
        // Remove non-letter characters using regular expression
        const lettersOnly = originalValue.replace(/[^a-zA-Z\s]/g, '');
        
        // Update the input value if it changed
        if (lettersOnly !== originalValue) {
            input.value = lettersOnly;
            this.rejectedCharacters += (originalValue.length - lettersOnly.length);
            this.showMessage(`❌ Removed ${originalValue.length - lettersOnly.length} non-letter characters`, 'error');
        }
        
        this.updateStats();
    },

    // METHOD 2: KeyUp Event
    handleKeyUpEvent: function(event) {
        const input = event.target;
        const originalValue = input.value;
        
        console.log(`⌨️ KeyUp Event: Key="${event.key}", Code=${event.keyCode}`);
        
        // Filter using regular expression
        const lettersOnly = originalValue.replace(/[^a-zA-Z\s]/g, '');
        
        if (lettersOnly !== originalValue) {
            input.value = lettersOnly;
            this.rejectedCharacters += (originalValue.length - lettersOnly.length);
            this.showMessage(`❌ Non-letter character rejected`, 'error');
        }
        
        this.updateStats();
    },

    // METHOD 3: KeyDown Event (Prevent default for non-letters)
    handleKeyDownEvent: function(event) {
        const key = event.key;
        const keyCode = event.keyCode;
        
        console.log(`⌨️ KeyDown Event: Key="${key}", Code=${keyCode}`);
        
        // Allow: letters (a-z, A-Z), space (32), backspace (8), delete (46), arrow keys, tab
        const allowedKeys = [
            8,  // Backspace
            9,  // Tab
            13, // Enter
            32, // Space
            37, 38, 39, 40, // Arrow keys
            46  // Delete
        ];
        
        // Check if it's a letter (a-z, A-Z) or allowed key
        const isLetter = (keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122);
        const isAllowedKey = allowedKeys.includes(keyCode);
        
        if (!isLetter && !isAllowedKey) {
            event.preventDefault();
            this.rejectedCharacters++;
            this.showMessage(`❌ Key "${key}" rejected (not a letter)`, 'error');
            console.log(`❌ Rejected key: ${key} (Code: ${keyCode})`);
        } else if (isLetter) {
            this.acceptedCharacters++;
            this.showMessage(`✅ Letter "${key}" accepted`, 'success');
        }
        
        this.updateStats();
    },

    // METHOD 4: KeyPress Event
    handleKeyPressEvent: function(event) {
        const key = event.key;
        const charCode = event.charCode;
        
        console.log(`⌨️ KeyPress Event: Key="${key}", CharCode=${charCode}`);
        
        // Check if it's a letter (a-z, A-Z) or space
        const isLetter = (charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || charCode === 32;
        
        if (!isLetter) {
            event.preventDefault();
            this.rejectedCharacters++;
            this.showMessage(`❌ Character "${key}" rejected`, 'error');
            console.log(`❌ Rejected character: ${key} (CharCode: ${charCode})`);
        } else {
            this.acceptedCharacters++;
            this.showMessage(`✅ Letter "${key}" accepted`, 'success');
        }
        
        this.updateStats();
    },

    // Handle focus event
    handleFocus: function(event) {
        this.showMessage(`🎯 Using ${this.currentEvent} event - Try typing letters, numbers, and symbols!`, 'success');
    },

    // Set the event type and update UI
    setEventType: function(eventType) {
        console.log(`🔄 Switching to ${eventType} event`);
        
        this.currentEvent = eventType;
        this.setupEventListeners();
        this.updateEventDisplay();
        this.updateButtonStates();
        
        this.showMessage(`🔄 Now using ${eventType} event handler`, 'success');
    },

    // Update event type display
    updateEventDisplay: function() {
        document.getElementById('currentEvent').textContent = this.currentEvent;
        
        // Update filter method display
        const filterMethod = document.getElementById('filterMethod');
        if (this.currentEvent === 'keydown' || this.currentEvent === 'keypress') {
            filterMethod.textContent = 'Key Code Validation';
        } else {
            filterMethod.textContent = 'Regular Expression';
        }
    },

    // Update button active states
    updateButtonStates: function() {
        const buttons = document.querySelectorAll('.event-btn');
        buttons.forEach(button => {
            if (button.textContent.includes(this.currentEvent)) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    },

    // Update statistics display
    updateStats: function() {
        const input = document.getElementById('lettersInput');
        this.totalCharacters = this.acceptedCharacters + this.rejectedCharacters;
        
        document.getElementById('totalChars').textContent = this.totalCharacters;
        document.getElementById('acceptedChars').textContent = this.acceptedCharacters;
        document.getElementById('rejectedChars').textContent = this.rejectedCharacters;
    },

    // Show message to user
    showMessage: function(message, type) {
        const messageElement = document.getElementById('message');
        messageElement.textContent = message;
        messageElement.className = `message ${type}`;
        messageElement.style.display = 'block';
        
        // Auto-hide after 2 seconds
        setTimeout(() => {
            messageElement.style.display = 'none';
        }, 2000);
    },

    // Reset all statistics and input
    resetAll: function() {
        const input = document.getElementById('lettersInput');
        input.value = '';
        
        this.totalCharacters = 0;
        this.acceptedCharacters = 0;
        this.rejectedCharacters = 0;
        
        this.updateStats();
        this.showMessage('🔄 All statistics reset!', 'success');
        
        console.log("🔄 App reset");
    }
};

// =============================================
// INITIALIZATION
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    lettersApp.init();
    
    console.log("\n🎯 Event Handling Methods:");
    console.log("   1. input event - Real-time filtering with regex");
    console.log("   2. keyup event - Filter after key release");
    console.log("   3. keydown event - Prevent non-letters from being entered");
    console.log("   4. keypress event - Character-level validation");
    
    console.log("\n🔤 Allowed Characters:");
    console.log("   • A-Z (65-90)");
    console.log("   • a-z (97-122)");
    console.log("   • Space (32)");
    console.log("   • Control keys (backspace, delete, arrows, etc.)");
});

// Make the app globally available
window.lettersApp = lettersApp;