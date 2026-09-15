import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Firebase Configuration
// ⚠️ IMPORTANT: Replace these values with your Firebase project config
// Get your config from: https://console.firebase.google.com/
const firebaseConfig = {
  apiKey: "AIzaSyDummyKeyForGoogleAuth",
  authDomain: "smoke-city-879616245300.firebaseapp.com",
  projectId: "smoke-city-879616245300",
  storageBucket: "smoke-city-879616245300.appspot.com",
  messagingSenderId: "879616245300",
  appId: "1:879616245300:web:dummyapp"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore Database
export const db = getFirestore(app);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Check if Firebase is configured
export const isFirebaseConfigured = () => {
  return firebaseConfig.apiKey !== "YOUR_API_KEY" && firebaseConfig.apiKey !== "AIzaSyDummyKeyForGoogleAuth";
};

export default app;
