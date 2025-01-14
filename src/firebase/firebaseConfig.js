import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
const firebaseConfig = {
  apiKey: "AIzaSyDK0VcKe_2dMACXF13bHnBk1oToqjBb3a4",
  authDomain: "exam-test-75df1.firebaseapp.com",
  projectId: "exam-test-75df1",
  storageBucket: "exam-test-75df1.appspot.com",
  messagingSenderId: "738193564826",
  appId: "1:738193564826:web:8c3f8aa5f5e49e2144eb23",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
