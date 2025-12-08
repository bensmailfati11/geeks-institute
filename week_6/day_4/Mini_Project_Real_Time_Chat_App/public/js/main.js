// Socket.io Client-side JavaScript
const socket = io();

// DOM Elements
const joinScreen = document.getElementById('join-screen');
const chatScreen = document.getElementById('chat-screen');
const joinForm = document.getElementById('join-form');
const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('message-input');
const messagesContainer = document.getElementById('messages');
const usersContainer = document.getElementById('users');
const roomNameDisplay = document.getElementById('room-name');
const currentUsernameDisplay = document.getElementById('current-username');
const userInitialDisplay = document.getElementById('user-initial');
const userCountDisplay = document.getElementById('user-count');
const leaveBtn = document.getElementById('leave-btn');
const typingIndicator = document.getElementById('typing-indicator');
const notificationSound = document.getElementById('notification-sound');

// State
let username = '';
let room = '';
let typingTimer;

// Join chat room
joinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    username = document.getElementById('username').value.trim();
    room = document.getElementById('room').value;

    if (username && room) {
        socket.emit('join', { username, room });
        
        // Update UI
        joinScreen.classList.remove('active');
        chatScreen.classList.add('active');
        roomNameDisplay.textContent = room;
        currentUsernameDisplay.textContent = username;
        userInitialDisplay.textContent = username.charAt(0).toUpperCase();
        
        // Focus on message input
        messageInput.focus();
    }
});

// Send message
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const message = messageInput.value.trim();
    
    if (message) {
        socket.emit('chatMessage', message);
        messageInput.value = '';
        messageInput.focus();
    }
});

// Typing indicator
let isTyping = false;
messageInput.addEventListener('input', () => {
    if (!isTyping) {
        socket.emit('typing');
        isTyping = true;
    }

    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
        socket.emit('stopTyping');
        isTyping = false;
    }, 1000);
});

// Leave chat
leaveBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to leave this chat room?')) {
        location.reload();
    }
});

// Listen for messages
socket.on('message', (message) => {
    displayMessage(message);
    scrollToBottom();
    
    // Play notification sound for other users' messages
    if (message.username !== username && message.type === 'message') {
        playNotification();
    }
});

// Listen for room users update
socket.on('roomUsers', (users) => {
    displayUsers(users);
});

// Listen for typing indicator
socket.on('userTyping', (username) => {
    typingIndicator.textContent = `${username} is typing...`;
});

socket.on('userStopTyping', () => {
    typingIndicator.textContent = '';
});

// Display message in chat
function displayMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    
    // Add type class
    if (message.type) {
        messageDiv.classList.add(message.type);
    }
    
    // Check if it's own message
    if (message.username === username && message.type === 'message') {
        messageDiv.classList.add('own');
    }

    const time = new Date(message.timestamp).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });

    messageDiv.innerHTML = `
        <div class="message-header">
            <span class="message-username">${message.username}</span>
            <span class="message-time">${time}</span>
        </div>
        <div class="message-text">${escapeHtml(message.text)}</div>
    `;

    messagesContainer.appendChild(messageDiv);
}

// Display users in sidebar
function displayUsers(users) {
    usersContainer.innerHTML = '';
    userCountDisplay.textContent = users.length;

    users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = user;
        if (user === username) {
            li.style.fontWeight = 'bold';
            li.style.color = 'var(--primary-color)';
        }
        usersContainer.appendChild(li);
    });
}

// Scroll to bottom of messages
function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Play notification sound
function playNotification() {
    try {
        notificationSound.currentTime = 0;
        notificationSound.play().catch(err => {
            console.log('Could not play notification sound:', err);
        });
    } catch (err) {
        console.log('Notification sound error:', err);
    }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Optional: Emoji support
document.querySelectorAll('.emoji').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const emoji = btn.dataset.emoji;
        messageInput.value += emoji;
        messageInput.focus();
    });
});

// Optional: Private messaging (if implemented)
socket.on('privateMessage', (message) => {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', 'private');
    
    const time = new Date(message.timestamp).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });

    messageDiv.innerHTML = `
        <div class="message-header">
            <span class="message-username">🔒 Private: ${message.username}</span>
            <span class="message-time">${time}</span>
        </div>
        <div class="message-text">${escapeHtml(message.text)}</div>
    `;

    messagesContainer.appendChild(messageDiv);
    scrollToBottom();
    playNotification();
});

// Handle connection errors
socket.on('connect_error', (error) => {
    console.error('Connection error:', error);
    alert('Failed to connect to chat server. Please try again.');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

// Send private message (Optional feature)
// Usage: Type "@username message" to send private message
messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        const message = messageInput.value.trim();
        
        // Check for private message format: @username message
        if (message.startsWith('@')) {
            e.preventDefault();
            const parts = message.split(' ');
            const recipient = parts[0].substring(1); // Remove @
            const privateMessage = parts.slice(1).join(' ');
            
            if (recipient && privateMessage) {
                socket.emit('privateMessage', { to: recipient, message: privateMessage });
                messageInput.value = '';
            }
        }
    }
});

// Welcome animation
window.addEventListener('load', () => {
    joinScreen.style.opacity = '0';
    setTimeout(() => {
        joinScreen.style.opacity = '1';
    }, 100);
});

// Show online status
window.addEventListener('online', () => {
    console.log('Back online');
});

window.addEventListener('offline', () => {
    console.log('Connection lost');
    alert('You are offline. Trying to reconnect...');
});
