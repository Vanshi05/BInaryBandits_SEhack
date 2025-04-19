import { useEffect, useState } from 'react';
import { createZIM } from '../api/zego/zegoClient';
import { IMessage, ZegoChatState } from '../api/zego/zegoTypes';
// src/hooks/useZegoChat.ts
import { ZIM } from 'zego-zim-web'; // Updated import

export const useZegoChat = (userID: string, userName: string) => {
  const [state, setState] = useState<ZegoChatState>({
    zim: null,
    messages: [],
    onlineUsers: [],
    currentConversationID: null,
    isConnected: false,
    error: null,
  });

  useEffect(() => {
    const initializeChat = async () => {
      try {
        const zim = await createZIM(userID, userName);
        
        zim.on('connectionStateChanged', (state: number) => {
          setState(prev => ({ ...prev, isConnected: state === 2 }));
        });

        zim.on('receivePeerMessage', (message: any) => {
          const newMessage: IMessage = {
            id: message.messageID,
            content: message.message,
            senderID: message.senderUserID,
            senderName: message.senderUserName,
            timestamp: message.timestamp,
            type: 'text',
          };
          setState(prev => ({ ...prev, messages: [...prev.messages, newMessage] }));
        });

        setState(prev => ({ ...prev, zim, isConnected: true }));
      } catch (error) {
        setState(prev => ({ ...prev, error: error.message }));
      }
    };

    initializeChat();

    return () => {
      if (state.zim) {
        state.zim.logout();
      }
    };
  }, [userID, userName]);

  const sendMessage = async (content: string, receiverID: string) => {
    if (!state.zim) return;
    
    try {
      await state.zim.sendPeerMessage({
        message: content,
        toUserID: receiverID,
        conversationID: state.currentConversationID || undefined,
      });
      
      const newMessage: IMessage = {
        id: Date.now().toString(),
        content,
        senderID: userID,
        senderName: userName,
        timestamp: Date.now(),
        type: 'text',
      };
      
      setState(prev => ({ ...prev, messages: [...prev.messages, newMessage] }));
    } catch (error) {
      setState(prev => ({ ...prev, error: error.message }));
    }
  };

  return { ...state, sendMessage };
};