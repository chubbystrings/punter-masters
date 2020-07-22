import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.VUE_APP_APIKEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECTID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDERID,
  appId: process.env.VUE_APP_APPID,
  measurementId: process.env.VUE_APP_MESUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();

// collection references
const usersCollection = db.collection('users');
const postsCollection = db.collection('posts');
const forumsCollection = db.collection('forums');
const commentsCollection = db.collection('comments');
const likesCollection = db.collection('likes');
const chatsCollection = db.collection('chats');
const codesCollection = db.collection('codes');
const notificationCollection = db.collection('notification');

// export utils/refs
export {
  db,
  auth,
  usersCollection,
  postsCollection,
  forumsCollection,
  commentsCollection,
  likesCollection,
  chatsCollection,
  codesCollection,
  notificationCollection,
};
