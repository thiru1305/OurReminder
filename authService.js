import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { app } from './firebase';
import { Alert } from 'react-native';

const authService = {
  register: async (email, password, fullName) => {
    try {
      const auth = getAuth(app);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Update user profile if you want to set the user's full name
      await updateProfile(auth.currentUser, { displayName: fullName });
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  },
  login: async (email, password) => {
    try {
      const auth = getAuth(app);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  },
  logout: async () => {
    try {
      const auth = getAuth(app);
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  },
  getCurrentUser: () => {
    return new Promise((resolve, reject) => {
      const auth = getAuth(app);
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe();
        resolve(user);
      }, reject);
    });
  },
  reset: async (email) => {
    try {
      const auth = getAuth(app);
      await sendPasswordResetEmail(auth, email);
      
    } catch (error) {
      throw error;
    }
  },
};

export default authService;
