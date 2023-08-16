const list = document.querySelector("#list")
const filter = document.querySelector("#filter")
let USERS = []

filter.addEventListener("input", (event) => {
    const value = event.target.value.toLowerCase()

    const filteredUsers = USERS.filter(user => {
        return user.name.toLowerCase().includes(value)
    })
    render(filteredUsers)
})

async function start() {
    list.innerHTML = "Loading..."
    try {
        const resp = await fetch("https://jsonplaceholder.typicode.com/users")
        const data = await resp.json()
        USERS = data
        setTimeout(() => {
            render(data)
        }, 2000)
    } catch (e) {
        list.style.color = "red"
        list.innerHTML = e.message
    }
}

function render(users = []) {

    if (users.length === 0) {
        list.innerHTML = "No matched users!"
    } else {
        const html = users.map(toHTML).join("")
        list.innerHTML = html
    }
}

function toHTML(user) {
    return `
    <li class="list-group-item">${user.name}</li>
    `
}

start() 