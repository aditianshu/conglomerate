import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyArUL5OmWN3k5aRgKTm1HCGNbJOdiyhKoM",
  authDomain: "conglomerate-9eb90.firebaseapp.com",
  projectId: "conglomerate-9eb90",
  storageBucket: "conglomerate-9eb90.appspot.com",
  messagingSenderId: "989502399453",
  appId: "1:989502399453:web:f4fa9f064dbddfe50f0c34",
  measurementId: "G-EXDYC0JSM7"
};
firebase.initializeApp({
  firebaseConfig
})

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();
