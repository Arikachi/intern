import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, query, where } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCEp2_C6ZjW1fGtonVuEZGU5rTrvTdK2nQ",
  authDomain: "jsi018.firebaseapp.com",
  projectId: "jsi018",
  storageBucket: "jsi018.appspot.com",
  messagingSenderId: "800952059305",
  appId: "1:800952059305:web:b5f84163d797804b10b0b8",
  measurementId: "G-S05WY9E9SG"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const btn_com = document.querySelector(".comment")
const name = document.querySelector(".name")
name.textContent = localStorage.getItem("comment")
const container = document.querySelector(".commentdisplay")
const comment = document.querySelector(".commentdisplay")

const csholder = document.querySelector("[comment-section]")
const commentsection = csholder.content.cloneNode(true).children[0]
const com = commentsection.querySelector("[com]")

let addData = async (signin) => {
  try {
      const docRef = await addDoc(collection(db, name.textContent), signin);
      console.log(docRef);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
}

btn_com.addEventListener("click", async() => {
    let loc = name.innerHTML
    var colRef = collection(db, loc);
    var docsSnap = await getDocs(colRef);
    await docsSnap.forEach(doc => {
        var id = doc.data().name
        var cs1 = document.createElement("div")
        cs1.classList.add('cs')
        cs1.textContent = doc.data().name + ": " + doc.data().comment
        com.append(cs1)
        container.append(commentsection)

        btn_com.classList.add('hide')
    })
    const add = document.querySelector('.addcomment')
    const my = document.querySelector('.mycomment')
    add.addEventListener('click', async() => {
      if (my.value == ''){
        alert("please write a comment")
      }else{
        let commu = {
          comment: my.value,
          name: localStorage.getItem('nickname')
        }
        await addData(commu);
        await alert('thank you for your comment')
        window.location.assign('staff.html')
      }
    })
})