import React from 'react';
import { IMessage } from '../../../api/zego/zegoTypes';

interface MessageListProps {
  messages: IMessage[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="message-list">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`message ${message.senderID === 'current_user_id' ? 'sent' : 'received'}`}
        >
          <div className="message-content">{message.content}</div>
          <div className="message-time">
            {new Date(message.timestamp).toLocaleTimeString()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;