// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSJnJTlAa4QkJVCakmyRYW0Jo0dIAjCrg",
  authDomain: "expense-tracker-26a93.firebaseapp.com",
  projectId: "expense-tracker-26a93",
  storageBucket: "expense-tracker-26a93.firebasestorage.app",
  messagingSenderId: "396649627757",
  appId: "1:396649627757:web:48be2f6f6ec65036697f64",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
