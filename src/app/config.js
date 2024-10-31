import { initializeApp } from "firebase/app";
import { getFirestore,getDoc,getDocs,doc,setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Import Firestore

const firebaseconfig = {
  apiKey: "AIzaSyDoum2_3xAC7dLQtQMblJwRMH7te9BuMSM",
  authDomain: "ecommerce-exclusive.firebaseapp.com",
  projectId: "ecommerce-exclusive",
  storageBucket: "ecommerce-exclusive.appspot.com",
  messagingSenderId: "348249102238",
  appId: "1:348249102238:web:33bca282095c105c74688f",
  measurementId: "G-XSL166CVS7",
};

// Initialize Firebase
const app = initializeApp(firebaseconfig);

// Initialize Firestore
const db = getFirestore(app);
const auth = getAuth(app); 

// Export both app and db separately
export { app, db };

export {auth};