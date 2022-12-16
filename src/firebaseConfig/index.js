// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8htZotxxqHJbNx64Ubj16fNbc78Fe2yg",
  authDomain: "work-place-nov-62390.firebaseapp.com",
  projectId: "work-place-nov-62390",
  storageBucket: "work-place-nov-62390.appspot.com",
  messagingSenderId: "324551295978",
  appId: "1:324551295978:web:ed37aa060647c1f7aea893"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);