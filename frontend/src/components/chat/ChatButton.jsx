import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import ChatPopup from './ChatPopup';

const ChatButton = ({ 
  applicationId, 
  chatPartner, 
  jobTitle, 
  unreadCount = 0,
  className = "",
  variant = "default" // "default", "icon", "text"
}) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleOpenChat = () => {
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  const renderButton = () => {
    switch (variant) {
      case "icon":
        return (
          <button
            onClick={handleOpenChat}
            className={`relative p-2 text-gray-600 hover:text-blue-600 transition-colors ${className}`}
          >
            <MessageCircle className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
        );
      
      case "text":
        return (
          <button
            onClick={handleOpenChat}
            className={`flex items-center space-x-2 px-4 py-2 text-blue-600 hover:text-blue-700 transition-colors ${className}`}
          >
            <MessageCircle className="w-4 h-4" />
            <span>Message</span>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                {unreadCount}
              </span>
            )}
          </button>
        );
      
      default:
        return (
          <button
            onClick={handleOpenChat}
            className={`flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${className}`}
          >
            <MessageCircle className="w-4 h-4" />
            <span>Message Recruiter</span>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                {unreadCount}
              </span>
            )}
          </button>
        );
    }
  };

  return (
    <>
      {renderButton()}
      <ChatPopup
        isOpen={isChatOpen}
        onClose={handleCloseChat}
        applicationId={applicationId}
        chatPartner={chatPartner}
        jobTitle={jobTitle}
      />
    </>
  );
};

export default ChatButton;
