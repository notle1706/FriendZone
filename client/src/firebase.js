import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
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
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import {
  ref,
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

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

// Add user information into firestore database, called upon creation of user
export async function addUser(displayName, email) {
  try {
    const docRef = await setDoc(doc(firestore, "users", email), {
      displayName: displayName,
      email: email,
      posts: [],
      modulesTaken: [],
      comments: [],
      profilePicture:
        "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
      friends: [],
      friendReq: [],
      incFriendReq: [],
      unreadMsg: 0,
      likedPosts: [],
      karma: 0,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function likePost(postId, userId) {
  try {
    const userRef = doc(firestore, "users", userId);
    const postRef = doc(firestore, "posts", postId);
    const userInfo = await getDoc(userRef);
    const postInfo = await getDoc(postRef);
    const posterRef =
      postInfo.data().user === "Anonymous"
        ? null
        : doc(firestore, "users", postInfo.data().user);
    const posterInfo =
      postInfo.data().user === "Anonymous" ? null : await getDoc(posterRef);
    const likedPosts = userInfo.data().likedPosts;
    const likeCount = postInfo.data().likeCount;
    const karma =
      postInfo.data().user === "Anonymous" ? null : posterInfo.data().karma;

    if (likedPosts.includes(postId)) {
      await updateDoc(userRef, {
        likedPosts: likedPosts.filter((posts) => posts != postId),
      });
      await updateDoc(postRef, { likeCount: likeCount - 1 });
      if (posterRef) await updateDoc(posterRef, { karma: karma - 1 });
    } else {
      await updateDoc(userRef, {
        likedPosts: [...likedPosts, postId],
      });
      await updateDoc(postRef, { likeCount: likeCount + 1 });
      if (posterRef) await updateDoc(posterRef, { karma: karma + 1 });
    }
  } catch (e) {
    console.error("Error accessing documents" + e);
  }
}

export async function getAllUsers() {
  try {
    const docRef = collection(firestore, "users");
    const info = await getDocs(docRef);
    return info;
  } catch (e) {
    console.error("Error reading document: ", e);
  }
}

// Gets a snapshot of the current user (param user is their email as user id is their email)
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

// Returns email of user currently logged in
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

// Edits the data of the user
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

export async function getPostsFromUser(userPosts, order, dir) {
  const postsRef = collection(firestore, "posts");
  const q = query(postsRef, orderBy(order, dir), where("id", "in", userPosts));
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
      likeCount: 0,
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

export async function updatePostViewcount(id) {
  const docRef = doc(firestore, "posts", id);
  const postInfo = await getDoc(docRef);
  const currviewcount = postInfo.data().viewCount;
  await updateDoc(docRef, { viewCount: currviewcount + 1 });
}

export async function removePost(postId) {
  try {
    const docRef = doc(firestore, "posts", postId);
    await deleteDoc(docRef);
  } catch (e) {
    console.error(e);
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

export async function likeComment(userId, commentId) {
  try {
    const userRef = doc(firestore, "users", userId);
    const commentRef = doc(firestore, "comments", commentId);
    const userInfo = await getDoc(userRef);
    const commentInfo = await getDoc(commentRef);
    const commenterRef =
      commentInfo.data().user === "Anonymous"
        ? null
        : doc(firestore, "users", commentInfo.data().user);
    const commenterInfo =
      commentInfo.data().user === "Anonymous"
        ? null
        : await getDoc(commenterRef);
    const likedComments = userInfo.data().likedComments;
    const likeCount = commentInfo.data().likeCount;
    const karma =
      commentInfo.data().user === "Anonymous"
        ? null
        : commenterInfo.data().karma;

    if (likedComments.includes(commentId)) {
      await updateDoc(userRef, {
        likedComments: likedComments.filter(
          (comments) => comments != commentId
        ),
      });
      await updateDoc(commentRef, { likeCount: likeCount - 1 });
      if (commenterRef) await updateDoc(commenterRef, { karma: karma - 1 });
    } else {
      await updateDoc(userRef, {
        likedComments: [...likedComments, commentId],
      });
      await updateDoc(commentRef, { likeCount: likeCount + 1 });
      if (commenterRef) await updateDoc(commenterRef, { karma: karma + 1 });
    }
  } catch (e) {
    console.error(e);
  }
}

export async function removeComment(commentId) {
  try {
    const docRef = doc(firestore, "comments", commentId);
    await deleteDoc(docRef);
  } catch (e) {
    console.error(e);
  }
}

export async function editPostComment(postId, commentId) {
  try {
    const docRef = doc(firestore, "posts", postId);
    const postInfo = await getPost(postId);
    await updateDoc(docRef, {
      comments: postInfo.comments.filter((comment) => comment != commentId),
    });
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

export async function uploadFiles(file, file_name) {
  if (!file) return;
  const storageRef = ref(storage, `/files/${file_name}`);

  const uploadTask = await uploadBytesResumable(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
}

export async function deleteFiles(file_name) {
  const storageRef = ref(storage, `/files/${file_name}`);
  await deleteObject(storageRef)
    .then(() => {
      console.log("file deleted successfully");
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function sendMessage(text, user1, user2, url) {
  const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
  await addDoc(collection(firestore, "messages", id, "chat"), {
    text,
    from: user1,
    to: user2,
    createdAt: Timestamp.now(),
    media: url || "",
  });
}

export async function updateUnreadCount(user1, user2, count) {
  try {
    const docRef = doc(firestore, "users", user1, "unreadCount", user2);
    await updateDoc(docRef, { unreadCount: count });
  } catch (e) {
    console.error("Error changing document: ", e);
  }
}

export async function getUnreadCount(user1, user2) {
  try {
    const docRef = doc(firestore, "users", user1, "unreadCount", user2);
    const docSnap = await getDoc(docRef);
    return docSnap.data().unreadCount;
  } catch (e) {
    console.error("Error reading document: ", e);
  }
}

export async function createUserNotification(poster, commenter, postId) {
  try {
    const docRef = await addDoc(
      collection(firestore, "users", poster, "notifications"),
      {
        from: commenter,
        to: poster,
        postId: postId,
        createdAt: Timestamp.now(),
      }
    );
    await updateDoc(docRef, { refId: docRef.id });
    return docRef.id;
  } catch (e) {
    console.error("Error changing document: ", e);
  }
}

export async function getNotifications(poster) {
  try {
    const notifRef = collection(firestore, "users", poster, "notifications");
    const q = query(notifRef, orderBy("createdAt", "desc"));
    return q;
  } catch (e) {
    console.error("Error reading document: " + e);
  }
}

export async function removeNotifications(poster, notifId) {
  try {
    await deleteDoc(doc(firestore, "users", poster, "notifications", notifId));
  } catch (e) {
    console.error("Error deleting document: " + e);
  }
}
export default app;
