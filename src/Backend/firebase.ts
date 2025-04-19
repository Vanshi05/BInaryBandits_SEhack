import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCVRqeijT0smcO455Kz1je_UyVMWFpcQz8",
  authDomain: "paisa-he-paisa-2ac7d.firebaseapp.com",
  projectId: "paisa-he-paisa-2ac7d",
  storageBucket: "paisa-he-paisa-2ac7d.firebasestorage.app",
  messagingSenderId: "734988355529",
  appId: "1:734988355529:web:ba871bc4d87bfd09a30a18",
  measurementId: "G-K8GL6WMV6P"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

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