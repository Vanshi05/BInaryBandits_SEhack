// // src/Backend/firebase.ts
// import { initializeApp, FirebaseApp } from "firebase/app";
// import { 
//   getAuth, 
//   connectAuthEmulator,
//   inMemoryPersistence,
//   setPersistence,
//   Auth,
//   User
// } from "firebase/auth";
// import { 
//   initializeFirestore, 
//   persistentLocalCache,
//   connectFirestoreEmulator,
//   CACHE_SIZE_UNLIMITED,
//   Firestore,
//   Timestamp,
//   collection,
//   CollectionReference,
//   DocumentData
// } from "firebase/firestore";
// import { 
//   getStorage, 
//   connectStorageEmulator,
//   FirebaseStorage
// } from "firebase/storage";

// // Simplified type definitions
// export type ListingStatus = "available" | "rented" | "unavailable";

// export interface Listing {
//   title: string;
//   description: string;
//   price: number;
//   category: string;
//   location: string;
//   images: string[];
//   status: ListingStatus;
//   userId: string;
//   createdAt: Timestamp;
//   updatedAt: Timestamp;
// }

// // Validate environment variables
// const requiredConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCVRqeijT0smcO455Kz1je_UyVMWFpcQz8",
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "paisa-he-paisa-2ac7d.firebaseapp.com",
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "paisa-he-paisa-2ac7d",
// };

// if (!requiredConfig.apiKey || !requiredConfig.authDomain || !requiredConfig.projectId) {
//   throw new Error("Missing Firebase configuration values");
// }

// const firebaseConfig = {
//   ...requiredConfig,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "paisa-he-paisa-2ac7d.appspot.com",
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "734988355529",
//   appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:734988355529:web:ba871bc4d87bfd09a30a18",
//   measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-K8GL6WMV6P"
// };

// // Initialize Firebase
// const app: FirebaseApp = initializeApp(firebaseConfig);

// // Initialize Auth with persistence
// const auth: Auth = getAuth(app);
// setPersistence(auth, inMemoryPersistence)
//   .catch((error) => {
//     console.error("Error setting auth persistence:", error);
//   });

// // Initialize Firestore
// const db: Firestore = initializeFirestore(app, {
//   localCache: persistentLocalCache({
//     cacheSizeBytes: CACHE_SIZE_UNLIMITED
//   }),
//   ignoreUndefinedProperties: true
// });

// // Initialize Storage
// const storage: FirebaseStorage = getStorage(app);

// // Emulator connections for development
// if (import.meta.env.DEV) {
//   try {
//     // Uncomment to use emulators
//     // connectAuthEmulator(auth, "http://localhost:9099");
//     // connectFirestoreEmulator(db, 'localhost', 8080);
//     // connectStorageEmulator(storage, "localhost", 9199);
//     console.log("Firebase emulators ready to connect (uncomment in firebase.ts)");
//   } catch (error) {
//     console.error("Failed to connect to emulators:", error);
//   }
// }

// // Typed collection reference for listings only
// const listingsCollection = collection(db, "listings") as CollectionReference<Listing>;

// // Auth utility functions
// export const getCurrentUser = (): Promise<User | null> => {
//   return new Promise((resolve, reject) => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       unsubscribe();
//       resolve(user);
//     }, reject);
//   });
// };

// export const serverTimestamp = () => Timestamp.now();

// export { 
//   auth, 
//   db, 
//   storage,
//   app,
//   Timestamp,
//   listingsCollection
// };


// src/Backend/firebase.ts
import { initializeApp, FirebaseApp } from "firebase/app";
import { 
  getAuth, 
  connectAuthEmulator,
  inMemoryPersistence,
  setPersistence,
  Auth,
  User
} from "firebase/auth";
import { 
  initializeFirestore, 
  persistentLocalCache,
  connectFirestoreEmulator,
  CACHE_SIZE_UNLIMITED,
  Firestore,
  Timestamp,
  collection,
  CollectionReference,
  DocumentData
} from "firebase/firestore";
import { 
  getStorage, 
  connectStorageEmulator,
  FirebaseStorage
} from "firebase/storage";

// Type definitions
export type ListingStatus = "available" | "rented" | "unavailable";
export type RentalStatus = "pending" | "confirmed" | "completed" | "cancelled";

export interface Listing {
  title: string;
  description: string;
  price: number;
  category: string;
  location: string;
  images: string[];
  status: ListingStatus;
  userId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Rental {
  listingId: string;
  renterId: string;
  ownerId: string;
  startDate: Timestamp;
  endDate: Timestamp;
  totalPrice: number;
  status: RentalStatus;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

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
const app: FirebaseApp = initializeApp(firebaseConfig);

// Initialize Auth with persistence
const auth: Auth = getAuth(app);
setPersistence(auth, inMemoryPersistence)
  .catch((error) => {
    console.error("Error setting auth persistence:", error);
  });

// Initialize Firestore
const db: Firestore = initializeFirestore(app, {
  localCache: persistentLocalCache({
    cacheSizeBytes: CACHE_SIZE_UNLIMITED
  }),
  ignoreUndefinedProperties: true
});

// Initialize Storage
const storage: FirebaseStorage = getStorage(app);

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

// Typed collection references
const listingsCollection = collection(db, "listings") as CollectionReference<Listing>;
const rentalsCollection = collection(db, "rentals") as CollectionReference<Rental>;

// Auth utility functions
export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};

export const serverTimestamp = () => Timestamp.now();

export { 
  auth, 
  db, 
  storage,
  app,
  Timestamp,
  listingsCollection,
  rentalsCollection
};