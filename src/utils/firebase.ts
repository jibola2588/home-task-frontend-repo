import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAkFh3gqzRBsPGEgoNIHszYcND_5QAkOMk",
    authDomain: "take-home-task-ce8ac.firebaseapp.com",
    projectId: "take-home-task-ce8ac",
    storageBucket: "take-home-task-ce8ac.appspot.com",
    messagingSenderId: "400899819718",
    appId: "1:400899819718:web:abf44396a992222808afc7"
  };
  
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);