// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDR3O9qOMQF_Ufwk_n2QAmaKGF44cnRWU",
  authDomain: "reactnotes-cf096.firebaseapp.com",
  projectId: "reactnotes-cf096",
  storageBucket: "reactnotes-cf096.appspot.com",
  messagingSenderId: "366495632487",
  appId: "1:366495632487:web:b718dee5d66dbfcf7a58c2",
  measurementId: "G-7JE2RHG3ZX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const notesCollection = collection(db, "notes")