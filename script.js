// CLOCK ENGINE
setInterval(() => {
    document.getElementById('live-clock').innerText = new Date().toLocaleTimeString('en-IN');
}, 1000);

// NAVIGATION SPA LOGIC
function showPage(pageId, el) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    el.classList.add('active');
    
    if(pageId === 'page-home') setTimeout(() => map.invalidateSize(), 200);
}

// ---------------- MAP INITIALIZATION & BOUNDS ----------------
const indiaBounds = [
    [6.5546079, 68.1113787], 
    [35.6745457, 97.395561]  
];

const map = L.map('map', {
    zoomControl: false,
    maxBounds: indiaBounds,
    maxBoundsViscosity: 1.0,
    minZoom: 4
}).setView([20.5937, 78.9629], 5);

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(map);

// ---------------- DATA MODELS ----------------
const states = ["Odisha", "Assam", "West Bengal", "Kerala", "Gujarat"];

const stateCoordinates = {
    "Odisha": [20.9517, 85.0985],
    "Assam": [26.2006, 92.9376],
    "West Bengal": [22.9868, 87.8550],
    "Kerala": [10.8505, 76.2711],
    "Gujarat": [22.2587, 71.1924]
};

// COMMIT 3: Weather Data Array
const weatherData = [
    { name: "Andhra Pradesh", temp: 21, rain: 15, wind: "14 km/h", pattern: "Easterly", hum: "60%", vis: "8km", aqi: 72 },
    { name: "Arunachal Pradesh", temp: 19, rain: 45, wind: "10 km/h", pattern: "Mountain Breeze", hum: "80%", vis: "4km", aqi: 32 },
    { name: "Assam", temp: 24, rain: 88, wind: "18 km/h", pattern: "NE Monsoon", hum: "92%", vis: "2km", aqi: 48 },
    { name: "Bihar", temp: 26, rain: 10, wind: "8 km/h", pattern: "Variable", hum: "65%", vis: "5km", aqi: 195 },
    { name: "Chhattisgarh", temp: 29, rain: 5, wind: "12 km/h", pattern: "Calm", hum: "55%", vis: "7km", aqi: 110 },
    { name: "Goa", temp: 31, rain: 0, wind: "15 km/h", pattern: "Coastal Breeze", hum: "65%", vis: "10km", aqi: 45 },
    { name: "Gujarat", temp: 34, rain: 0, wind: "20 km/h", pattern: "North-Westerly", hum: "45%", vis: "10km", aqi: 110 },
    { name: "Haryana", temp: 27, rain: 2, wind: "10 km/h", pattern: "Westerly", hum: "40%", vis: "3km", aqi: 280 },
    { name: "Himachal Pradesh", temp: 12, rain: 30, wind: "8 km/h", pattern: "Mountainous", hum: "50%", vis: "6km", aqi: 40 },
    { name: "Jharkhand", temp: 27, rain: 10, wind: "12 km/h", pattern: "Easterly", hum: "55%", vis: "7km", aqi: 130 },
    { name: "Karnataka", temp: 30, rain: 5, wind: "16 km/h", pattern: "Westerly", hum: "60%", vis: "9km", aqi: 85 },
    { name: "Kerala", temp: 30, rain: 65, wind: "22 km/h", pattern: "SW Current", hum: "85%", vis: "6km", aqi: 42 },
    { name: "Madhya Pradesh", temp: 31, rain: 0, wind: "12 km/h", pattern: "Variable", hum: "40%", vis: "8km", aqi: 125 },
    { name: "Maharashtra", temp: 32, rain: 5, wind: "15 km/h", pattern: "Coastal Breeze", hum: "55%", vis: "9km", aqi: 105 },
    { name: "Manipur", temp: 22, rain: 40, wind: "10 km/h", pattern: "Easterly", hum: "75%", vis: "5km", aqi: 55 },
    { name: "Meghalaya", temp: 20, rain: 70, wind: "14 km/h", pattern: "NE Trades", hum: "90%", vis: "3km", aqi: 38 },
    { name: "Mizoram", temp: 21, rain: 35, wind: "12 km/h", pattern: "Variable", hum: "80%", vis: "5km", aqi: 44 },
    { name: "Nagaland", temp: 19, rain: 50, wind: "10 km/h", pattern: "Mountainous", hum: "82%", vis: "4km", aqi: 50 },
    { name: "Odisha", temp: 30, rain: 20, wind: "18 km/h", pattern: "Cyclonic", hum: "78%", vis: "6km", aqi: 70 },
    { name: "Punjab", temp: 26, rain: 5, wind: "12 km/h", pattern: "Westerly", hum: "45%", vis: "4km", aqi: 210 },
    { name: "Rajasthan", temp: 35, rain: 0, wind: "22 km/h", pattern: "Dry Westerly", hum: "25%", vis: "10km", aqi: 150 },
    { name: "Sikkim", temp: 10, rain: 55, wind: "8 km/h", pattern: "Himalayan", hum: "88%", vis: "2km", aqi: 30 },
    { name: "Tamil Nadu", temp: 33, rain: 20, wind: "16 km/h", pattern: "NE Trades", hum: "70%", vis: "8km", aqi: 88 },
    { name: "Telangana", temp: 32, rain: 5, wind: "14 km/h", pattern: "Easterly", hum: "50%", vis: "9km", aqi: 92 },
    { name: "Tripura", temp: 25, rain: 50, wind: "12 km/h", pattern: "Variable", hum: "80%", vis: "5km", aqi: 62 },
    { name: "Uttar Pradesh", temp: 27, rain: 8, wind: "10 km/h", pattern: "Calm", hum: "50%", vis: "3km", aqi: 240 },
    { name: "Uttarakhand", temp: 14, rain: 25, wind: "12 km/h", pattern: "Valley Breeze", hum: "60%", vis: "5km", aqi: 80 },
    { name: "West Bengal", temp: 28, rain: 15, wind: "14 km/h", pattern: "Nor'wester", hum: "75%", vis: "7km", aqi: 145 },
    { name: "Delhi (NCT)", temp: 28, rain: 2, wind: "12 km/h", pattern: "Westerly", hum: "40%", vis: "1.5km", aqi: 340 }
];

const warningIcon = L.divIcon({
    html: '<i class="fa-solid fa-triangle-exclamation fa-beat" style="color: #ef4444; font-size: 24px; filter: drop-shadow(0px 0px 8px rgba(239, 68, 68, 0.8));"></i>',
    className: 'custom-warning-icon',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12]
});

states.forEach(stateName => {
    const coords = stateCoordinates[stateName];
    if (coords) {
        L.marker(coords, { icon: warningIcon })
            .addTo(map)
            .bindPopup(`<b style="color: #ef4444;">${stateName}</b><br>Severe Alert Protocol Active`);
    }
});

// COMMIT 3: Function to generate table rows dynamically
function populateWeatherTable() {
    const tableBody = document.getElementById('weather-body');
    if(!tableBody) return;
    tableBody.innerHTML = ''; 
    
    // Sort states alphabetically
    const sortedData = [...weatherData].sort((a, b) => a.name.localeCompare(b.name));
    
    sortedData.forEach(s => {
        // Determine pill color based on AQI value
        let aqiClass = s.aqi <= 100 ? 'aqi-good' : (s.aqi <= 200 ? 'aqi-mod' : 'aqi-poor');
        // Highlight high rain percentages in red
        let rainColor = s.rain > 50 ? 'var(--danger)' : 'white';
        
        tableBody.innerHTML += `
            <tr>
                <td><b>${s.name}</b></td>
                <td>${s.temp}°C</td>
                <td style="color:${rainColor}; font-weight:bold;">${s.rain}%</td>
                <td>${s.wind}</td>
                <td style="font-size:0.75rem; color:var(--accent)">${s.pattern}</td>
                <td>${s.hum}</td>
                <td>${s.vis}</td>
                <td><span class="aqi-pill ${aqiClass}">${s.aqi}</span></td>
            </tr>`;
    });
}

// Unified function to populate all UI elements when the page loads
function populateUI() {
    // Populate Home Page Elements
    const list = document.getElementById('state-list');
    const feed = document.getElementById('incident-feed');

    states.forEach(s => {
        list.innerHTML += `<div class="state-card"><b>${s}</b>: Severe Alert Protocol Active</div>`;
    });

    feed.innerHTML = `
        <div class="state-card" style="border-left-color:var(--danger)"><b>URGENT:</b> Severe Cyclonic Storm approaching coast within 24hrs.</div>
        <div class="state-card"><b>NOTICE:</b> Brahmaputra water levels rising rapidly at Dibrugarh.</div>
        <div class="state-card" style="border-left-color:var(--warning)"><b>ALERT:</b> High tide and storm surge warning issued for coastal districts.</div>
    `;

    // Populate Weather Page Elements
    populateWeatherTable();
}

window.onload = populateUI;
