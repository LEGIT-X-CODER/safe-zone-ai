// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-EpUBnsmvRrZxAbjn87p1-3Os2Cmlf6M",
  authDomain: "bitnbuilt.firebaseapp.com",
  projectId: "bitnbuilt",
  storageBucket: "bitnbuilt.firebasestorage.app",
  messagingSenderId: "918640008934",
  appId: "1:918640008934:web:ccfd512fb6c48d7528a527",
  measurementId: "G-4DTT96QN46"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics (only in browser environment)
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { analytics };

// Connect to emulators in development
if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
  // Uncomment these if you want to use Firebase emulators
  // connectAuthEmulator(auth, "http://localhost:9099");
  // connectFirestoreEmulator(db, "localhost", 8080);
  // connectStorageEmulator(storage, "localhost", 9199);
}