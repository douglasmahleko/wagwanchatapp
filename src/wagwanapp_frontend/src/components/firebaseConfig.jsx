import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore, collection } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBktLlVTriIF51o3R-QLAgpegv0OJ5VQ5M",
  authDomain: "wagwan-e49eb.firebaseapp.com",
  projectId: "wagwan-e49eb",
  storageBucket: "wagwan-e49eb.firebasestorage.app",
  messagingSenderId: "342751327087",
  appId: "1:342751327087:web:874bbaa6726d6797002e9a"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)

export const auth = getAuth()

export const storge = getStorage()

export const usersRef = collection(db, 'users')

export const roomsRef = collection(db, 'room')