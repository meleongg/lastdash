// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARgrAAzAFFDPuUdGJxlMQpfKQEjdY6nAU",
  authDomain: "lastdash-d5ba2.firebaseapp.com",
  projectId: "lastdash-d5ba2",
  storageBucket: "lastdash-d5ba2.appspot.com",
  messagingSenderId: "994102302312",
  appId: "1:994102302312:web:9ef6f740249bfbbd794ddd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };