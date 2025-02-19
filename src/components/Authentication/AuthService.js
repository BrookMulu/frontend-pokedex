import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
  } from "firebase/auth";

import { doc, getDoc } from "firebase/firestore";
import { auth, db, googleProvider } from '@/utils/firebase'
  
  // Register a new user
  export const registerWithEmail = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error("Error during registration:", error);
      throw error;
    }
  };
  
  // Log in with email and password
  export const loginWithEmail = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };

  export const loginWithUsernameOrEmail = async (identifier, password) => {
    try {
      let email = identifier;
  
      // Check if the identifier is a username and fetch email
      const userDoc = await getDoc(doc(db, "usernames", identifier));
      if (userDoc.exists()) {
        email = userDoc.data().email;
      }
  
      // Sign in using email
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };
  
  // Log in with Google
  export const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (error) {
      console.error("Error during Google login:", error);
      throw error;
    }
  };
  
  // Log out
  export const logout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Error during logout:", error);
      throw error;
    }
  };
  