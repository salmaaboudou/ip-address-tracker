const form = document.querySelector("form");
let searchBar = document.querySelector('.search-bar');
let submitButton = document.querySelector('.submit-button');
const results = document.querySelectorAll(".result");

function placeholder(){
    L.marker([34.04915, -118.09462], { icon: icon }).addTo(map);
    //  map.setView([34.04915, -118.09462], 13);
   results[0].innerHTML = "192.212.174.101";
   results[1].innerHTML = "South San Gabriel, California";
   results[2].innerHTML = "UTC-07:00";
   results[3].innerHTML = "Southern California Edison";
};


//Function that checks if a value has been entered.
function getData() {
    if (searchBar.value !== "") {
      geolocation();
    }
    searchBar.value = "";
};

// fetch API function

function geolocation() {
    let address = searchBar.value ; 
    fetch("https://geo.ipify.org/api/v2/country,city?apiKey=at_vRnCPaGUfMy4gJ7SLj4KEzJZbZoD3&ipAddress=" + address)
        .then((response) => {
            if (response.status == 200 ){
            return response.json();
            } 
            else{
                throw Error(response.statusText);
            }
        })
        .then((data) => {
            console.log(data);
            const postalCode = data.location.postalCode;
            const ip = data.ip;
            const location = data.location.city;
            const region = data.location.region;
            const timezone = data.location.timezone;
            const isp = data.isp;
            const longitude = data.location.lng;
            const latitude = data.location.lat;

            L.marker([latitude, longitude], { icon: icon }).addTo(map);
            map.setView([latitude, longitude], 13);
            results[0].innerHTML = address;
            results[1].innerHTML = `${location}, ${region} ${postalCode}`;
            results[2].innerHTML = `UTC${timezone}`;
            results[3].innerHTML = isp;
        })
        .catch(() => {
            alert("Une erreur est survenue");
            results.forEach(element => {
                element.innerHTML = "";
            })
             
        });

};

form.addEventListener("submit", (e) =>{
    e.preventDefault();
    getData();
});

// Marker design
let icon = L.icon({
    iconUrl: "images/icon-location.svg",
});

// Map generator 
let map = L.map("map")
map.setView([34.04915, -118.09462], 13);
placeholder()


L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:'© OpenStreetMap',
}).addTo(map);















