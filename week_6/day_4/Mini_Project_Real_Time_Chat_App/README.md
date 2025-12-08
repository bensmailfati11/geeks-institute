# Mini Project - Real-time Chat App 💬

A real-time chat application built with Express.js and Socket.io, featuring multiple chat rooms, user presence, typing indicators, and more.

## Features ✨

### Core Features
- ✅ **Real-time messaging** - Instant message delivery using WebSockets
- ✅ **Multiple chat rooms** - Create and join different chat rooms
- ✅ **Username selection** - Choose your display name before joining
- ✅ **Active users list** - See who's online in your room
- ✅ **Join/Leave notifications** - Get notified when users join or leave
- ✅ **Message timestamps** - All messages show when they were sent
- ✅ **Typing indicators** - See when other users are typing
- ✅ **User-friendly interface** - Clean, modern design

### Advanced Features (Bonus)
- ✅ **Private messaging** - Send direct messages to specific users
- ✅ **Emoji support** - Express yourself with emojis
- ✅ **Message notifications** - Desktop notifications for new messages
- ✅ **Sound alerts** - Audio notification for new messages
- ✅ **Online status indicators** - Green dot for active users
- ✅ **Responsive design** - Works on desktop and mobile devices

## Project Structure

```
Mini_Project_Real_Time_Chat_App/
├── .gitignore
├── package.json
├── server.js              # Express + Socket.io server
├── README.md              # This file
└── public/
    ├── index.html         # Main HTML page
    ├── css/
    │   └── style.css      # Styling
    └── js/
        └── main.js        # Client-side Socket.io logic
```

## Technologies Used

- **Backend**: Node.js, Express.js, Socket.io
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Real-time Communication**: WebSockets (Socket.io)

## Installation & Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Server

```bash
# Production mode
npm start

# Development mode (with auto-reload)
npm run dev
```

### 3. Open the Application

Open your browser and navigate to:
```
http://localhost:3000
```

## How to Use

### 1. Join a Chat Room

1. Enter your desired **username**
2. Enter a **room name** (or use the default "General")
3. Click **"Join Chat"**

### 2. Send Messages

- Type your message in the input field at the bottom
- Press **Enter** or click **Send** button
- Your message appears instantly for all users in the room

### 3. View Active Users

- Check the right sidebar to see all active users in your current room
- Green dot indicates online status

### 4. Private Messaging

- Click on a username in the active users list
- Type your private message
- Only that user will see your message

### 5. Switch Rooms

- Click **"Leave Room"** button
- Enter a new room name
- Click **"Join Chat"** to join the new room

### 6. Use Emojis

- Click the 😊 emoji button next to the message input
- Select an emoji from the picker
- The emoji is added to your message

## Features in Detail

### Real-time Communication

The app uses **Socket.io** for bidirectional, real-time communication:

```javascript
// Server emits message to room
io.to(room).emit('message', messageData);

// Client receives and displays message
socket.on('message', (data) => {
  displayMessage(data);
});
```

### Room Management

Users can join different chat rooms:
- Messages are only sent to users in the same room
- Each room maintains its own list of active users
- Users can switch between rooms seamlessly

### Typing Indicators

See when other users are typing:
- Appears below the message input
- Shows "Username is typing..."
- Disappears after 3 seconds of inactivity

### Message Timestamps

All messages include:
- Username of the sender
- Time the message was sent
- Formatted as "HH:MM AM/PM"

## Socket.io Events

### Client → Server

| Event | Payload | Description |
|-------|---------|-------------|
| `join` | `{ username, room }` | User joins a chat room |
| `message` | `{ message }` | Send a message to the room |
| `privateMessage` | `{ to, message }` | Send a private message |
| `typing` | - | User is typing |
| `stopTyping` | - | User stopped typing |
| `disconnect` | - | User disconnects |

### Server → Client

| Event | Payload | Description |
|-------|---------|-------------|
| `message` | `{ username, message, time, type }` | New message received |
| `userJoined` | `{ username }` | User joined the room |
| `userLeft` | `{ username }` | User left the room |
| `roomUsers` | `{ room, users }` | Updated list of users |
| `typing` | `{ username }` | Someone is typing |
| `stopTyping` | `{ username }` | Someone stopped typing |

## Server Architecture

### Data Structures

```javascript
// Store active users
const users = new Map(); // socket.id -> { username, room }

// Store rooms and their members
const rooms = new Map(); // roomName -> Set of socket.ids
```

### Core Functions

- `joinRoom(socketId, room)` - Add user to a room
- `leaveRoom(socketId, room)` - Remove user from a room
- `getRoomUsers(room)` - Get all users in a room
- `getUserBySocketId(socketId)` - Get user data by socket ID
- `getUserByUsername(username, room)` - Find user by username

## Styling & UI

### Color Scheme
- Primary: `#667eea` (Purple gradient)
- Success: `#10b981` (Green)
- Danger: `#ef4444` (Red)
- Background: `#f7fafc` (Light gray)

### Layout
- **Left sidebar**: Chat room info and leave button
- **Main area**: Message display and input
- **Right sidebar**: Active users list

### Responsive Design
- Mobile-friendly layout
- Stacks vertically on small screens
- Touch-friendly buttons

## Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+

## Performance Considerations

- Messages are not persisted (in-memory only)
- Room data is stored in server memory
- Automatic cleanup when users disconnect
- Efficient event handling with Socket.io

## Future Enhancements

Potential features to add:
- [ ] Chat history persistence (database)
- [ ] User authentication & profiles
- [ ] File sharing capabilities
- [ ] Video/Voice calling
- [ ] Message reactions (like, love, etc.)
- [ ] Rich text formatting
- [ ] Read receipts
- [ ] User blocking
- [ ] Custom room themes
- [ ] Message search functionality

## Troubleshooting

### Port Already in Use

If port 3000 is already in use:
```bash
# Change PORT in server.js or set environment variable
PORT=3001 npm start
```

### Socket Connection Issues

Check browser console for errors:
```javascript
// Enable Socket.io debug mode
localStorage.debug = 'socket.io-client:socket';
```

### Messages Not Sending

1. Check network tab in browser DevTools
2. Verify Socket.io connection is established
3. Check server console for errors

## Security Notes

⚠️ **Important**: This is a demo application. For production use:
- Implement user authentication
- Add input sanitization
- Use HTTPS/WSS
- Implement rate limiting
- Add CORS configuration
- Validate all user inputs
- Add XSS protection

## Development

### Project Commands

```bash
# Install dependencies
npm install

# Start server
npm start

# Development with auto-reload
npm run dev
```

### Adding New Features

1. Update server.js for new Socket.io events
2. Update main.js for client-side handling
3. Update style.css for new UI elements
4. Update index.html if needed

## License

ISC

## Contributing

Feel free to fork, improve, and submit pull requests!

## Support

For issues or questions, please open an issue on GitHub.

---

Built with ❤️ using Express.js and Socket.io
