// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCx3Q6sTZiPn0jQryNN46X0whxnYV3c4r0",
  authDomain: "foodapp1-a9cb4.firebaseapp.com",
  projectId: "foodapp1-a9cb4",
  storageBucket: "foodapp1-a9cb4.appspot.com",
  messagingSenderId: "854480266435",
  appId: "1:854480266435:web:f4a299a8e59f42a2006e76",
  measurementId: "G-QB8MKESRY0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db= getFirestore(app);
const storage= getStorage(app);
const analytics = getAnalytics(app);

export{db,storage};