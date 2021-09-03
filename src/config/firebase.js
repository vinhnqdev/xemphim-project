// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDvQEe5WCvYwn4_QAwz4fPOWRGubrJYyBA",
  authDomain: "xemphim-project.firebaseapp.com",
  projectId: "xemphim-project",
  storageBucket: "xemphim-project.appspot.com",
  messagingSenderId: "405485300694",
  appId: "1:405485300694:web:4044b2d09979e2c1f01277",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = getFirestore();
export default firebase;
