import React from 'react';
import { useZego } from '../../context/ZegoContext';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import  useChatStore  from '../../stores/chatStore';

const ChatContainer: React.FC = () => {
  const { zim, isConnected } = useZego();
  const { messages, sendMessage } = useChatStore();

  const handleSend = async (content: string) => {
    if (!zim) return;
    
    // In a real app, you'd specify the receiver ID
    const receiverID = 'recipient_user_id'; 
    await sendMessage(zim, content, receiverID);
  };

  if (!isConnected) return <div>Connecting to chat...</div>;

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chat</h2>
      </div>
      <MessageList messages={messages} />
      <MessageInput onSend={handleSend} />
    </div>
  );
};

export default ChatContainer;