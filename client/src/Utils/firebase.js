import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "oriana-ai.firebaseapp.com",
  projectId: "oriana-ai",
  storageBucket: "oriana-ai.firebasestorage.app",
  messagingSenderId: "726310760371",
  appId: "1:726310760371:web:4c7091d564f410f5f1a5c6"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth, provider}