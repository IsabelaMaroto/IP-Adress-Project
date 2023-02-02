const input = document.querySelector('#input');
const button = document.getElementById('button');
const IP = document.querySelector("#putIP");
const locations = document.querySelector("#putLocation");
const postalCode = document.querySelector("#putPostalCode");
const timezone = document.querySelector("#putTimezone");
const ISP = document.querySelector("#putISP");

input.addEventListener('input', ValueTyped)
button.addEventListener("click", Submit)

input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        button.click();
    }
});

let typed = "57.74.3.0";
let response;
let map;
let marker;
let Icon;

function ValueTyped(e) {
    typed = e.target.value;
}

async function getAPI(e) {
    const request = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_2ntYNcQtGR9tuausMwD7NmNaqFLdq&ipAddress=${e}`)
    response = await request.json()
    console.log(response)
}

function show(response) {
    IP.textContent = `${response.ip}`
    locations.textContent = `${response.location.city}, ${response.location.country}`
    postalCode.textContent = `${response.location.postalCode}`
    timezone.textContent = `UTC ${response.location.timezone}`
    ISP.textContent = `${response.isp}`
}

async function Submit() {
    await getAPI(typed)
    show(response)
    setMap()
}


async function setMap() {
    map.setView([`${response.location.lat}`, `${response.location.lng}`], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    map.removeLayer(marker)
    marker = L.marker([`${response.location.lat}`, `${response.location.lng}`], { icon: Icon }).addTo(map);
}

async function init() {
    await getAPI(typed)
    show(response)

    map = L.map('map').setView([-23.5475, -46.63611], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    Icon = L.icon({
        iconUrl: './assets/images/icon-location.svg',

        iconSize: [38, 50], // size of the icon
        iconAnchor: [19, 50], // point of the icon which will correspond to marker's location
    });

    marker = L.marker([-23.5475, -46.63611], { icon: Icon }).addTo(map);

}

init()