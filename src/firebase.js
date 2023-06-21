import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBYHFiXqntME0qbKo4LZbnFmV3LLZmzaZg",
  authDomain: "wibu-web-app.firebaseapp.com",
  projectId: "wibu-web-app",
  storageBucket: "wibu-web-app.appspot.com",
  messagingSenderId: "224880462235",
  appId: "1:224880462235:web:20ff2c808de154bf72f93e",
  measurementId: "G-0L3KDZR401"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);