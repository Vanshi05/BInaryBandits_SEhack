// src/Backend/firebase.ts

// apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCVRqeijT0smcO455Kz1je_UyVMWFpcQz8",
// authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "paisa-he-paisa-2ac7d.firebaseapp.com",
// projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "paisa-he-paisa-2ac7d",
// storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "paisa-he-paisa-2ac7d.appspot.com",
// messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "734988355529",
// appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:734988355529:web:ba871bc4d87bfd09a30a18",
// measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-K8GL6WMV6P"

// src/Backend/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore, persistentLocalCache } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Validate environment variables
const requiredConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCVRqeijT0smcO455Kz1je_UyVMWFpcQz8",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "paisa-he-paisa-2ac7d.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "paisa-he-paisa-2ac7d",
};

if (!requiredConfig.apiKey || !requiredConfig.authDomain || !requiredConfig.projectId) {
  throw new Error("Missing Firebase configuration values");
}

const firebaseConfig = {
  ...requiredConfig,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "paisa-he-paisa-2ac7d.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "734988355529",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:734988355529:web:ba871bc4d87bfd09a30a18",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-K8GL6WMV6P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth = getAuth(app);

// Initialize Firestore with persistence
const db = initializeFirestore(app, {
  localCache: persistentLocalCache()
});

// Initialize Storage
const storage = getStorage(app);

export {
  auth,
  db,
  storage,
  // Only export what you actually use
  getAuth,
  getStorage
};