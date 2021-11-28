import 'firebase/compat/auth';
import firebaseConfig from './firebaseConfig';
import 'firebase/compat/firestore'
import { runTransaction } from "firebase/firestore";
import firebase from 'firebase/compat/app';
const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();


const signInWithEmailAndPassword = async (email, password) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  
  const registerWithEmailAndPassword = async (name, email, password, role) => {
    try {
      const res = await auth.createUserWithEmailAndPassword(email, password);
      const user = res.user;
      await db.collection("users").add({
        uid: user.uid,
        name,
        role,
        authProvider: "local",
        email,
      });
      
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const addComment = async (teamCode, unit, blogID, authorName, commentText) => {
    try {
      const blogRef = db.collection('teams').doc(teamCode).collection('units').doc(unit);
      const newComments = await runTransaction(db, async (transaction) => {
        const sfDoc = await transaction.get(blogRef);
        if (!sfDoc.exists()) {
          throw "Document does not exist!";
        }
          const comment = {
              authorName : authorName,
              commentText : commentText,
          }
        const newPop = sfDoc.data().forums
        newPop.forEach((item, index) => {
            if(index == blogID){
              item.comments.push(comment);
            }
        })
        console.log(newPop);
        transaction.update(blogRef, {forums : newPop});
      });
    } catch (err) {
      console.error(err);
    }
  }

  const addBlog = async(teamCode, unit, blog) => {
    console.log(teamCode, unit, blog)
    try {
      const blogRef = db.collection('teams').doc(teamCode).collection('units').doc(unit);
      const newComments = await runTransaction(db, async (transaction) => {
        const sfDoc = await transaction.get(blogRef);
        if (!sfDoc.exists()) {
          throw "Document does not exist!";
        }
        
        const newPop = sfDoc.data().forums;
        newPop.push(blog);
        console.log(newPop);
        transaction.update(blogRef, {forums : newPop});
      });
    } catch (err) {
      console.error(err);
    }
  }

  export {
    auth,
    db,
    signInWithEmailAndPassword,
    registerWithEmailAndPassword,
    addComment,
    addBlog
  };