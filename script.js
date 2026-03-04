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
    { name: "Delhi (NCT)", temp: 28, rain: 2, wind: "12 km/h", pattern: "Westerly", hum: "40%", vis: "1.5km", aqi: 340 }
];

const zonalRescueData = [
    { zone: "North India", teams: 12, evacuated: "1,200", camps: 15, assets: 12, risk: "Medium" },
    { zone: "South India", teams: 8, evacuated: "4,500", camps: 28, assets: 18, risk: "High" },
    { zone: "East India", teams: 15, evacuated: "6,100", camps: 32, assets: 24, risk: "Critical" },
    { zone: "West India", teams: 4, evacuated: "450", camps: 5, assets: 6, risk: "Low" },
    { zone: "Central India", teams: 3, evacuated: "230", camps: 5, assets: 4, risk: "Low" }
];

// COMMIT 6: Contact Directory Data
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

function populateWeatherTable() {
    const tableBody = document.getElementById('weather-body');
    if(!tableBody) return;
    tableBody.innerHTML = '';
    const sortedData = [...weatherData].sort((a, b) => a.name.localeCompare(b.name));
   
    sortedData.forEach(s => {
        let aqiClass = s.aqi <= 100 ? 'aqi-good' : (s.aqi <= 200 ? 'aqi-mod' : 'aqi-poor');
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

function populateUI() {
    // 1. Populate Home Page
    const list = document.getElementById('state-list');
    const feed = document.getElementById('incident-feed');

    states.forEach(s => {
        list.innerHTML += `<div class="state-card"><b>${s}</b>: Severe Alert Protocol Active</div>`;
    });

    feed.innerHTML = `
        <div class="state-card" style="border-left-color:var(--danger)"><b>URGENT:</b> Severe Cyclonic Storm approaching coast within 24hrs.</div>
        <div class="state-card"><b>NOTICE:</b> Brahmaputra water levels rising rapidly at Dibrugarh.</div>
        <div class="state-card" style="border-left-color:var(--warning)"><b>ALRT:</b> High tide and storm surge warning issued for coastal districts.</div>
    `;

    // 2. Populate Weather Page
    populateWeatherTable();

    // 3. Populate Rescue Ops Page
    const rescueTable = document.getElementById('rescue-zonal-body');
   
    zonalRescueData.forEach(z => {
        const rColor = z.risk === 'Critical' ? 'var(--danger)' : (z.risk === 'High' ? 'var(--warning)' : 'var(--success)');
        rescueTable.innerHTML += `
            <tr>
                <td><b>${z.zone}</b></td>
                <td>${z.teams} Teams</td>
                <td>${z.evacuated}</td>
                <td>${z.camps}</td>
                <td>${z.assets} Units</td>
                <td style="color:${rColor}; font-weight:700;">${z.risk}</td>
            </tr>`;
    });

    document.getElementById('supply-feed').innerHTML = `
        <div class="state-card"><b>Air Drop:</b> Life-rafts and medicine kits dropped in flooded zones.</div>
        <div class="state-card"><b>Ground:</b> 5,000 Food packets delivered to cyclone shelters.</div>`;
   
    document.getElementById('comms-status').innerHTML = `
        <div class="state-card"><b>HAM Radio:</b> Operational in North Zone.</div>
        <div class="state-card" style="border-left-color:var(--danger)"><b>Sat-Link:</b> Intermittent in East Zone.</div>`;

    // 4. COMMIT 6: Populate Directory with Offline Status logic
    const directoryTable = document.getElementById('directory-body');
   
    // States that are currently facing communication blackouts
    const offlineStates = ["Odisha", "West Bengal", "Andaman & Nicobar", "Assam"];

    allStateContacts.forEach(s => {
        const stateName = s[0];
        const isOffline = offlineStates.includes(stateName);
       
        const statusText = isOffline ? "OFFLINE" : "ONLINE";
        const statusColor = isOffline ? "var(--danger)" : "var(--success)";
       
        directoryTable.innerHTML += `
            <tr>
                <td>${stateName}</td>
                <td>${s[1]}</td>
                <td style="color:${statusColor}; font-weight:bold;">${statusText}</td>
            </tr>`;
    });
}

window.onload = populateUI;

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
                                type: 'line',
                                yMin: thresholdValue,
                                yMax: thresholdValue,
                                borderColor: 'rgba(239, 68, 68, 0.8)',
                                borderWidth: 2,
                                borderDash: [6, 6],
                                label: {
                                    display: true,
                                    content: thresholdText,
                                    position: 'start',
                                    backgroundColor: 'rgba(239, 68, 68, 0.9)',
                                    color: 'white',
                                    font: { size: 11, family: 'Inter' }
                                }
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