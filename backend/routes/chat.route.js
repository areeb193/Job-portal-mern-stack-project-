import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { 
  getChats, 
  getChatByApplication, 
  createChat, 
  sendMessage, 
  markAsRead 
} from '../controllers/chat.controller.js';

const router = express.Router();

// Get all chats for current user
router.get('/chats', isAuthenticated, getChats);

// Get specific chat by application ID
router.get('/chats/application/:applicationId', isAuthenticated, getChatByApplication);

// Create a new chat
router.post('/chats', isAuthenticated, createChat);

// Send a message
router.post('/chats/message', isAuthenticated, sendMessage);

// Mark messages as read
router.put('/chats/:chatId/read', isAuthenticated, markAsRead);

export default router;
