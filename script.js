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
    if(pageId === 'page-analytics') initCharts();
}

// ---------------- MAP INITIALIZATION & BOUNDS ----------------
const indiaBounds = [ [6.5546079, 68.1113787], [35.6745457, 97.395561] ];
const map = L.map('map', { zoomControl: false, maxBounds: indiaBounds, maxBoundsViscosity: 1.0, minZoom: 4 }).setView([20.5937, 78.9629], 5);
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(map);

// ---------------- DATA MODELS ----------------
const states = ["Odisha", "Assam", "West Bengal", "Kerala", "Gujarat"];
const stateCoordinates = { "Odisha": [20.9517, 85.0985], "Assam": [26.2006, 92.9376], "West Bengal": [22.9868, 87.8550], "Kerala": [10.8505, 76.2711], "Gujarat": [22.2587, 71.1924] };

// RESTORED: Full 36 States/UTs Weather Data
const weatherData = [
    { name: "Andhra Pradesh", temp: 31, rain: 15, wind: "14 km/h", pattern: "Easterly", hum: "60%", vis: "8km", aqi: 72 },
    { name: "Arunachal Pradesh", temp: 18, rain: 45, wind: "10 km/h", pattern: "Mountain Breeze", hum: "80%", vis: "4km", aqi: 32 },
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
    { name: "Andaman & Nicobar", temp: 29, rain: 60, wind: "25 km/h", pattern: "Tropical", hum: "85%", vis: "8km", aqi: 25 },
    { name: "Chandigarh", temp: 26, rain: 5, wind: "10 km/h", pattern: "Westerly", hum: "40%", vis: "5km", aqi: 160 },
    { name: "D&N Haveli and Daman & Diu", temp: 30, rain: 0, wind: "15 km/h", pattern: "Coastal", hum: "50%", vis: "10km", aqi: 95 },
    { name: "Delhi (NCT)", temp: 28, rain: 2, wind: "12 km/h", pattern: "Westerly", hum: "40%", vis: "1.5km", aqi: 340 },
    { name: "Jammu & Kashmir", temp: 8, rain: 40, wind: "10 km/h", pattern: "Cold Wave", hum: "70%", vis: "4km", aqi: 65 },
    { name: "Ladakh", temp: -2, rain: 10, wind: "20 km/h", pattern: "High Altitude", hum: "30%", vis: "10km", aqi: 20 },
    { name: "Lakshadweep", temp: 30, rain: 20, wind: "18 km/h", pattern: "Marine", hum: "80%", vis: "10km", aqi: 30 },
    { name: "Puducherry", temp: 32, rain: 15, wind: "14 km/h", pattern: "Easterly", hum: "70%", vis: "9km", aqi: 60 }
];

const zonalRescueData = [
    { zone: "North India", teams: 12, evacuated: "1,200", camps: 15, assets: 12, risk: "Medium" },
    { zone: "South India", teams: 8, evacuated: "4,500", camps: 28, assets: 18, risk: "High" },
    { zone: "East India", teams: 15, evacuated: "6,100", camps: 32, assets: 24, risk: "Critical" },
    { zone: "West India", teams: 4, evacuated: "450", camps: 5, assets: 6, risk: "Low" },
    { zone: "Central India", teams: 3, evacuated: "230", camps: 5, assets: 4, risk: "Low" }
];

// RESTORED: Full 36 States/UTs Directory Data
const allStateContacts = [
    ["Andhra Pradesh","+91-8662410978"],
    ["Arunachal Pradesh","+91-3602212299"],
    ["Assam","+91-3612237219"],
    ["Bihar","+91-6122294204"],
    ["Chhattisgarh","+91-7712223471"],
    ["Goa","+91-8322428494"],
    ["Gujarat","+91-7923251900"],
    ["Haryana","+91-1722719396"],
    ["Himachal Pradesh","+91-1772629439"],
    ["Jharkhand","+91-6512490036"],
    ["Karnataka","+91-8022340676"],
    ["Kerala","+91-4712364424"],
    ["Madhya Pradesh","+91-7552550351"],
    ["Maharashtra","+91-2222027990"],
    ["Manipur","+91-3852451550"],
    ["Meghalaya","+91-3642502094"],
    ["Mizoram","+91-3892317145"],
    ["Nagaland","+91-3702291120"],
    ["Odisha","+91-6742395398"],
    ["Punjab","+91-1722741803"],
    ["Rajasthan","+91-1412225624"],
    ["Sikkim","+91-3592202233"],
    ["Tamil Nadu","+91-4428593990"],
    ["Telangana","+91-4023454045"],
    ["Tripura","+91-3812416040"],
    ["Uttar Pradesh","+91-5222239415"],
    ["Uttarakhand","+91-1352710334"],
    ["West Bengal","+91-3322143526"],
    ["Andaman & Nicobar","+91-3192232102"],
    ["Chandigarh","+91-1722741803"],
    ["Dadra & Nagar Haveli and Daman & Diu","+91-2602230636"],
    ["Delhi (NCT)","+91-1123379181"],
    ["Jammu & Kashmir","+91-1912474159"],
    ["Ladakh","+91-1982252095"],
    ["Lakshadweep","+91-4896262256"],
    ["Puducherry","+91-4132201256"]
];

// Detailed Historical Disaster Data
const disasterArchiveData = [
    {
        id: "tsunami-2004",
        title: "Indian Ocean Tsunami",
        year: "2004",
        icon: "fa-water",
        desc: "A massive undersea megathrust earthquake off the coast of Sumatra triggered devastating tsunamis across the Indian Ocean, severely impacting coastal India.",
        summaryArea: "TN, AP, Kerala, A&N Islands",
        summaryMetric: { label: "Wave Height", value: "Up to 30m", color: "var(--danger)" },
        details: [
            { label: "Max Wave Height", value: "30 m" },
            { label: "Inland Inundation", value: "Up to 3 km" },
            { label: "Trigger Earthquake", value: "9.1 - 9.3 Mw" },
            { label: "Sea Level Anomaly", value: "+15 m average" }
        ]
    },
    {
        id: "floods-2013",
        title: "North India Floods",
        year: "2013",
        icon: "fa-cloud-showers-water",
        desc: "A multi-day cloudburst centered on Uttarakhand caused devastating floods and landslides, becoming the country's worst natural disaster since the 2004 tsunami.",
        summaryArea: "Uttarakhand, Himachal",
        summaryMetric: { label: "Primary Cause", value: "Cloudburst", color: "var(--warning)" },
        details: [
            { label: "Rainfall Anomaly", value: "+375% above avg" },
            { label: "River Level Surge", value: "+15 m (Mandakini)" },
            { label: "Landslide Events", value: "Over 2,000" },
            { label: "Flash Flood Speed", value: "High Velocity" }
        ]
    },
    {
        id: "cyclone-1999",
        title: "Odisha Super Cyclone",
        year: "1999",
        icon: "fa-hurricane",
        desc: "The most intense recorded tropical cyclone in the North Indian Ocean and among the most destructive, bringing massive storm surges and winds.",
        summaryArea: "Odisha Coast",
        summaryMetric: { label: "Wind Speed", value: "260 km/h", color: "var(--danger)" },
        details: [
            { label: "Max Wind Speed", value: "260 km/h" },
            { label: "Lowest Pressure", value: "912 hPa" },
            { label: "Storm Surge Height", value: "8 meters" },
            { label: "Rainfall Volume", value: "1000 mm (in 3 days)" }
        ]
    },
    {
        id: "mumbai-2005",
        title: "Maharashtra Floods",
        year: "2005",
        icon: "fa-house-flood-water",
        desc: "Unprecedented extreme rainfall caused severe urban flooding, with Mumbai receiving exactly 944 mm of rain within a 24-hour period, paralyzing the city.",
        summaryArea: "Mumbai, Maharashtra",
        summaryMetric: { label: "Primary Cause", value: "Extreme Rainfall", color: "var(--warning)" },
        details: [
            { label: "24-Hr Rainfall", value: "944 mm" },
            { label: "High Tide Level", value: "4.48 meters" },
            { label: "River Level (Mithi)", value: "Overtopped banks" },
            { label: "Drainage Capacity", value: "Exceeded by 400%" }
        ]
    },
    {
        id: "amphan-2020",
        title: "Cyclone Amphan",
        year: "2020",
        icon: "fa-tornado",
        desc: "A powerful and catastrophic tropical cyclone that caused widespread damage in Eastern India and Bangladesh amid the COVID-19 pandemic lockdowns.",
        summaryArea: "West Bengal, Odisha",
        summaryMetric: { label: "Category", value: "Super Cyclonic Storm", color: "var(--warning)" },
        details: [
            { label: "Max Wind Speed", value: "260 km/h" },
            { label: "Lowest Pressure", value: "920 hPa" },
            { label: "Storm Surge", value: "5 meters" },
            { label: "Max Rainfall", value: "240 mm (Kolkata)" }
        ]
    }
];

// Markers for map
const warningIcon = L.divIcon({
    html: '<i class="fa-solid fa-triangle-exclamation fa-beat" style="color: #ef4444; font-size: 24px; filter: drop-shadow(0px 0px 8px rgba(239, 68, 68, 0.8));"></i>',
    className: 'custom-warning-icon', iconSize: [24, 24], iconAnchor: [12, 12], popupAnchor: [0, -12]
});

states.forEach(stateName => {
    const coords = stateCoordinates[stateName];
    if (coords) L.marker(coords, { icon: warningIcon }).addTo(map).bindPopup(`<b style="color: #ef4444;">${stateName}</b><br>Severe Alert Protocol Active`);
});

// ---------------- UI POPULATION LOGIC ----------------
function populateUI() {
    // 1. Home Page
    const list = document.getElementById('state-list');
    const feed = document.getElementById('incident-feed');
    states.forEach(s => { list.innerHTML += `<div class="state-card"><b>${s}</b>: Severe Alert Protocol Active</div>`; });
    feed.innerHTML = `<div class="state-card" style="border-left-color:var(--danger)"><b>URGENT:</b> Severe Cyclonic Storm approaching coast within 24hrs.</div><div class="state-card"><b>NOTICE:</b> Brahmaputra water levels rising rapidly at Dibrugarh.</div><div class="state-card" style="border-left-color:var(--warning)"><b>ALRT:</b> High tide and storm surge warning issued for coastal districts.</div>`;

    // 2. Weather Page
    const tableBody = document.getElementById('weather-body');
    const sortedWeather = [...weatherData].sort((a, b) => a.name.localeCompare(b.name));
    sortedWeather.forEach(s => {
        let aqiClass = s.aqi <= 100 ? 'aqi-good' : (s.aqi <= 200 ? 'aqi-mod' : 'aqi-poor');
        let rainColor = s.rain > 50 ? 'var(--danger)' : 'white';
        tableBody.innerHTML += `<tr><td><b>${s.name}</b></td><td>${s.temp}°C</td><td style="color:${rainColor}; font-weight:bold;">${s.rain}%</td><td>${s.wind}</td><td style="font-size:0.75rem; color:var(--accent)">${s.pattern}</td><td>${s.hum}</td><td>${s.vis}</td><td><span class="aqi-pill ${aqiClass}">${s.aqi}</span></td></tr>`;
    });

    // 3. Rescue Ops Page
    const rescueTable = document.getElementById('rescue-zonal-body');
    zonalRescueData.forEach(z => {
        const rColor = z.risk === 'Critical' ? 'var(--danger)' : (z.risk === 'High' ? 'var(--warning)' : 'var(--success)');
        rescueTable.innerHTML += `<tr><td><b>${z.zone}</b></td><td>${z.teams} Teams</td><td>${z.evacuated}</td><td>${z.camps}</td><td>${z.assets} Units</td><td style="color:${rColor}; font-weight:700;">${z.risk}</td></tr>`;
    });
    document.getElementById('supply-feed').innerHTML = `<div class="state-card"><b>Air Drop:</b> Life-rafts and medicine kits dropped in flooded zones.</div><div class="state-card"><b>Ground:</b> 5,000 Food packets delivered to cyclone shelters.</div>`;
    document.getElementById('comms-status').innerHTML = `<div class="state-card"><b>HAM Radio:</b> Operational in North Zone.</div><div class="state-card" style="border-left-color:var(--danger)"><b>Sat-Link:</b> Intermittent in East Zone.</div>`;

    // 4. Directory Page
    const directoryTable = document.getElementById('directory-body');
    const offlineStates = ["Odisha", "West Bengal", "Andaman & Nicobar", "Assam"];
    allStateContacts.forEach(s => {
        const isOffline = offlineStates.includes(s[0]);
        directoryTable.innerHTML += `<tr><td>${s[0]}</td><td>${s[1]}</td><td style="color:${isOffline ? "var(--danger)" : "var(--success)"}; font-weight:bold;">${isOffline ? "OFFLINE" : "ONLINE"}</td></tr>`;
    });

    // 5. Populate Disaster Archives
    const historyContainer = document.getElementById('page-history');
    if (historyContainer) {
        historyContainer.innerHTML = ''; // Clear container

        disasterArchiveData.forEach(d => {
            historyContainer.innerHTML += `
                <div class="history-card" onclick="openModal('${d.id}')">
                    <div class="history-header">
                        <div>
                            <div class="history-title"><i class="fa-solid ${d.icon}" style="color:var(--accent); margin-right:5px;"></i> ${d.title}</div>
                        </div>
                        <span class="year-pill">${d.year}</span>
                    </div>
                    <p class="history-desc">${d.desc}</p>
                    <div class="history-stats">
                        <div class="stat-box"><span>Affected Areas</span> <b>${d.summaryArea}</b></div>
                        <div class="stat-box"><span>${d.summaryMetric.label}</span> <b style="color:${d.summaryMetric.color}">${d.summaryMetric.value}</b></div>
                    </div>
                </div>
            `;
        });
    }
}

window.onload = populateUI;


// ---------------- MODAL LOGIC ----------------
function openModal(disasterId) {
    const modal = document.getElementById('disaster-modal');
    const statsContainer = document.getElementById('modal-stats');
    
    // Find the specific disaster data based on the clicked ID
    const data = disasterArchiveData.find(d => d.id === disasterId);
    if(!data) return;

    // Populate standard text fields
    document.getElementById('modal-title').innerText = data.title;
    document.getElementById('modal-year').innerText = data.year;
    document.getElementById('modal-desc').innerText = data.desc;

    // Clear old detailed stats and inject new ones dynamically
    statsContainer.innerHTML = '';
    data.details.forEach(stat => {
        statsContainer.innerHTML += `
            <div class="modal-stat-box">
                <span>${stat.label}</span>
                <b>${stat.value}</b>
            </div>
        `;
    });

    // Show the modal
    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('disaster-modal').classList.remove('active');
}

// Close modal if user clicks anywhere outside the modal content box
window.onclick = function(event) {
    const modal = document.getElementById('disaster-modal');
    if (event.target === modal) {
        closeModal();
    }
}

// ---------------- CHART INITIALIZATION ----------------
let chartsCreated = false;

function initCharts() {
    if(chartsCreated) return;
    chartsCreated = true;

    const createChartWithThreshold = (id, type, labels, datasetLabel, data, color, thresholdValue, thresholdText) => {
        new Chart(document.getElementById(id), {
            type: type,
            data: { 
                labels: labels, 
                datasets: [{ 
                    label: datasetLabel, 
                    data: data, 
                    borderColor: type === 'line' ? color : undefined, 
                    backgroundColor: type === 'bar' ? color : undefined, 
                    tension: 0.4 
                }] 
            },
            options: { 
                responsive: true, 
                maintainAspectRatio: false, 
                plugins: { 
                    legend: { display: false },
                    annotation: {
                        annotations: {
                            dangerLine: {
                                type: 'line', yMin: thresholdValue, yMax: thresholdValue,
                                borderColor: 'rgba(239, 68, 68, 0.8)', borderWidth: 2, borderDash: [6, 6], 
                                label: { display: true, content: thresholdText, position: 'start', backgroundColor: 'rgba(239, 68, 68, 0.9)', color: 'white', font: { size: 11, family: 'Inter' } }
                            }
                        }
                    }
                } 
            }
        });
    };

    createChartWithThreshold('windChart', 'line', ['10:00', '12:00', '14:00', '16:00', '18:00'], 'km/h', [45, 55, 78, 82, 75], '#fbbf24', 70, 'Cyclone Risk (>70 km/h)');
    createChartWithThreshold('riverChart', 'line', ['Mon', 'Tue', 'Wed', 'Thu'], 'Meters', [5.2, 6.8, 8.4, 8.1], '#38bdf8', 7.5, 'Danger Mark (7.5m)');
    createChartWithThreshold('floodChart', 'bar', ['Zone A', 'Zone B', 'Zone C', 'Zone D'], 'Depth (m)', [0.8, 1.7, 1.2, 0.5], '#ef4444', 1.0, 'Evacuation Level (1.0m)');
    createChartWithThreshold('pressureChart', 'line', ['06:00', '09:00', '12:00', '15:00'], 'hPa', [1005, 998, 986, 992], '#10b981', 990, 'Severe Storm (<990 hPa)');
    createChartWithThreshold('stormChart', 'bar', ['East Coast', 'West Coast', 'Andaman'], 'Height (m)', [3.2, 1.1, 2.5], '#38bdf8', 2.0, 'Coastal Threat (2.0m)');
}