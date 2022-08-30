import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBcuKbJbVl5Gj4mDunpI79snWEtGrFC4rI",
  authDomain: "disne-d6269.firebaseapp.com",
  projectId: "disne-d6269",
  storageBucket: "disne-d6269.appspot.com",
  messagingSenderId: "1034275473964",
  appId: "1:1034275473964:web:4a3fee95c3b16e4522df89",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const storage = getStorage(firebaseApp);

export { auth, provider, storage };
export default db;
