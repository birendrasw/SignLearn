// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXbGmjvpmEsUT4b-kuvmHvfoG-sFnsCK4",
  authDomain: "signlearn-9f6af.firebaseapp.com",
  projectId: "signlearn-9f6af",
  storageBucket: "signlearn-9f6af.firebasestorage.app",
  messagingSenderId: "31900044387",
  appId: "1:31900044387:web:1e6c68abd9f30daad93c56",
  measurementId: "G-VW59167TY0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);