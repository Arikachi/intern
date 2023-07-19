import {locationX} from "./module.js";

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
    name.textContent = location.name
    web.textContent = location.website
    container.append(card)
    return { name: location.name, web: location.website, element: card }
})
