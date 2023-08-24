import { storage, db } from "./firebase.js";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-storage.js";

import {
  collection,
  addDoc,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

document.querySelector("input")?.addEventListener("change", (e) => {
  const file = e.target.files[0];

  if (!file.type.startsWith("image")) {
    alert("Only image is allowed");
    return;
  }

  const storageRef = ref(
    storage,
    // Random folder name
    `${Math.random().toString(32).slice(2)}/${file.name}`
  );

  uploadBytes(storageRef, file).then(() => {
    getDownloadURL(storageRef).then((url) => {
      console.log(url);

      addDoc(collection(db, "images"), {
        url,
      });
    });
  });
});

const q = collection(db, "images");
onSnapshot(q, (querySnapshot) => {
  const urls = [];
  querySnapshot.forEach((doc) => {
    urls.push(doc.data().url);
  });

  const grid = document.getElementById("image-grid");
  grid.innerHTML = "";

  for (const url of urls) {
    grid.innerHTML += `<div class="item"><img src="${url}" /></div>`;
  }
});
