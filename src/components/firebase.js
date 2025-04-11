import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAb0dWDYAtJEfnDyGaUSsFOf2cUwn6OjFo",
    authDomain: "cs378-stopwatch.firebaseapp.com",
    databaseURL: "https://cs378-stopwatch-default-rtdb.firebaseio.com",
    projectId: "cs378-stopwatch",
    storageBucket: "cs378-stopwatch.firebasestorage.app",
    messagingSenderId: "297515169806",
    appId: "1:297515169806:web:455498c252804202f5645f",
    measurementId: "G-J3W68HEZP0"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, push };
