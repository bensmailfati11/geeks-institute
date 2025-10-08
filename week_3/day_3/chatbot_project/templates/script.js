class ChatApp {
    constructor() {
        this.messages = document.getElementById('messages');
        this.input = document.getElementById('messageInput');
        this.sendBtn = document.getElementById('sendBtn');
        
        this.isLoading = false;
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.input.focus();
        
        // Add initial quick replies
        this.addQuickReplies();
    }
    
    setupEventListeners() {
        // Send message on button click
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        
        // Send message on Enter key
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        // Auto-resize textarea
        this.input.addEventListener('input', () => {
            this.autoResizeTextarea();
        });
    }
    
    autoResizeTextarea() {
        this.input.style.height = 'auto';
        this.input.style.height = (this.input.scrollHeight) + 'px';
    }
    
    async sendMessage() {
        const message = this.input.value.trim();
        
        if (!message || this.isLoading) return;
        
        // Clear input and reset height
        this.input.value = '';
        this.input.style.height = 'auto';
        
        // Add user message
        this.addMessage(message, 'user');
        
        // Show loading state
        this.setLoading(true);
        this.showTyping();
        
        try {
            // In a real app, you would send this to your backend
            // For demo purposes, we'll simulate a response
            setTimeout(() => {
                this.hideTyping();
                
                // Generate a bot response based on user input
                const response = this.generateBotResponse(message);
                this.addMessage(response, 'bot');
                
                this.setLoading(false);
                this.input.focus();
            }, 1500);
            
        } catch (error) {
            this.hideTyping();
            this.addMessage('❌ Network error. Please check your connection.', 'bot');
            console.error('Chat error:', error);
            this.setLoading(false);
            this.input.focus();
        }
    }
    
    generateBotResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            return "Hello! How can I assist you today?";
        } else if (lowerMessage.includes('morocco') || lowerMessage.includes('moroccan')) {
            return "Morocco is a beautiful country in North Africa. It's known for its diverse landscapes, rich history, and vibrant culture. Major cities include Casablanca, Rabat, Marrakech, and Fes.";
        } else if (lowerMessage.includes('weather')) {
            return "I don't have access to real-time weather data, but you can check reliable weather services for current conditions.";
        } else if (lowerMessage.includes('help')) {
            return "I can help with general information, answer questions, or just chat! What would you like to know?";
        } else if (lowerMessage.includes('thank')) {
            return "You're welcome! Is there anything else I can help you with?";
        } else if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
            return "Goodbye! Feel free to come back if you have more questions.";
        } else {
            return "Thanks for your message! I'm an AI assistant designed to help with general queries. How can I assist you further?";
        }
    }
    
    addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        const messageText = document.createElement('p');
        messageText.textContent = content;
        messageContent.appendChild(messageText);
        
        messageDiv.appendChild(messageContent);
        
        const messageTime = document.createElement('div');
        messageTime.className = 'message-time';
        messageTime.textContent = this.getCurrentTime();
        messageDiv.appendChild(messageTime);
        
        this.messages.appendChild(messageDiv);
        this.scrollToBottom();
        
        // Add quick replies for bot messages
        if (sender === 'bot') {
            this.addQuickReplies();
        }
    }
    
    addQuickReplies() {
        // Remove existing quick replies
        const existingReplies = document.querySelector('.message-options');
        if (existingReplies) {
            existingReplies.remove();
        }
        
        const quickReplies = document.createElement('div');
        quickReplies.className = 'message-options';
        
        const options = [
            "Tell me about Morocco",
            "How does this work?",
            "What can you help with?",
            "Thank you"
        ];
        
        options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = option;
            button.addEventListener('click', () => {
                this.input.value = option;
                this.sendMessage();
            });
            quickReplies.appendChild(button);
        });
        
        this.messages.appendChild(quickReplies);
        this.scrollToBottom();
    }
    
    getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    showTyping() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing';
        typingDiv.id = 'typingIndicator';
        
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('div');
            dot.className = 'typing-dot';
            typingDiv.appendChild(dot);
        }
        
        this.messages.appendChild(typingDiv);
        this.scrollToBottom();
    }
    
    hideTyping() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    setLoading(loading) {
        this.isLoading = loading;
        this.sendBtn.disabled = loading;
        
        if (loading) {
            this.sendBtn.innerHTML = '<div class="typing-dot"></div>';
        } else {
            this.sendBtn.innerHTML = '<span class="send-icon">↑</span>';
        }
    }
    
    scrollToBottom() {
        this.messages.scrollTop = this.messages.scrollHeight;
    }
}

// Initialize chat when page loads
document.addEventListener('DOMContentLoaded', () => {
    new ChatApp();
});