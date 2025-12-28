// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_APIKEY ,
  authDomain: "loginvirtualcourses-27134.firebaseapp.com",
  projectId: "loginvirtualcourses-27134",
  storageBucket: "loginvirtualcourses-27134.firebasestorage.app",
  messagingSenderId: "777493886426",
  appId: "1:777493886426:web:134b77e3ecab690cc73ce3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

 const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth,provider}