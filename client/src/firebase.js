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
  Timestamp,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import {
  ref,
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

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

export const storage = getStorage();

export async function addUser(displayName, email) {
  try {
    const docRef = await setDoc(doc(firestore, "users", email), {
      displayName: displayName,
      email: email,
      posts: [],
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

export async function getPosts(order, dir) {
  const postsRef = collection(firestore, "posts");
  const q = query(postsRef, orderBy(order, dir));
  const snapShot = await getDocs(q);
  return snapShot;
}

export async function getPostsByMod(mod, order, dir) {
  const postsRef = collection(firestore, "posts");
  const q = query(postsRef, orderBy(order, dir), where("mod", "==", mod));
  const snapShot = await getDocs(q);
  return snapShot;
}

export async function getPost(postId) {
  try {
    const docRef = doc(firestore, "posts", postId);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    return data;
  } catch (e) {
    console.error(e);
  }
}

export async function getRawPost(postId) {
  try {
    const docRef = doc(firestore, "posts", postId);
    return docRef;
  } catch (e) {
    console.error(e);
  }
}

export async function newPost(user, title, mod, briefDescription, body) {
  try {
    const docRef = await addDoc(collection(firestore, "posts"), {
      title: title,
      mod: mod,
      user: user,
      briefDescription: briefDescription,
      body: body,
      dateCreated: Timestamp.now(),
      likeCout: 0,
      viewCount: 0,
      comments: [],
    });
    console.log("Document written with ID: ", docRef.id);
    await updateDoc(docRef, {
      id: docRef.id,
    });
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function newComment(user, body) {
  try {
    const docRef = await addDoc(collection(firestore, "comments"), {
      user: user,
      body: body,
      dateCreated: Timestamp.now(),
      likeCount: 0,
    });
    console.log("Document written with ID: ", docRef.id);
    updateDoc(docRef, {
      id: docRef.id,
    });
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function getComment(id) {
  try {
    const docRef = doc(firestore, "comments", id);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    return data;
  } catch (e) {
    console.error(e);
  }
}

export function getDate(date) {
  const yyyy = date.getFullYear();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  if (hour < 10) hour = "0" + hour;
  if (minute < 10) minute = "0" + minute;

  return `  ${dd}/${mm}/${yyyy} ${hour}:${minute}`;
}

export async function uploadFiles(file) {
  if (!file) return;
  const storageRef = ref(storage, `/files/${file.name}`);
  const uploadTask = await uploadBytesResumable(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
}

export default app;
