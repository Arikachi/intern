import {locationX} from "./module.js";
//firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getFirestore, doc, collection, getDocs, addDoc, updateDoc, query, where } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

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

let addData = async (favourites) => {
    try {
        const docRef = await addDoc(collection(db, "favourites"), favourites);
        console.log(docRef);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}
localStorage.setItem('exist2', false)
let filterData = async (fieldFilter, condition) => {
    try {
        const q = query(collection(db, "favourites"), where(fieldFilter, "==", condition));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            localStorage.setItem('exist2', true)
        });
    } catch (error) {
        console.log(error);
    }
}
//firebase
//fav
const locationcard = document.querySelector("[data-location-template]")
const container = document.querySelector("[data-container]")
let location = JSON.parse(localStorage.getItem("fav"))
let location2 = []
let location3 = []
location.forEach(item => {
    if(location2.includes(item.name) == false){
        location2.push(item.name)
    }
})
locationX.forEach(location => {
    if(location2.includes(location.name) == true){
        location3.push(location)
    }
})
location3.map(location => {
    const card = locationcard.content.cloneNode(true).children[0]
    const name = card.querySelector("[data-name]")
    const web = card.querySelector("[data-web]")
    const see = card.querySelector("[fav]")
    name.textContent = location.name
    web.textContent = location.website
    see.textContent = location.name
    container.append(card)
    return { name: location.name, web: location.website, element: card }
})
//fav
//favfire
const save = document.querySelector(".save")

const colRef = collection(db, "favourites");
const docsSnap = await getDocs(colRef);

docsSnap.forEach(doc => {
    if(doc.data().name == localStorage.getItem("name")){
        localStorage.setItem("docid", doc.id)
    }
})

const docRef = doc(db, "favourites", localStorage.getItem("docid"));
save.addEventListener("click", async(e) => {
    await e.preventDefault()
    await filterData('name', localStorage.getItem("name"))
    if(localStorage.getItem('exist2') == 'true'){
        let addFAV = {
            favs: location2,
            name: localStorage.getItem("name")
        }
        updateDoc(docRef, addFAV)
        alert("favourite list updated")
    }else{
        let addFAV = {
            favs: location2,
            name: localStorage.getItem("name")
        }
        await addData(addFAV);
        alert("favourite list created")
    }
})
//favfire

document.querySelectorAll('.see').forEach(item => {
    item.addEventListener('click', async(e) => {
        await localStorage.setItem("comment", item.textContent)
        await locationX.forEach(loc => {
            if(loc.name == item.textContent){
                localStorage.setItem("map", loc.map)
            }
        })
        window.location.assign('comment.html')
    })
})
