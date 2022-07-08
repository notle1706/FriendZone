import firebase from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  addDoc,
  collection,
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import { React, useEffect, useState, useContext, createContext } from "react";

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
export const firestore = getFirestore(app);
export const auth = getAuth(app);

export async function addUser(displayName, email) {
  try {
    const docRef = await setDoc(doc(firestore, "users", email), {
      displayName: displayName,
      email: email,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function setUser(user, param, content) {
  try {
    const docRef = await setDoc(doc(firestore, "users", user), {
      param: content,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function getUserInfo(user) {
  try {
    const docRef = doc(firestore, "users", user);
    const info = await getDoc(docRef);
    const data = info.data();
    return data;
  } catch (e) {
    console.error("Error reading document: ", e);
  }
}

export async function getUserEmail() {
  var email;
  await auth.onAuthStateChanged((user) => {
    if (user) {
      email = user.email;
    } else {
      console.log("user is not logged in");
    }
  });
  return email;
}

export async function setUserInfo(user, info, newInfo) {
  if (newInfo === null) {
    return;
  }
  try {
    const docRef = doc(firestore, "users", user);
    await updateDoc(docRef, { [info]: newInfo });
  } catch (e) {
    console.error("Error changing document: ", e);
  }
}

export async function getPosts() {
  const snapshot = await getDocs(collection(firestore, "posts"));
  return snapshot;
}

export default app;
