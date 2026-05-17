import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBFFeIl74Gin3-7jpBPDaBSL--zLB0Rifg",
  authDomain: "family-tracker-171ab.firebaseapp.com",
  projectId: "family-tracker-171ab",
  storageBucket: "family-tracker-171ab.firebasestorage.app",
  messagingSenderId: "662215604567",
  appId: "1:662215604567:web:734f1d4e440ab984b52612"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
