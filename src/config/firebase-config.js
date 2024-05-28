
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from '@firebase/firestore'
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFjK92eaOWd5f2Aj1U5enbOHuIZ3WKEew",
  authDomain: "site-see-32c16.firebaseapp.com",
  projectId: "site-see-32c16",
  storageBucket: "site-see-32c16.appspot.com",
  messagingSenderId: "236456769546",
  appId: "1:236456769546:web:2cd2457c195e143f6d07f3",
  measurementId: "G-E8LEDGGJTD"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth()
const storage = getStorage(app)
export {db,auth,storage}
const analytics = getAnalytics(app);