import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const FirebaseStack = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyA4X9OXKw-2APCkHJHdPiLdFt3bjUjIXrI",
    authDomain: "raseed-f0cb2.firebaseapp.com",
    projectId: "raseed-f0cb2",
    storageBucket: "raseed-f0cb2.appspot.com",
    messagingSenderId: "179294100026",
    appId: "1:179294100026:web:1d6a613aa5cc50a9e43303",
    measurementId: "G-F1W5FCDL0L",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  return  getDatabase(app);
};

export default FirebaseStack;
