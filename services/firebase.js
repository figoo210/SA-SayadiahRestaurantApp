// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDzhqiLMNbkVTHdZUXZoz3Ql-HEpeYRE6c",
    authDomain: "sayyadiyah-restaurants.firebaseapp.com",
    projectId: "sayyadiyah-restaurants",
    storageBucket: "sayyadiyah-restaurants.appspot.com",
    messagingSenderId: "406332685178",
    appId: "1:406332685178:web:809df7cb8bd9726d4bb4c3",
    measurementId: "G-M21GTMZTX4"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const app = firebase.initializeApp(firebaseConfig);

// Auth
export const auth = app.auth();

// Database
export const db = app.firestore();
