const input = document.querySelector('#input');
const button = document.getElementById('button');
const IP = document.querySelector("#putIP");
const locations = document.querySelector("#putLocation");
const timezone = document.querySelector("#putTimezone");
const ISP = document.querySelector("#putISP");

input.addEventListener('input', ValueTyped)
button.addEventListener("click", Submit)

let typed;
let response;

function ValueTyped(e) {
    typed = e.target.value;
}

async function getAPI() {
    const request = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_2ntYNcQtGR9tuausMwD7NmNaqFLdq&ipAddress=${typed}`)
    response = await request.json()
    console.log(response)
}

function show(response) {
    IP.textContent = `${response.ip}`
    locations.textContent = `${response.location.city}, ${response.location.country}`
    timezone.textContent = `UTC ${response.location.timezone}`
    ISP.textContent = `${response.isp}`
}

async function Submit() {
    await getAPI()
    show(response)
    setMap()
}

var map = L.map('map').setView([-22.95, -43.21], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

var marker = L.marker([-22.95, -43.21]).addTo(map);

async function setMap(){
    map.setView([`${response.location.lat}`, `${response.location.lng}`], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    map.removeLayer(marker)
    marker = L.marker([`${response.location.lat}`, `${response.location.lng}`]).addTo(map);
}
