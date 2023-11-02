// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/compat/app' 
import firebase from "firebase/compat/app"; 
import {getAuth} from "firebase/auth"
import 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBbEHdNKYUZBYegGgNfRGH56Sc4MVkepA",
  authDomain: "netchillin-1d17c.firebaseapp.com",
  projectId: "netchillin-1d17c",
  storageBucket: "netchillin-1d17c.appspot.com",
  messagingSenderId: "296188696271",
  appId: "1:296188696271:web:7907ac178d38ccbe2709ba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)

}

export const auth = getAuth(app);