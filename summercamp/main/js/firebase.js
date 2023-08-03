import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCEp2_C6ZjW1fGtonVuEZGU5rTrvTdK2nQ",
  authDomain: "jsi018.firebaseapp.com",
  projectId: "jsi018",
  storageBucket: "jsi018.appspot.com",
  messagingSenderId: "800952059305",
  appId: "1:800952059305:web:b5f84163d797804b10b0b8",
  measurementId: "G-S05WY9E9SG"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
