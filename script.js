// ---------------- 1. DATA: STATES & COORDINATES ----------------
const statesUTs = {
    "Andhra Pradesh": [15.91, 79.74], "Arunachal Pradesh": [28.21, 94.72], "Assam": [26.20, 92.93],
    "Bihar": [25.09, 85.31], "Chhattisgarh": [21.27, 81.86], "Goa": [15.29, 74.12],
    "Gujarat": [22.25, 71.19], "Haryana": [29.05, 76.08], "Himachal Pradesh": [31.10, 77.17],
    "Jharkhand": [23.61, 85.27], "Karnataka": [15.31, 75.71], "Kerala": [10.85, 76.27],
    "Madhya Pradesh": [22.97, 78.65], "Maharashtra": [19.75, 75.71], "Manipur": [24.66, 93.90],
    "Meghalaya": [25.46, 91.36], "Mizoram": [23.16, 92.93], "Nagaland": [26.15, 94.56],
    "Odisha": [20.95, 85.09], "Punjab": [31.14, 75.34], "Rajasthan": [27.02, 74.21],
    "Sikkim": [27.53, 88.51], "Tamil Nadu": [11.12, 78.65], "Telangana": [18.11, 79.01],
    "Tripura": [23.94, 91.98], "Uttar Pradesh": [26.84, 80.94], "Uttarakhand": [30.06, 79.01],
    "West Bengal": [22.98, 87.85], "Andaman & Nicobar": [11.74, 92.65], "Chandigarh": [30.73, 76.77],
    "D&N Haveli and Daman & Diu": [20.18, 73.01], "Delhi (NCT)": [28.61, 77.20], "Jammu & Kashmir": [33.77, 76.57],
    "Ladakh": [34.15, 77.57], "Lakshadweep": [10.56, 72.64], "Puducherry": [11.94, 79.80]
};

const majorCities = {
    "Mumbai": [19.07, 72.87], "Bengaluru": [12.97, 77.59], "Hyderabad": [17.38, 78.48],
    "Ahmedabad": [23.02, 72.57], "Chennai": [13.08, 80.27], "Kolkata": [22.57, 88.36],
    "Surat": [21.17, 72.83], "Pune": [18.52, 73.85], "Jaipur": [26.91, 75.78],
    "Lucknow": [26.84, 80.94], "Kanpur": [26.44, 80.33], "Nagpur": [21.14, 79.08],
    "Indore": [22.71, 75.85], "Thane": [19.21, 72.97], "Bhopal": [23.25, 77.41],
    "Visakhapatnam": [17.68, 83.21], "Pimpri-Chinchwad": [18.62, 73.79], "Patna": [25.59, 85.13],
    "Vadodara": [22.30, 73.18], "Ghaziabad": [28.66, 77.45], "Ludhiana": [30.90, 75.85],
    "Agra": [27.17, 78.00], "Nashik": [19.99, 73.78], "Faridabad": [28.40, 77.31],
    "Meerut": [28.98, 77.70], "Rajkot": [22.30, 70.80], "Kalyan-Dombivli": [19.23, 73.12],
    "Vasai-Virar": [19.39, 72.83], "Varanasi": [25.31, 82.97], "Srinagar": [34.08, 74.79],
    "Aurangabad": [19.87, 75.34], "Dhanbad": [23.79, 86.43], "Amritsar": [31.63, 74.87],
    "Navi Mumbai": [19.03, 73.02], "Allahabad": [25.43, 81.84], "Ranchi": [23.34, 85.30],
    "Howrah": [22.59, 88.26], "Coimbatore": [11.01, 76.95], "Jabalpur": [23.18, 79.98],
    "Gwalior": [26.21, 78.17], "Vijayawada": [16.50, 80.64], "Jodhpur": [26.23, 73.02],
    "Madurai": [9.92, 78.11], "Raipur": [21.25, 81.62], "Kota": [25.21, 75.86],
    "Guwahati": [26.14, 91.73], "Solapur": [17.65, 75.90], "Hubli-Dharwad": [15.36, 75.12],
    "Bareilly": [28.36, 79.43], "Mysore": [12.29, 76.63], "Tiruchirappalli": [10.79, 78.70],
    "Gurgaon": [28.45, 77.02]
};

// ---------------- 2. ENGINES ----------------
setInterval(() => {
    document.getElementById('live-clock').innerText = new Date().toLocaleTimeString('en-IN');
}, 1000);

function showPage(pageId, el) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    el.classList.add('active');
    if(pageId === 'page-home') setTimeout(() => map.invalidateSize(), 200);
    if(pageId === 'page-analytics') {
        // Charts are initialized fresh or updated when state is selected
        // Do NOT call initCharts() with dummy data here anymore
    }
}

// ---------------- 3. MAP ----------------
const indiaBounds = [ [6.55, 68.1], [35.67, 97.4] ];
const map = L.map('map', { zoomControl: false, maxBounds: indiaBounds, maxBoundsViscosity: 1.0, minZoom: 4 }).setView([20.5937, 78.9629], 5);
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(map);

const states = ["Odisha", "Assam", "West Bengal", "Kerala", "Gujarat"];
const stateCoordinates = { "Odisha": [20.9517, 85.0985], "Assam": [26.2006, 92.9376], "West Bengal": [22.9868, 87.8550], "Kerala": [10.8505, 76.2711], "Gujarat": [22.2587, 71.1924] };

states.forEach(s => {
    const icon = L.divIcon({ html: '<i class="fa-solid fa-triangle-exclamation fa-beat" style="color: #ef4444; font-size: 24px;"></i>', className: 'custom-warning-icon', iconSize: [24,24] });
    L.marker(stateCoordinates[s], { icon }).addTo(map).bindPopup(`<b>${s}</b><br>Severe Alert Active`);
});

// ---------------- 4. SEARCH ENGINES ----------------
function filterWeatherTable() {
    const input = document.getElementById('weatherSearch');
    const filter = input.value.toUpperCase();
    const rows = document.querySelectorAll('.weather-row');
    const headers = document.querySelectorAll('.group-header');
    rows.forEach(row => {
        const textValue = row.querySelector('.location-name').textContent || row.querySelector('.location-name').innerText;
        row.style.display = (textValue.toUpperCase().indexOf(filter) > -1) ? "" : "none";
    });
    headers.forEach(h => h.style.display = (filter === "") ? "" : "none");
}

function filterContactTable() {
    const input = document.getElementById('contactSearch');
    if(!input) return;
    const filter = input.value.toUpperCase();
    const rows = document.querySelectorAll('.contact-row');
    rows.forEach(row => {
        const textValue = row.querySelector('.contact-state-name').textContent || row.querySelector('.contact-state-name').innerText;
        row.style.display = (textValue.toUpperCase().indexOf(filter) > -1) ? "" : "none";
    });
}

// ---------------- 5. LIVE WEATHER API ----------------
async function fetchLiveWeather() {
    const tableBody = document.getElementById('weather-body');
    if(!tableBody) return;
    tableBody.innerHTML = '<tr><td colspan="8" style="text-align:center; padding: 40px;">Establishing Real-Time Satellite Link...</td></tr>';
    
    const getWindPattern = (deg) => {
        const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
        return dirs[Math.round(deg / 45) % 8];
    };

    async function processGroup(title, dataObj) {
        let sectionRows = `<tr class="group-header"><td colspan="8" style="background:rgba(56, 189, 248, 0.15); color:var(--accent); font-weight:bold; padding:15px; text-align:center; letter-spacing:2px; border-bottom: 2px solid var(--accent);">${title}</td></tr>`;
        const sortedKeys = Object.keys(dataObj).sort();

        for (const name of sortedKeys) {
            const [lat, lon] = dataObj[name];
            try {
                const [wRes, aRes] = await Promise.all([
                    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,wind_direction_10m,visibility`),
                    fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=us_aqi`)
                ]);
                const wData = await wRes.json();
                const aData = await aRes.json();
                const cur = wData.current;
                const aqiVal = aData.current.us_aqi;
                let aqiClass = aqiVal <= 50 ? 'aqi-good' : (aqiVal <= 100 ? 'aqi-mod' : 'aqi-poor');

                sectionRows += `
                    <tr class="weather-row">
                        <td class="location-name"><b>${name}</b></td>
                        <td>${cur.temperature_2m.toFixed(1)}°C</td>
                        <td style="color:${cur.precipitation > 0 ? 'var(--danger)' : 'white'}; font-weight:bold;">${cur.precipitation > 0 ? cur.precipitation + 'mm' : '0%'}</td>
                        <td>${cur.wind_speed_10m} km/h</td>
                        <td style="font-size:0.75rem; color:var(--accent)">${getWindPattern(cur.wind_direction_10m)}</td>
                        <td>${cur.relative_humidity_2m}%</td>
                        <td>${(cur.visibility / 1000).toFixed(1)} km</td>
                        <td><span class="aqi-pill ${aqiClass}">${aqiVal}</span></td>
                    </tr>`;
            } catch (e) { console.error(e); }
        }
        return sectionRows;
    }

    const statesHTML = await processGroup("--- STATES & UNION TERRITORIES ---", statesUTs);
    const citiesHTML = await processGroup("--- MAJOR URBAN CENTERS & CITIES ---", majorCities);
    tableBody.innerHTML = statesHTML + citiesHTML;
}

// ---------------- 6. DATA MODELS ----------------
const zonalRescueData = [
    { zone: "North India", teams: 12, evacuated: "1,200", camps: 15, assets: 12, risk: "Medium" },
    { zone: "South India", teams: 8, evacuated: "4,500", camps: 28, assets: 18, risk: "High" },
    { zone: "East India", teams: 15, evacuated: "6,100", camps: 32, assets: 24, risk: "Critical" },
    { zone: "West India", teams: 4, evacuated: "450", camps: 5, assets: 6, risk: "Low" },
    { zone: "Central India", teams: 3, evacuated: "230", camps: 5, assets: 4, risk: "Low" }
];

const allStateContacts = [
    ["Andhra Pradesh", "08645-246600", "https://apsdma.ap.gov.in"], ["Arunachal Pradesh", "0360-2290346", "https://sdma-arunachal.in"],
    ["Assam", "0361-2237219", "https://asdma.assam.gov.in"], ["Bihar", "0612-2294204", "http://www.bsdma.org/"],
    ["Chhattisgarh", "0771-2223471", "https://revenue.cg.nic.in/CGSDMA/"], ["Goa", "0832-2419550", "https://sdma.goa.gov.in"],
    ["Gujarat", "079-23251900", "https://gsdma.org"], ["Haryana", "0172-2545938", "https://revenueharyana.gov.in/disaster-management/"],
    ["Himachal Pradesh", "0177-2628940", "https://hpsdma.nic.in"], ["Jharkhand", "0651-2446923", "https://jharkhand.mygov.in/group/department-home-jail-and-disaster-management"],
    ["Karnataka", "080-22340676", "https://ksndmc.org"], ["Kerala", "0471-2778800", "https://sdma.kerala.gov.in"],
    ["Madhya Pradesh", "0755-2441419", "https://mpsdma.mp.gov.in"], ["Maharashtra", "022-22027990", "https://maharashtrasdma.gov.in"],
    ["Manipur", "0385-2443441", "https://manipur.gov.in/disaster-management/"], ["Meghalaya", "0364-2502098", "https://msdma.gov.in"],
    ["Mizoram", "0389-2342520", "https://dmr.mizoram.gov.in"], ["Nagaland", "0370-2291122", "https://nsdma.nagaland.gov.in"],
    ["Odisha", "0674-2534177", "https://osdma.org"], ["Punjab", "0172-2749901", "https://punjab.gov.in/department/revenue-rehabilitation-disaster-management/"],
    ["Rajasthan", "0141-2227084", "https://rajasthan.gov.in/department/disaster-management-relief-civil-defence/"],
    ["Sikkim", "03592-201145", "https://sikkim.gov.in/departments/disaster-management-department"],
    ["Tamil Nadu", "044-28593990", "https://tnsdma.tn.gov.in"], ["Telangana", "040-23454088", "https://tsdma.telangana.gov.in"],
    ["Tripura", "0381-2416045", "https://tdma.tripura.gov.in"], ["Uttar Pradesh", "0522-2235083", "https://rahat.up.nic.in"],
    ["Uttarakhand", "0135-2710334", "https://usdma.uk.gov.in"], ["West Bengal", "033-22143526", "https://wbdmd.gov.in"],
    ["Andaman & Nicobar", "03192-238880", "https://nicobars.andaman.nic.in/disaster-management-authority/"],
    ["Chandigarh", "0172-2704048", "https://chandigarhdistrict.nic.in/departments/disaster-management/"],
    ["Dadra & Nagar Haveli", "0260-2642106", "https://dnh.nic.in/disaster-management/"],
    ["Delhi (NCT)", "011-23831077", "https://delhi.gov.in/department/ddma"],
    ["Jammu & Kashmir", "0191-2542001", "https://jkeoc.in"],
    ["Ladakh", "01982-260887", "https://kargil.nic.in/disaster-management/"],
    ["Lakshadweep", "04896-263100", "https://lakshadweep.gov.in/disaster-management/"],
    ["Puducherry", "0413-2253407", "https://puducherry.gov.in/department/revenue-and-disaster-management/"]
];

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

// ---------------- 7. UI POPULATION ----------------
function populateUI() {
    const list = document.getElementById('state-list');
    const feed = document.getElementById('incident-feed');
    states.forEach(s => { list.innerHTML += `<div class="state-card"><b>${s}</b>: Severe Alert Protocol Active</div>`; });
    feed.innerHTML = `<div class="state-card" style="border-left-color:var(--danger)"><b>URGENT:</b> Severe Cyclonic Storm approaching coast within 24hrs.</div><div class="state-card"><b>NOTICE:</b> Brahmaputra water levels rising rapidly.</div>`;

    // RESTORED: Rescue Ops Page
    const rescueTable = document.getElementById('rescue-zonal-body');
    if(rescueTable) {
        rescueTable.innerHTML = '';
        zonalRescueData.forEach(z => {
            const rColor = z.risk === 'Critical' ? 'var(--danger)' : (z.risk === 'High' ? 'var(--warning)' : 'var(--success)');
            rescueTable.innerHTML += `<tr><td><b>${z.zone}</b></td><td>${z.teams} Teams</td><td>${z.evacuated}</td><td>${z.camps}</td><td>${z.assets} Units</td><td style="color:${rColor}; font-weight:700;">${z.risk}</td></tr>`;
        });
    }
    document.getElementById('supply-feed').innerHTML = `<div class="state-card"><b>Air Drop:</b> Life-rafts and medicine kits dropped in flooded zones.</div><div class="state-card"><b>Ground:</b> 5,000 Food packets delivered.</div>`;
    document.getElementById('comms-status').innerHTML = `<div class="state-card"><b>HAM Radio:</b> Operational in North Zone.</div><div class="state-card" style="border-left-color:var(--danger)"><b>Sat-Link:</b> Intermittent.</div>`;

    // Symmetrical Contact Directory
    const directoryTable = document.getElementById('directory-body');
    if(directoryTable) {
        directoryTable.innerHTML = '';
        allStateContacts.forEach(s => {
            directoryTable.innerHTML += `
                <tr class="contact-row">
                    <td class="contact-state-name"><b>${s[0]}</b></td>
                    <td>${s[1]}</td>
                    <td><a href="${s[2]}" target="_blank" rel="noopener noreferrer" class="portal-btn">OFFICIAL PORTAL <i class="fa-solid fa-arrow-up-right-from-square"></i></a></td>
                </tr>`;
        });
    }

    // RESTORED: Archives
    const historyContainer = document.getElementById('page-history');
    if (historyContainer) {
        historyContainer.innerHTML = '';
        disasterArchiveData.forEach(d => {
            historyContainer.innerHTML += `
                <div class="history-card" onclick="openModal('${d.id}')">
                    <div class="history-header">
                        <div><div class="history-title"><i class="fa-solid ${d.icon}" style="color:var(--accent); margin-right:5px;"></i> ${d.title}</div></div>
                        <span class="year-pill">${d.year}</span>
                    </div>
                    <p class="history-desc">${d.desc}</p>
                    <div class="history-stats">
                        <div class="stat-box"><span>Affected Areas</span> <b>${d.summaryArea}</b></div>
                        <div class="stat-box"><span>${d.summaryMetric.label}</span> <b style="color:${d.summaryMetric.color}">${d.summaryMetric.value}</b></div>
                    </div>
                </div>`;
        });
    }

    // Populate analytics state dropdown
    populateAnalyticsDropdown();

    fetchLiveWeather();
    if(document.getElementById('weatherSearch')) document.getElementById('weatherSearch').addEventListener('keyup', filterWeatherTable);
    if(document.getElementById('contactSearch')) document.getElementById('contactSearch').addEventListener('keyup', filterContactTable);
}

// ---------------- 7b. ANALYTICS DROPDOWN POPULATION ----------------
function populateAnalyticsDropdown() {
    const sel = document.getElementById('analyticsStateSelect');
    if (!sel) return;
    const sortedStates = Object.keys(statesUTs).sort();
    sortedStates.forEach(name => {
        const opt = document.createElement('option');
        opt.value = name;
        opt.textContent = name;
        sel.appendChild(opt);
    });
}

// ---------------- 7c. ANALYTICS LIVE DATA LOADER ----------------
// Stores chart instances for destruction on update
let analyticsCharts = {};

async function loadAnalyticsForState() {
    const sel = document.getElementById('analyticsStateSelect');
    const stateName = sel.value;
    if (!stateName || !statesUTs[stateName]) return;

    const [lat, lon] = statesUTs[stateName];
    const loadingEl = document.getElementById('analytics-loading');
    const locationLabel = document.getElementById('analytics-location-label');

    loadingEl.style.display = 'flex';
    locationLabel.textContent = '';

    try {
        // Fetch current + hourly (past 6 hours + next 6 hours) from Open-Meteo
        const now = new Date();
        const startDate = now.toISOString().slice(0, 10);

        const [wRes, marineRes] = await Promise.all([
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
                `&current=wind_speed_10m,wind_direction_10m,surface_pressure,precipitation,relative_humidity_2m` +
                `&hourly=wind_speed_10m,surface_pressure,precipitation` +
                `&forecast_days=1&timezone=Asia%2FKolkata`),
            fetch(`https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lon}` +
                `&current=wave_height,swell_wave_height` +
                `&hourly=wave_height,swell_wave_height` +
                `&forecast_days=1&timezone=Asia%2FKolkata`)
        ]);

        const wData = await wRes.json();
        const marineData = await marineRes.json();

        const cur = wData.current;
        const hourly = wData.hourly;

        // Determine current hour index in hourly arrays
        const currentHour = now.getHours();
        const sliceStart = Math.max(0, currentHour - 5);
        const sliceEnd = Math.min(24, currentHour + 7);

        const timeLabels = hourly.time.slice(sliceStart, sliceEnd).map(t => {
            const h = new Date(t);
            return `${h.getHours().toString().padStart(2,'0')}:00`;
        });
        const windHourly = hourly.wind_speed_10m.slice(sliceStart, sliceEnd);
        const pressureHourly = hourly.surface_pressure.slice(sliceStart, sliceEnd);
        const rainHourly = hourly.precipitation.slice(sliceStart, sliceEnd);

        // Current wind speed (live)
        const liveWind = cur.wind_speed_10m;
        const livePressure = cur.surface_pressure;

        // Marine data (wave height as flood depth proxy, swell as storm surge proxy)
        let liveWaveHeight = 0, liveSurge = 0;
        let waveHourly = [], surgeHourly = [];
        if (marineData && marineData.current) {
            liveWaveHeight = marineData.current.wave_height ?? 0;
            liveSurge = marineData.current.swell_wave_height ?? 0;
            waveHourly = (marineData.hourly?.wave_height ?? []).slice(sliceStart, sliceEnd);
            surgeHourly = (marineData.hourly?.swell_wave_height ?? []).slice(sliceStart, sliceEnd);
        }

        // River level: derived from precipitation accumulation (proxy: cumulative rain in mm / 10 for meters)
        const riverProxy = rainHourly.map((v, i) => {
            const cumulative = rainHourly.slice(0, i + 1).reduce((a, b) => a + b, 0);
            return parseFloat((cumulative / 10).toFixed(2));
        });
        const liveRiverLevel = riverProxy[riverProxy.length - 1] || 0;

        // Flood depth proxy: wave height for coastal states, else precipitation * 0.05
        const isCoastal = ['Andhra Pradesh','Goa','Gujarat','Karnataka','Kerala','Maharashtra','Odisha','Tamil Nadu','West Bengal','Andaman & Nicobar','Lakshadweep','Puducherry'].includes(stateName);
        const liveFloodDepth = isCoastal ? liveWaveHeight : parseFloat((cur.precipitation * 0.05).toFixed(2));
        const floodHourly = isCoastal ? waveHourly : rainHourly.map(v => parseFloat((v * 0.05).toFixed(2)));

        // UPDATE STAT BOXES
        document.getElementById('stat-wind').textContent = `${liveWind.toFixed(1)} km/h`;
        document.getElementById('stat-river').textContent = `${liveRiverLevel.toFixed(2)} m`;
        document.getElementById('stat-flood').textContent = `${liveFloodDepth.toFixed(2)} m`;
        document.getElementById('stat-pressure').textContent = `${livePressure.toFixed(0)} hPa`;
        document.getElementById('stat-surge').textContent = `${liveSurge.toFixed(2)} m`;

        locationLabel.textContent = `📡 Live data for: ${stateName} (${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E)`;

        // UPDATE CHARTS
        destroyAllAnalyticsCharts();

        buildAnalyticsChart('windChart', 'line', timeLabels, 'Wind Speed (km/h)', windHourly, '#fbbf24', 70, 'Cyclone Risk (>70 km/h)');
        buildAnalyticsChart('riverChart', 'line', timeLabels, 'River Level (m)', riverProxy, '#38bdf8', 0.5, 'Flood Risk (>0.5m)');
        buildAnalyticsChart('floodChart', 'bar', timeLabels, 'Flood Depth (m)', floodHourly, '#ef4444', 1.0, 'Evacuation Level (1.0m)');
        buildAnalyticsChart('pressureChart', 'line', timeLabels, 'Pressure (hPa)', pressureHourly, '#10b981', 990, 'Severe Storm (<990 hPa)');

        // Storm surge: show per-zone coastal breakdown or hourly data
        const surgeLabels = isCoastal
            ? timeLabels
            : ['East Coast', 'West Coast', 'Inland'];
        const surgeData = isCoastal
            ? surgeHourly
            : [liveSurge, liveSurge * 0.6, liveSurge * 0.3];
        buildAnalyticsChart('stormChart', 'bar', surgeLabels, 'Surge Height (m)', surgeData, '#38bdf8', 2.0, 'Coastal Threat (2.0m)');

    } catch (err) {
        console.error('Analytics fetch error:', err);
        locationLabel.textContent = '⚠ Could not fetch live data. Check connection.';
    } finally {
        loadingEl.style.display = 'none';
    }
}

function destroyAllAnalyticsCharts() {
    ['windChart','riverChart','floodChart','pressureChart','stormChart'].forEach(id => {
        if (analyticsCharts[id]) {
            analyticsCharts[id].destroy();
            delete analyticsCharts[id];
        }
    });
}

function buildAnalyticsChart(id, type, labels, label, data, color, threshold, thresholdText) {
    const canvas = document.getElementById(id);
    if (!canvas) return;
    analyticsCharts[id] = new Chart(canvas, {
        type: type,
        data: {
            labels,
            datasets: [{
                label,
                data,
                borderColor: color,
                backgroundColor: type === 'bar'
                    ? color + '55'
                    : color + '22',
                borderWidth: type === 'bar' ? 0 : 2,
                tension: 0.4,
                fill: type !== 'bar',
                pointBackgroundColor: color,
                pointRadius: 3
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
                            yMin: threshold,
                            yMax: threshold,
                            borderColor: 'rgba(239, 68, 68, 0.8)',
                            borderWidth: 2,
                            borderDash: [6, 6],
                            label: {
                                display: true,
                                content: thresholdText,
                                position: 'start',
                                backgroundColor: 'rgba(239, 68, 68, 0.9)',
                                color: 'white'
                            }
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: { color: '#94a3b8', font: { size: 10 } },
                    grid: { color: 'rgba(255,255,255,0.05)' }
                },
                y: {
                    ticks: { color: '#94a3b8', font: { size: 10 } },
                    grid: { color: 'rgba(255,255,255,0.05)' }
                }
            }
        }
    });
}

// ---------------- 8. MODALS & CHARTS (ORIGINAL) ----------------
function openModal(id) {
    const data = disasterArchiveData.find(d => d.id === id);
    if(!data) return;
    document.getElementById('modal-title').innerText = data.title;
    document.getElementById('modal-year').innerText = data.year;
    document.getElementById('modal-desc').innerText = data.desc;
    const statsContainer = document.getElementById('modal-stats');
    statsContainer.innerHTML = '';
    data.details.forEach(stat => { statsContainer.innerHTML += `<div class="modal-stat-box"><span>${stat.label}</span><b>${stat.value}</b></div>`; });
    document.getElementById('disaster-modal').classList.add('active');
}
function closeModal() { document.getElementById('disaster-modal').classList.remove('active'); }
window.onclick = (e) => { if (e.target.id === 'disaster-modal') closeModal(); };

let chartsCreated = false;
function initCharts() {
    if(chartsCreated) return; chartsCreated = true;
    const createC = (id, type, labels, label, data, color, threshold, text) => {
        new Chart(document.getElementById(id), {
            type: type,
            data: { labels, datasets: [{ label, data, borderColor: color, backgroundColor: color, tension: 0.4 }] },
            options: { 
                responsive: true, maintainAspectRatio: false, 
                plugins: { 
                    legend: { display: false }, 
                    annotation: { annotations: { dangerLine: { 
                        type: 'line', yMin: threshold, yMax: threshold, 
                        borderColor: 'rgba(239, 68, 68, 0.8)', borderWidth: 2, borderDash: [6, 6], 
                        label: { display: true, content: text, position: 'start', backgroundColor: 'rgba(239, 68, 68, 0.9)', color: 'white' } 
                    } } } 
                } 
            }
        });
    };
    createC('windChart', 'line', ['10:00', '12:00', '14:00', '16:00', '18:00'], 'km/h', [45, 55, 78, 82, 75], '#fbbf24', 70, 'Cyclone Risk (>70 km/h)');
    createC('riverChart', 'line', ['Mon', 'Tue', 'Wed', 'Thu'], 'Meters', [5.2, 6.8, 8.4, 8.1], '#38bdf8', 7.5, 'Danger Mark (7.5m)');
    createC('floodChart', 'bar', ['Zone A', 'Zone B', 'Zone C', 'Zone D'], 'Depth (m)', [0.8, 1.7, 1.2, 0.5], '#ef4444', 1.0, 'Evacuation Level (1.0m)');
    createC('pressureChart', 'line', ['06:00', '09:00', '12:00', '15:00'], 'hPa', [1005, 998, 986, 992], '#10b981', 990, 'Severe Storm (<990 hPa)');
    createC('stormChart', 'bar', ['East Coast', 'West Coast', 'Andaman'], 'Height (m)', [3.2, 1.1, 2.5], '#38bdf8', 2.0, 'Coastal Threat (2.0m)');
}

window.onload = populateUI;