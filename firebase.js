// firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBvuqYexXV0386CA4ANepV2qm8OX6bwaFY",
  authDomain: "cantex-321.firebaseapp.com",
  projectId: "cantex-321",
  storageBucket: "cantex-321.firebasestorage.app",
  messagingSenderId: "214684918281",
  appId: "1:214684918281:web:86a3df74c5c19003380ed8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
