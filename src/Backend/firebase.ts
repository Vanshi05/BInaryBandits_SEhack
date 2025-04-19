// src/Backend/firebase.ts
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  AuthError,
  UserCredential
} from "firebase/auth";
import {
  getFirestore,
  Firestore,
  collection,
  CollectionReference,
  DocumentData
} from "firebase/firestore";
import { getStorage, FirebaseStorage, ref, StorageReference } from "firebase/storage";

// Type for your Firebase configuration
interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
}

// Your Firebase configuration
const firebaseConfig: FirebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCVRqeijT0smcO455Kz1je_UyVMWFpcQz8",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "paisa-he-paisa-2ac7d.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "paisa-he-paisa-2ac7d",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "paisa-he-paisa-2ac7d.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "734988355529",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:734988355529:web:ba871bc4d87bfd09a30a18",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-K8GL6WMV6P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Helper function to create typed collection references
const createCollection = <T = DocumentData>(collectionName: string): CollectionReference<T> => {
  return collection(db, collectionName) as CollectionReference<T>;
};

// Define your collections with types
const listingsCollection = createCollection<{
  title: string;
  description: string;
  category: string;
  price: number;
  location: string;
  images: string[];
  userId: string;
  status: 'available' | 'rented' | 'unavailable';
  createdAt: Date;
  updatedAt: Date;
}>("listings");

// Storage references helper
const getStorageRef = (path: string): StorageReference => {
  return ref(storage, path);
};

// Export all necessary Firebase functionality
export {
  auth,
  db,
  storage,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  listingsCollection,
  getStorageRef
};

// Export types
export type {
  FirebaseUser as User,
  AuthError,
  UserCredential,
  Firestore,
  FirebaseStorage
};