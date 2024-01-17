// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA64Yfs_7bNEA7Hj-on7fOnQh9_0PKw65A",
  authDomain: "futa-exam-timetable-gen.firebaseapp.com",
  projectId: "futa-exam-timetable-gen",
  storageBucket: "futa-exam-timetable-gen.appspot.com",
  messagingSenderId: "1087448476336",
  appId: "1:1087448476336:web:9815b12f6b154763f2e975",
  measurementId: "G-Q27HLWQY79",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//const analytics = getAnalytics(app);
const auth = getAuth(app);

export {db, auth};
