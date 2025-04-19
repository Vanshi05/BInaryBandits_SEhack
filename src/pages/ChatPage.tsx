// src/pages/ChatPage.tsx
import React from 'react';
import { useZego } from '../context/ZegoContext';
import ChatContainer from '../components/chat/ChatContainer';

const ChatPage: React.FC = () => {
  const { zim, isConnected, error } = useZego();

  if (error) return <div className="error">{error}</div>;
  if (!isConnected) return <div className="loading">Connecting to chat...</div>;
  if (!zim) return <div className="loading">Initializing chat...</div>;

  return (
    <div className="chat-page">
      <h1>Chat Room</h1>
      <ChatContainer />
    </div>
  );
};

export default ChatPage;