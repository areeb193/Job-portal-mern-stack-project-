import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import connectDB from './utils/db.js';
import userRoutes from './routes/user.route.js';
import jobRoutes from './routes/job.route.js';
import companyRoutes from './routes/company.route.js';
import applicationRoutes from './routes/application.route.js';
import jobHuntRoutes from './routes/jobHunt.route.js';
import chatRoutes from './routes/chat.route.js';

dotenv.config({});
const app = express();
const httpServer = createServer(app);

// Socket.IO setup
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.get('/', (req, res) => {
  res.send('Welcome to the Job Portal Backend!');   });
// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin:'http://localhost:5173', // Replace with your frontend URL
  credentials: true, // Allow credentials to be sent
};
app.use(cors(corsOptions));

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  // Join chat room based on application
  socket.on('join-chat', (applicationId) => {
    socket.join(`chat-${applicationId}`);
    console.log(`User joined chat room: chat-${applicationId}`);
  });
  
  // Handle incoming messages
  socket.on('send-message', async (data) => {
    const { chatId, senderId, content, applicationId } = data;
    
    console.log('Socket received message:', { chatId, senderId, content, applicationId });
    
    // Broadcast to all users in the chat room
    io.to(`chat-${applicationId}`).emit('new-message', {
      chatId,
      senderId,
      content,
      timestamp: new Date()
    });
    
    console.log('Message broadcasted to chat room:', `chat-${applicationId}`);
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 8000;

app.use('/api/v1/user', userRoutes);
//http://localhost:8000/api/v1/user/register
//http://localhost:8000/api/v1/user/login
//http://localhost:8000/api/v1/user/profile/update
app.use('/api/v1/company', companyRoutes);
app.use('/api/v1/job', jobRoutes);
app.use('/api/v1/application', applicationRoutes);
app.use('/api/v1/job-hunt', jobHuntRoutes);
app.use('/api/v1/chat', chatRoutes);
//http://localhost:8000/api/v1/application/apply/:id
//http://localhost:8000/api/v1/application/get
//http://localhost:8000/api/v1/application/:id/applicants
//http://localhost:8000/api/v1/application/status/:id/update
//http://localhost:8000/api/v1/job/get


httpServer.listen(PORT, () => {
    connectDB();
  console.log(`Connected to MongoDB`);
  console.log(`Server is running on http://localhost:${PORT}`);
});