import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyB6cjMQ7tI1C-3TFByG8N_ZOzbm7StCF78",
  authDomain: "disney-clone-71087.firebaseapp.com",
  projectId: "disney-clone-71087",
  storageBucket: "disneyplus-clone-a33d5.appspot.com",
  messagingSenderId: "37918794208",
  appId: "1:37918794208:web:dbe9842dfe1dda522a4b85",
  measurementId: "G-DRVLJKWRWG",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
