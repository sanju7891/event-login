import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
 
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDmmPrwy6U12gtOqZR2xfC0oHmr3rMY6XY",
    authDomain: "event-app-af85c.firebaseapp.com",
    projectId: "event-app-af85c",
    storageBucket: "event-app-af85c.appspot.com",
    messagingSenderId: "745935819509",
    appId: "1:745935819509:web:02527f84c9b7070c44ebbc"
  };

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);