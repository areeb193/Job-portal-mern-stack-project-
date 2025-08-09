# Chat Feature Implementation Guide

## Overview
This implementation adds a real-time chat feature between students (job applicants) and recruiters using Socket.IO. The chat system allows students to message recruiters about their job applications and vice versa.

## Features
- ✅ Real-time messaging using Socket.IO
- ✅ Modern, responsive chat popup UI
- ✅ Message history persistence
- ✅ Unread message badges
- ✅ Mobile-responsive design
- ✅ Clean, modern UI with smooth animations

## Installation

### Backend Dependencies
```bash
cd backend
npm install socket.io
```

### Frontend Dependencies
```bash
cd frontend
npm install socket.io-client
```

## File Structure

### Backend Files Added/Modified:
- `models/chat.model.js` - Chat and message schemas
- `controllers/chat.controller.js` - Chat API endpoints
- `routes/chat.route.js` - Chat routes
- `index.js` - Socket.IO server setup

### Frontend Files Added/Modified:
- `components/chat/ChatPopup.jsx` - Main chat popup component
- `components/chat/ChatButton.jsx` - Reusable chat button component
- `contexts/SocketContext.jsx` - Socket.IO context provider
- `redux/chatSlice.js` - Chat state management
- `components/AppliedJobTable.jsx` - Added chat button for students
- `components/admin/ApplicantsTable.jsx` - Added chat button for recruiters
- `main.jsx` - Added SocketProvider wrapper
- `redux/store.js` - Added chat slice

## Usage

### For Students:
1. Navigate to your applied jobs page
2. Click "Message" button next to any job application
3. Chat popup opens with the recruiter for that job
4. Send messages in real-time

### For Recruiters:
1. Navigate to job applicants page
2. Click the message icon next to any applicant
3. Chat popup opens with that student
4. Send messages in real-time

## API Endpoints

### Chat Endpoints:
- `GET /api/v1/chat/chats` - Get all chats for current user
- `GET /api/v1/chat/chats/application/:applicationId` - Get chat by application
- `POST /api/v1/chat/chats` - Create new chat
- `POST /api/v1/chat/chats/message` - Send message
- `PUT /api/v1/chat/chats/:chatId/read` - Mark messages as read

## Socket.IO Events

### Client to Server:
- `join-chat` - Join a chat room
- `send-message` - Send a message

### Server to Client:
- `new-message` - Receive new message

## Components

### ChatPopup
The main chat interface component with:
- Header with chat partner info and online status
- Message history with alternating bubbles
- Input field with send button
- Smooth animations and responsive design

### ChatButton
Reusable button component with variants:
- `default` - Full button with text
- `icon` - Icon only with badge
- `text` - Text link style

## Styling
- Uses Tailwind CSS for styling
- Modern gradient headers
- Rounded corners and soft shadows
- Responsive design for mobile and desktop
- Smooth transitions and animations

## Real-time Features
- Instant message delivery
- Online/offline status indicators
- Message timestamps
- Unread message counters
- Auto-scroll to latest messages

## Security
- User authentication required for all chat operations
- Chat access restricted to participants only
- Input validation and sanitization
- Rate limiting for message sending

## Future Enhancements
- Typing indicators
- Message read receipts
- File/image sharing
- Push notifications
- Message search functionality
- Chat history export

## Troubleshooting

### Common Issues:
1. **Socket connection failed**: Check if backend server is running on port 3000
2. **Messages not sending**: Verify user authentication and chat permissions
3. **UI not responsive**: Ensure all CSS classes are properly loaded

### Debug Steps:
1. Check browser console for Socket.IO connection errors
2. Verify API endpoints are accessible
3. Confirm user authentication is working
4. Test with different user roles (student/recruiter)

## Testing
- Test with multiple users simultaneously
- Verify real-time message delivery
- Test mobile responsiveness
- Check unread message badges
- Verify chat persistence after page refresh
