// Real-time Chat App Server
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const PORT = process.env.PORT || 3000;

// Store active users and rooms
const users = new Map(); // socket.id -> { username, room }
const rooms = new Map(); // roomName -> Set of socket.ids

// Middleware
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Socket.io connection
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // User joins with username and room
  socket.on('join', ({ username, room }) => {
    // Leave previous room if exists
    const previousData = users.get(socket.id);
    if (previousData) {
      socket.leave(previousData.room);
      leaveRoom(socket.id, previousData.room);
    }

    // Join new room
    socket.join(room);
    users.set(socket.id, { username, room });
    
    if (!rooms.has(room)) {
      rooms.set(room, new Set());
    }
    rooms.get(room).add(socket.id);

    // Notify user
    socket.emit('message', {
      username: 'System',
      text: `Welcome to ${room}, ${username}!`,
      timestamp: new Date().toISOString(),
      type: 'system'
    });

    // Notify room
    socket.to(room).emit('message', {
      username: 'System',
      text: `${username} has joined the chat`,
      timestamp: new Date().toISOString(),
      type: 'join'
    });

    // Send updated user list to room
    updateRoomUsers(room);

    console.log(`${username} joined room: ${room}`);
  });

  // Handle chat message
  socket.on('chatMessage', (message) => {
    const userData = users.get(socket.id);
    if (userData) {
      const messageData = {
        username: userData.username,
        text: message,
        timestamp: new Date().toISOString(),
        type: 'message'
      };

      // Send to everyone in the room
      io.to(userData.room).emit('message', messageData);
    }
  });

  // Handle typing indicator
  socket.on('typing', () => {
    const userData = users.get(socket.id);
    if (userData) {
      socket.to(userData.room).emit('userTyping', userData.username);
    }
  });

  socket.on('stopTyping', () => {
    const userData = users.get(socket.id);
    if (userData) {
      socket.to(userData.room).emit('userStopTyping', userData.username);
    }
  });

  // Handle private message (Optional feature)
  socket.on('privateMessage', ({ to, message }) => {
    const senderData = users.get(socket.id);
    if (senderData) {
      // Find recipient socket ID
      let recipientSocketId = null;
      for (const [socketId, data] of users.entries()) {
        if (data.username === to) {
          recipientSocketId = socketId;
          break;
        }
      }

      if (recipientSocketId) {
        const messageData = {
          username: senderData.username,
          text: message,
          timestamp: new Date().toISOString(),
          type: 'private',
          to: to
        };

        // Send to recipient
        io.to(recipientSocketId).emit('privateMessage', messageData);
        // Send back to sender
        socket.emit('privateMessage', messageData);
      }
    }
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    const userData = users.get(socket.id);
    
    if (userData) {
      const { username, room } = userData;
      
      // Remove from room
      leaveRoom(socket.id, room);
      users.delete(socket.id);

      // Notify room
      io.to(room).emit('message', {
        username: 'System',
        text: `${username} has left the chat`,
        timestamp: new Date().toISOString(),
        type: 'leave'
      });

      // Update user list
      updateRoomUsers(room);

      console.log(`${username} disconnected from room: ${room}`);
    } else {
      console.log(`User disconnected: ${socket.id}`);
    }
  });
});

// Helper function to remove user from room
function leaveRoom(socketId, roomName) {
  if (rooms.has(roomName)) {
    rooms.get(roomName).delete(socketId);
    if (rooms.get(roomName).size === 0) {
      rooms.delete(roomName);
    }
  }
}

// Helper function to update room users list
function updateRoomUsers(roomName) {
  if (rooms.has(roomName)) {
    const roomUsers = [];
    for (const socketId of rooms.get(roomName)) {
      const userData = users.get(socketId);
      if (userData) {
        roomUsers.push(userData.username);
      }
    }
    io.to(roomName).emit('roomUsers', roomUsers);
  }
}

// Start server
httpServer.listen(PORT, () => {
  console.log(`🚀 Chat App Server running on http://localhost:${PORT}`);
  console.log('Features:');
  console.log('  ✓ Real-time messaging');
  console.log('  ✓ Multiple chat rooms');
  console.log('  ✓ Active user list');
  console.log('  ✓ Join/Leave notifications');
  console.log('  ✓ Typing indicators');
  console.log('  ✓ Private messaging (Optional)');
});

export default app;
