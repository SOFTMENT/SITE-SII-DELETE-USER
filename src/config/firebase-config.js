
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
  apiKey: "AIzaSyB1woThXs8eGaLHgp9sYrDl_xCyrophciM",
  authDomain: "mind-motivations.firebaseapp.com",
  projectId: "mind-motivations",
  storageBucket: "mind-motivations.appspot.com",
  messagingSenderId: "810309957942",
  appId: "1:810309957942:web:3fea6b4e789b252c451b97",
  measurementId: "G-R8RWZY16FS"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth()
const storage = getStorage(app)
export {db,auth,storage}
const analytics = getAnalytics(app);