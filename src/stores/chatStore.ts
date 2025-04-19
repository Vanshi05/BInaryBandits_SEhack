import { create } from 'zustand';
import { IMessage } from '../api/zegoTypes';
import { ZIM } from 'zego-zim-web';

interface ChatState {
  messages: IMessage[];
  addMessage: (message: IMessage) => void;
  sendMessage: (zim: ZIM, content: string, receiverID: string) => Promise<void>;
}

const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  
  addMessage: (message) => 
    set((state) => ({ messages: [...state.messages, message] })),
  
  sendMessage: async (zim, content, receiverID) => {
    try {
      await zim.sendPeerMessage({
        message: content,
        toUserID: receiverID,
      });
      
      const newMessage: IMessage = {
        id: Date.now().toString(),
        content,
        senderID: 'current_user_id', // Replace with actual user ID
        senderName: 'You',
        timestamp: Date.now(),
        type: 'text',
      };
      
      get().addMessage(newMessage);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  },
}));

export default useChatStore;