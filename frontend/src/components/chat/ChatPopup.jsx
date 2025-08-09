import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Smile } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useSocket } from '../../contexts/SocketContext';
import axios from '../../utils/axiosConfig';
import { MessageSquare } from "lucide-react";


const ChatPopup = ({ 
  isOpen, 
  onClose, 
  applicationId, 
  chatPartner, 
  jobTitle 
}) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [chat, setChat] = useState(null);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { user } = useSelector(state => state.auth);
  const { socket, joinChat, leaveChat, sendMessage: socketSendMessage } = useSocket();

  // Scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && applicationId) {
      fetchOrCreateChat();
      joinChat(applicationId);
    }

    return () => {
      if (applicationId) {
        leaveChat(applicationId);
      }
    };
  }, [isOpen, applicationId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchOrCreateChat = async () => {
    try {
      setLoading(true);
      
      // First try to get existing chat
      try {
        const response = await axios.get(`/api/v1/chat/chats/application/${applicationId}`);
        if (response.data.success) {
          setChat(response.data.chat);
          setMessages(response.data.chat.messages || []);
          return;
        }
      } catch (error) {
        // Chat doesn't exist, create new one
        console.log('Chat not found, creating new chat...');
      }
      
      // Create new chat if it doesn't exist
      try {
        const createResponse = await axios.post('/api/v1/chat/chats', {
          applicationId
        });
        
        if (createResponse.data.success) {
          setChat(createResponse.data.chat);
          setMessages(createResponse.data.chat.messages || []);
        }
      } catch (createError) {
        console.error('Error creating chat:', createError);
        // Show error to user
        alert('Failed to create chat. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching/creating chat:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !chat) return;

    const messageContent = newMessage.trim();
    setNewMessage(''); // Clear input immediately for better UX

    try {
      const response = await axios.post('/api/v1/chat/chats/message', {
        chatId: chat._id,
        content: messageContent
      });

      if (response.data.success) {
        // Send via socket for real-time broadcasting
        socketSendMessage({
          chatId: chat._id,
          senderId: user._id,
          content: messageContent,
          applicationId
        });
        console.log('Message sent successfully');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Restore the message in input if sending failed
      setNewMessage(messageContent);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const isOwnMessage = (senderId) => {
    return senderId === user._id;
  };

  // Listen for real-time messages
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (data) => {
      console.log('Received new message via socket:', data);
      if (data.chatId === chat?._id) {
        setMessages(prev => {
          // Check if message already exists to prevent duplicates
          const messageExists = prev.some(msg => 
            msg.content === data.content && 
            msg.sender === data.senderId &&
            Math.abs(new Date(msg.timestamp) - new Date(data.timestamp)) < 1000 // Within 1 second
          );
          
          if (messageExists) {
            console.log('Message already exists, skipping duplicate');
            return prev;
          }
          
          console.log('Adding new message to chat');
          return [...prev, {
            sender: data.senderId,
            content: data.content,
            timestamp: data.timestamp
          }];
        });
      }
    };

    socket.on('new-message', handleNewMessage);

    return () => {
      socket.off('new-message', handleNewMessage);
    };
  }, [socket, chat]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-4 pointer-events-none">
      {/* Backdrop */}
<div 
  className="absolute inset-0 bg-white bg-opacity-80 pointer-events-auto"
  onClick={onClose}
/>

      
      {/* Chat Popup */}
      <div className="relative w-full max-w-sm h-96 md:h-[500px] bg-white rounded-t-2xl shadow-2xl pointer-events-auto transform transition-all duration-300 ease-in-out">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-2xl">
          <div className="flex items-center space-x-3">
            <div className="relative">
            <MessageSquare className="w-5 h-5" />

              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h3 className="font-semibold text-sm">{chatPartner?.fullname}</h3>
              <p className="text-xs opacity-90">{jobTitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 h-64 md:h-80">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center text-gray-500 text-sm mt-8">
              No messages yet. Start the conversation!
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${isOwnMessage(message.sender) ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl ${
                    isOwnMessage(message.sender)
                      ? 'bg-blue-500 text-white rounded-br-md'
                      : 'bg-gray-100 text-gray-800 rounded-bl-md'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    isOwnMessage(message.sender) ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
              <Smile className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPopup;
