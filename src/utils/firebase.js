import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCRGtLBlnoQZLc-CRaF1M6Uf-n5Rfg0JnM",
  authDomain: "pokedex-4c0b8.firebaseapp.com",
  projectId: "pokedex-4c0b8",
  storageBucket: "pokedex-4c0b8.firebasestorage.app",
  messagingSenderId: "320059352556",
  appId: "1:320059352556:web:8e98210135e218ecd64cc9",
  measurementId: "G-8TE099EEYW"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(); // Add Google provider
export const db = getFirestore(app);
export default app;