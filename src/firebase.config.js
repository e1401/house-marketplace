
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOrv7iw83sj3AURqzPCnpCKMRZL5pMf08",
  authDomain: "house-marketplace-app-6ea51.firebaseapp.com",
  projectId: "house-marketplace-app-6ea51",
  storageBucket: "house-marketplace-app-6ea51.appspot.com",
  messagingSenderId: "502950039085",
  appId: "1:502950039085:web:d4cce8425ac500e1d5b2a4"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();