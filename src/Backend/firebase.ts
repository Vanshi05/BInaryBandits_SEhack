// src/Backend/firebase.ts
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  connectAuthEmulator,
  inMemoryPersistence,
  setPersistence
} from "firebase/auth";
import { 
  initializeFirestore, 
  persistentLocalCache,
  connectFirestoreEmulator,
  CACHE_SIZE_UNLIMITED
} from "firebase/firestore";
import { 
  getStorage, 
  connectStorageEmulator 
} from "firebase/storage";

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

// Initialize Auth with persistence
const auth = getAuth(app);
setPersistence(auth, inMemoryPersistence)
  .catch((error) => {
    console.error("Error setting auth persistence:", error);
  });

// Initialize Firestore with enhanced persistence
const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    cacheSizeBytes: CACHE_SIZE_UNLIMITED
  }),
  ignoreUndefinedProperties: true // Helps with partial updates
});

// Initialize Storage
const storage = getStorage(app);

// Emulator connections for development
if (import.meta.env.DEV) {
  try {
    // Uncomment to use emulators
    // connectAuthEmulator(auth, "http://localhost:9099");
    // connectFirestoreEmulator(db, 'localhost', 8080);
    // connectStorageEmulator(storage, "localhost", 9199);
    console.log("Firebase emulators ready to connect (uncomment in firebase.ts)");
  } catch (error) {
    console.error("Failed to connect to emulators:", error);
  }
}

export { 
  auth, 
  db, 
  storage,
  app // Export app if needed for other Firebase services
};