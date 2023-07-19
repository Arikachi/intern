const locationcard = document.querySelector("[data-location-template]")
const container = document.querySelector("[data-container]")
const search = document.querySelector("[data-search]")

let locations = []

search.addEventListener("input", e => {
    const value = e.target.value
    locations.forEach(location => {
        const isVisible = location.name.includes(value) || location.web.includes(value)
        location.element.classList.toggle("hide", !isVisible)
    })
})

import {locationX} from "./module.js";
locations = locationX.map(location => {
    const card = locationcard.content.cloneNode(true).children[0]
    const name = card.querySelector("[data-name]")
    const web = card.querySelector("[data-web]")
    const btn = card.querySelector("[fav]")
    const btn2 = card.querySelector("[nofav]")
    name.textContent = location.name
    web.textContent = location.website
    btn.classList.add(location.id)
    btn2.classList.add(location.id)
    container.append(card)
    return { name: location.name, web: location.website, element: card }
})

let fav = JSON.parse(localStorage.getItem("fav"))
let location2 = []
// let fav = []
console.log(fav);

fav.forEach(item => {
  if(location2.includes(item.name) == false){
      location2.push(item.name)
  }
})

console.log(location2);

document.querySelectorAll('.fav').forEach(item => {
    item.addEventListener('click', () => {
      locationX.forEach(place => {
        if(item.classList.contains(place.id)){
            if(location2.includes(place.name) == true){
                alert("Item already in favourite list")
            }else{
                fav.push(place)
                alert("added " + place.name + " to favourite list")
            }
        }
      })
      localStorage.setItem("fav", JSON.stringify(fav))
      fav.forEach(item => {
        if(location2.includes(item.name) == false){
            location2.push(item.name)
        }
      })
    })
  })

  document.querySelectorAll('.nofav').forEach(item => {
    item.addEventListener('click', () => {
      locationX.forEach(place => {
        if(item.classList.contains(place.id)){
            if(location2.includes(place.name) == true){
              console.log(fav);
                for(var i = 0; i < fav.length; i++){
                    if (location2[i] === place.name){
                        fav.splice(i, 1)
                        alert("removed " + place.name + " from favourite list")
                    }
                }
                for(var i = 0; i < location2.length; i++){
                  if (location2[i] === place.name){
                      location2.splice(i, 1)
                  }
                }
              console.log(fav);
            }
            else{
              alert("Item not in favourite list")
            }
        }
      })
      localStorage.setItem("fav", JSON.stringify(fav))
      fav.forEach(item => {
        if(location2.includes(item.name) == false){
            location2.push(item.name)
        }
      })
    })
  })