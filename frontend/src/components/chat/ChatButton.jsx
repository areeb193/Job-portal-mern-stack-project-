import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import ChatPopup from './ChatPopup';
import { useSocket } from '@/contexts/SocketContext';

const ChatButton = ({ 
  applicationId, 
  chatPartner, 
  jobTitle, 
  unreadCount = 0,
  // new optional props for dynamic notifications
  userId,
  role, // 'student' | 'admin'
  pollInterval = 15000,
  fetchUnreadCount, // async () => number
  markSeen, // async () => void
  wsUrl, // optional WebSocket URL for realtime updates
  className = "",
  variant = "default" // "default", "icon", "text"
}) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [badgeCount, setBadgeCount] = useState(unreadCount);
  const wsRef = useRef(null);
  const { socket, joinChat, leaveChat, isConnected } = useSocket();

  // Sync internal count when prop changes
  useEffect(() => {
    setBadgeCount(unreadCount);
  }, [unreadCount]);

  // Polling for unread count
  useEffect(() => {
    let timer;
    let cancelled = false;
    const isVisible = () => typeof document !== 'undefined' ? document.visibilityState === 'visible' : true;
    const shouldPoll = () => !!fetchUnreadCount && pollInterval > 0 && !isConnected && isVisible();
    const tick = async () => {
      if (typeof fetchUnreadCount === 'function') {
        try {
          const n = await fetchUnreadCount({ userId, role, applicationId, chatPartner });
          if (!cancelled && typeof n === 'number') setBadgeCount(n);
        } catch {
          /* ignore polling error */
        }
      }
    };
    // initial fetch once
    tick();
    // conditional interval
    if (shouldPoll()) {
      timer = setInterval(() => {
        if (isVisible()) tick();
      }, pollInterval);
    }
    const onVisibility = () => {
      if (!timer && shouldPoll()) {
        timer = setInterval(() => {
          if (isVisible()) tick();
        }, pollInterval);
      }
      if (timer && !shouldPoll()) {
        clearInterval(timer); timer = null;
      }
    };
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', onVisibility);
    }
    return () => {
      cancelled = true;
      if (timer) clearInterval(timer);
      if (typeof document !== 'undefined') {
        document.removeEventListener('visibilitychange', onVisibility);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchUnreadCount, pollInterval, isConnected]);

  // Optional realtime via WebSocket
  useEffect(() => {
    if (!wsUrl) return;
    try {
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;
      ws.onmessage = (evt) => {
        try {
          const data = JSON.parse(evt.data);
          // Expecting a shape like { type: 'chat:new_message', toUserId, applicationId }
          if (data?.type === 'chat:new_message') {
            const matchUser = !userId || data.toUserId === userId;
            const matchApp = !applicationId || data.applicationId === applicationId;
            if (matchUser && matchApp && !isChatOpen) {
              setBadgeCount((c) => Math.min(99, c + 1));
            }
          }
  } catch { /* ignore parse error */ }
      };
      ws.onerror = () => {
        // ignore ws error
      };
      return () => {
        try { ws.close(); } catch {
          /* ignore close error */
        }
      };
    } catch {
      /* ignore ws init error */
    }
  }, [wsUrl, userId, applicationId, isChatOpen]);

  // Socket.IO realtime via context
  useEffect(() => {
    if (!applicationId) return;
    joinChat?.(applicationId);

    const onNewMessage = (evt) => {
      // evt received only for this application's room
      // Increment if message from other user and chat is closed
      if (!isChatOpen && evt && evt.senderId && userId && evt.senderId !== userId) {
        setBadgeCount((c) => Math.min(99, c + 1));
      }
    };

    if (socket && isConnected) {
      socket.on('new-message', onNewMessage);
    }

    return () => {
  try { socket && socket.off && socket.off('new-message', onNewMessage); } catch { /* ignore detach error */ }
      leaveChat?.(applicationId);
    };
  }, [socket, isConnected, applicationId, userId, isChatOpen, joinChat, leaveChat]);

  const handleOpenChat = () => {
    setIsChatOpen(true);
    // Mark messages seen on open
    (async () => {
      try {
        if (typeof markSeen === 'function') await markSeen({ userId, role, applicationId, chatPartner });
      } catch {
        /* ignore mark seen error */
      }
      setBadgeCount(0);
    })();
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
      {badgeCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
        {badgeCount > 9 ? '9+' : badgeCount}
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
      {badgeCount > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
        {badgeCount}
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
      {badgeCount > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
        {badgeCount}
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
