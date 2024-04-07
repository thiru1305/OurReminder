import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app';

import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

export const firebaseConfig = {
  apiKey: "AIzaSyA-gyS3ySEdS-jZnkwqEiiS8gDDggB01Pg",
  authDomain: "todo-c9a9c.firebaseapp.com",
  projectId: "todo-c9a9c",
  storageBucket: "todo-c9a9c.appspot.com",
  messagingSenderId: "334749740170",
  appId: "1:334749740170:web:68fe628f474ba2d68c9173",
  measurementId: "G-FB7ESGEPN2"
};


let app;

if (!getApps().length) {
  app = initializeApp(firebaseConfig)
} else {
  app = getApp()
}

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const db = getFirestore(app)
// const auth = getAuth(app)
export { auth, db }

