import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/storage";

const config = {
  apiKey: "AIzaSyApJZgKTOTxaBWSZ5Byuk5Jf9gLwLC6e5o",
  authDomain: "chatbox-51684.firebaseapp.com",
  projectId: "chatbox-51684",
  storageBucket: "chatbox-51684.appspot.com",
  messagingSenderId: "590768763027",
  appId: "1:590768763027:web:21261ea9eea6caa7159d66",
};

const app = firebase.initializeApp(config);

export const auth = app.auth();
// it will give u interaction with our firebase..

export const database = app.database();
export const storage = app.storage();
