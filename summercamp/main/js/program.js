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

fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => res.json())
    .then(data => {
        locations = data.map(location => {
            const card = locationcard.content.cloneNode(true).children[0]
            const name = card.querySelector("[data-name]")
            const web = card.querySelector("[data-web]")
            name.textContent = location.name
            web.textContent = location.website
            container.append(card)
            return { name: location.name, web: location.website, element: card }
        })
    })