// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-auth-1d496.firebaseapp.com",
    projectId: "mern-auth-1d496",
    storageBucket: "mern-auth-1d496.firebasestorage.app",
    messagingSenderId: "792532849354",
    appId: "1:792532849354:web:a218caabef69ce4dbd9a33"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
