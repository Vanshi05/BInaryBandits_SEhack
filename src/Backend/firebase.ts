import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  getDocs
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCVRqeijT0smcO455Kz1je_UyVMWFpcQz8",
  authDomain: "paisa-he-paisa-2ac7d.firebaseapp.com",
  projectId: "paisa-he-paisa-2ac7d",
  storageBucket: "paisa-he-paisa-2ac7d.firebasestorage.app",
  messagingSenderId: "734988355529",
  appId: "1:734988355529:web:ba871bc4d87bfd09a30a18",
  measurementId: "G-K8GL6WMV6P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Authentication
export const auth = getAuth(app);

// Firestore Database
export const db = getFirestore(app);

// Collections
export const chatRoomsCollection = collection(db, "chatRooms");
export const usersCollection = collection(db, "users");

// Authentication Methods (existing)
export const emailSignIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Email sign-in error:", error);
    throw error;
  }
};

export const emailSignUp = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Email sign-up error:", error);
    throw error;
  }
};

// Chat Types
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

// Chat Functions
export const createChatRoom = async (participantIds: string[]): Promise<string> => {
  try {
    const chatRoomRef = doc(chatRoomsCollection);
    await setDoc(chatRoomRef, {
      participants: participantIds,
      createdAt: new Date(),
      lastUpdated: new Date()
    });
    return chatRoomRef.id;
  } catch (error) {
    console.error("Error creating chat room:", error);
    throw error;
  }
};

export const sendMessage = async (roomId: string, senderId: string, content: string): Promise<void> => {
  try {
    const messagesRef = collection(db, "chatRooms", roomId, "messages");
    const messageData = {
      senderId,
      content,
      timestamp: new Date(),
      read: false
    };
   
    // Add message to subcollection
    await addDoc(messagesRef, messageData);
   
    // Update last message in chat room
    const roomRef = doc(db, "chatRooms", roomId);
    await updateDoc(roomRef, {
      lastMessage: {
        ...messageData,
        id: roomId
      },
      lastUpdated: new Date()
    });
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

export const getMessages = async (roomId: string, limit = 50): Promise<Message[]> => {
  try {
    const messagesRef = collection(db, "chatRooms", roomId, "messages");
    const q = query(
      messagesRef,
      orderBy("timestamp", "desc"),
      limit(limit)
    );
   
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Message));
  } catch (error) {
    console.error("Error getting messages:", error);
    throw error;
  }
};

export const getUserChatRooms = async (userId: string): Promise<ChatRoom[]> => {
  try {
    const q = query(
      chatRoomsCollection,
      where("participants", "array-contains", userId),
      orderBy("lastUpdated", "desc")
    );
   
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as ChatRoom));
  } catch (error) {
    console.error("Error getting user chat rooms:", error);
    throw error;
  }
};

// Real-time Listeners
export const onChatRoomUpdate = (userId: string, callback: (rooms: ChatRoom[]) => void) => {
  const q = query(
    chatRoomsCollection,
    where("participants", "array-contains", userId),
    orderBy("lastUpdated", "desc")
  );
 
  return onSnapshot(q, (querySnapshot) => {
    const rooms = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as ChatRoom));
    callback(rooms);
  });
};

export const onMessagesUpdate = (roomId: string, callback: (messages: Message[]) => void) => {
  const messagesRef = collection(db, "chatRooms", roomId, "messages");
  const q = query(messagesRef, orderBy("timestamp", "asc"));
 
  return onSnapshot(q, (querySnapshot) => {
    const messages = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Message));
    callback(messages);
  });
};