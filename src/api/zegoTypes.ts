import { ZIM } from 'zego-zim-web';

export interface IMessage {
  id: string;
  content: string;
  senderID: string;
  senderName: string;
  timestamp: number;
  type: 'text' | 'image' | 'file';
}

export type ZegoChatState = {
  zim: ZIM | null;
  messages: IMessage[];
  onlineUsers: { userID: string; userName: string }[];
  currentConversationID: string | null;
  isConnected: boolean;
  error: string | null;
};