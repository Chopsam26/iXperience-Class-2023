// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjeMkaTy3iscwtcPd06bJ2tzTDuoocFdM",
  authDomain: "task-list-s2-e820f.firebaseapp.com",
  projectId: "task-list-s2-e820f",
  storageBucket: "task-list-s2-e820f.appspot.com",
  messagingSenderId: "670923824676",
  appId: "1:670923824676:web:0849105bf4d32f51ff02b1"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };