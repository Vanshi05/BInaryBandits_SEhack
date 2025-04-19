export interface Message {
    id?: string;
    senderId: string;
    content: string;
    timestamp: Date;
    read: boolean;
  }
  
  export interface ChatRoom {
    id?: string;
    participants: string[];
    lastMessage?: Message;
    createdAt: Date;
    lastUpdated: Date;
  }
  
  export interface UserProfile {
    uid: string;
    displayName?: string;
    email?: string;
    photoURL?: string;
    lastSeen?: Date;
  }