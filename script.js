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
    
    // The Leaflet map needs to recalculate its size when it becomes visible again
    if(pageId === 'page-home') setTimeout(() => map.invalidateSize(), 200);
}

// ---------------- MAP INITIALIZATION & BOUNDS ----------------
// Locks the view roughly to India's coordinates
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

// Loading dark mode map tiles
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(map);

// ---------------- HOME PAGE DATA MODELS ----------------
const states = ["Odisha", "Assam", "West Bengal", "Kerala", "Gujarat"];

const stateCoordinates = {
    "Odisha": [20.9517, 85.0985],
    "Assam": [26.2006, 92.9376],
    "West Bengal": [22.9868, 87.8550],
    "Kerala": [10.8505, 76.2711],
    "Gujarat": [22.2587, 71.1924]
};

// Creating the pulsing warning icon
const warningIcon = L.divIcon({
    html: '<i class="fa-solid fa-triangle-exclamation fa-beat" style="color: #ef4444; font-size: 24px; filter: drop-shadow(0px 0px 8px rgba(239, 68, 68, 0.8));"></i>',
    className: 'custom-warning-icon',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12]
});

// Adding markers to the map
states.forEach(stateName => {
    const coords = stateCoordinates[stateName];
    if (coords) {
        L.marker(coords, { icon: warningIcon })
            .addTo(map)
            .bindPopup(`<b style="color: #ef4444;">${stateName}</b><br>Severe Alert Protocol Active`);
    }
});

// Populating the UI panels on the Home Page
function populateHomePage() {
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
}

// Initialize data when the window loads
window.onload = populateHomePage;