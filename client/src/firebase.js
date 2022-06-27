import firebase from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAv_3evU8sGsA2-N5aaSc5V34BRFQmiH4M",
  authDomain: "friendzone-a76f3.firebaseapp.com",
  projectId: "friendzone-a76f3",
  storageBucket: "friendzone-a76f3.appspot.com",
  messagingSenderId: "66422490184",
  appId: "1:66422490184:web:ff699724e6774892f5047d",
  measurementId: "G-RHLKK70RVK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;
