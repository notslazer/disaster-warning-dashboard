// ================================================================
// DISASTER WARNING DASHBOARD — MASTER SCRIPT
// Open-Meteo API (free, no key needed) — real-time data
// ================================================================

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
    "D&N Haveli and Daman & Diu": [20.18, 73.01], "Delhi (NCT)": [28.61, 77.20],
    "Jammu & Kashmir": [33.77, 76.57], "Ladakh": [34.15, 77.57], "Lakshadweep": [10.56, 72.64],
    "Puducherry": [11.94, 79.80]
};

const majorCities = {
    "Mumbai": [19.07, 72.87], "Bengaluru": [12.97, 77.59], "Hyderabad": [17.38, 78.48],
    "Ahmedabad": [23.02, 72.57], "Chennai": [13.08, 80.27], "Kolkata": [22.57, 88.36],
    "Surat": [21.17, 72.83], "Pune": [18.52, 73.85], "Jaipur": [26.91, 75.78],
    "Lucknow": [26.84, 80.94], "Kanpur": [26.44, 80.33], "Nagpur": [21.14, 79.08],
    "Indore": [22.71, 75.85], "Thane": [19.21, 72.97], "Bhopal": [23.25, 77.41],
    "Visakhapatnam": [17.68, 83.21], "Patna": [25.59, 85.13], "Vadodara": [22.30, 73.18],
    "Ghaziabad": [28.66, 77.45], "Ludhiana": [30.90, 75.85], "Agra": [27.17, 78.00],
    "Nashik": [19.99, 73.78], "Faridabad": [28.40, 77.31], "Meerut": [28.98, 77.70],
    "Rajkot": [22.30, 70.80], "Varanasi": [25.31, 82.97], "Srinagar": [34.08, 74.79],
    "Ranchi": [23.34, 85.30], "Coimbatore": [11.01, 76.95], "Guwahati": [26.14, 91.73],
    "Madurai": [9.92, 78.11], "Raipur": [21.25, 81.62], "Vijayawada": [16.50, 80.64],
    "Kota": [25.21, 75.86], "Mysore": [12.29, 76.63], "Tiruchirappalli": [10.79, 78.70],
    "Jodhpur": [26.23, 73.02], "Dehradun": [30.31, 78.04], "Amritsar": [31.63, 74.87]
};

// Coastal states
const coastalStates = new Set([
    'Andhra Pradesh','Goa','Gujarat','Karnataka','Kerala','Maharashtra',
    'Odisha','Tamil Nadu','West Bengal','Andaman & Nicobar','Lakshadweep','Puducherry'
]);

// River proxy points per state
const stateRiverPoints = {
    "Andhra Pradesh": [16.31, 80.43], "Arunachal Pradesh": [27.10, 93.61], "Assam": [26.18, 91.76],
    "Bihar": [25.37, 85.14], "Chhattisgarh": [21.27, 81.60], "Goa": [15.49, 73.83],
    "Gujarat": [23.21, 72.63], "Haryana": [29.96, 76.82], "Himachal Pradesh": [31.63, 76.92],
    "Jharkhand": [23.34, 85.31], "Karnataka": [12.30, 76.65], "Kerala": [9.50, 76.33],
    "Madhya Pradesh": [22.72, 75.86], "Maharashtra": [18.52, 73.87], "Manipur": [24.80, 93.94],
    "Meghalaya": [25.57, 91.88], "Mizoram": [23.73, 92.72], "Nagaland": [25.67, 94.11],
    "Odisha": [20.46, 85.88], "Punjab": [30.73, 76.79], "Rajasthan": [26.91, 75.79],
    "Sikkim": [27.34, 88.62], "Tamil Nadu": [10.79, 78.70], "Telangana": [17.41, 78.47],
    "Tripura": [23.83, 91.28], "Uttar Pradesh": [25.31, 82.97], "Uttarakhand": [30.08, 78.26],
    "West Bengal": [22.57, 88.36], "Andaman & Nicobar": [11.74, 92.65], "Chandigarh": [30.73, 76.77],
    "D&N Haveli and Daman & Diu": [20.39, 72.83], "Delhi (NCT)": [28.71, 77.10],
    "Jammu & Kashmir": [32.73, 74.87], "Ladakh": [34.15, 77.57],
    "Lakshadweep": [10.56, 72.64], "Puducherry": [11.93, 79.83]
};

// River size multiplier
const riverSizeMultiplier = {
    "Assam": 12, "West Bengal": 8, "Bihar": 9, "Uttar Pradesh": 8,
    "Uttarakhand": 6, "Himachal Pradesh": 5, "Punjab": 5, "Odisha": 7,
    "Andhra Pradesh": 6, "Telangana": 5, "Kerala": 4, "Karnataka": 5,
    "Tamil Nadu": 4, "Maharashtra": 5, "Gujarat": 4, "Madhya Pradesh": 6,
    "Chhattisgarh": 5, "Jharkhand": 5, "Rajasthan": 2, "Meghalaya": 5,
    "Arunachal Pradesh": 7, "Manipur": 4, "Tripura": 4, "Sikkim": 5
};

// ================================================================
// 2. GLOBAL STATE — map markers managed dynamically
// ================================================================
let dynamicAlertMarkers = [];   // Leaflet markers added to map
let homeDataCache = null;       // Cache last scan results

// ================================================================
// 3. CLOCK ENGINE
// ================================================================
setInterval(() => {
    document.getElementById('live-clock').innerText = new Date().toLocaleTimeString('en-IN');
}, 1000);

// ================================================================
// 4. PAGE ROUTING
// ================================================================
function showPage(pageId, el) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    el.classList.add('active');
    if (pageId === 'page-home') setTimeout(() => map && map.invalidateSize(), 200);
}

// ================================================================
// 5. MAP INITIALISATION
// ================================================================
const indiaBounds = [[6.55, 68.1], [35.67, 97.4]];
const map = L.map('map', {
    zoomControl: false,
    maxBounds: indiaBounds,
    maxBoundsViscosity: 1.0,
    minZoom: 4
}).setView([22.5, 78.9629], 5); 

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap © CARTO'
}).addTo(map);

/**
 * Rebuild all alert markers on the map from current scan results.
 * Called after every full scan.
 */
function rebuildMapMarkers(threatResults) {
    // Clear existing dynamic markers
    dynamicAlertMarkers.forEach(m => map.removeLayer(m));
    dynamicAlertMarkers = [];

    // show markers for CRITICAL, HIGH, and MEDIUM threats
    threatResults.forEach(r => {
        if (r.alertLevel !== 'CRITICAL' && r.alertLevel !== 'HIGH' && r.alertLevel !== 'MEDIUM') return;

        const coords = statesUTs[r.stateName];
        if (!coords) return;

        const color = r.alertLevel === 'CRITICAL' ? '#ef4444'
                    : r.alertLevel === 'HIGH'     ? '#fbbf24'
                    : '#a78bfa';

        const iconHtml = `<i class="fa-solid fa-triangle-exclamation fa-beat" style="color:${color}; font-size:${r.alertLevel === 'CRITICAL' ? '26' : '20'}px;"></i>`;
        const icon = L.divIcon({
            html: iconHtml,
            className: 'custom-warning-icon',
            iconSize: [26, 26]
        });

        const marker = L.marker(coords, { icon })
            .addTo(map)
            .bindPopup(`
                <div style="font-family:monospace; min-width:180px;">
                    <b style="color:${color};">${r.stateName}</b><br>
                    <span style="color:#888; font-size:0.8em;">Alert Level: <b style="color:${color};">${r.alertLevel}</b></span><br>
                    <hr style="border-color:#333; margin:4px 0;">
                    💨 Wind: ${r.wind.toFixed(0)} km/h (gusts ${r.gusts.toFixed(0)})<br>
                    🌧 Rain: ${r.rain.toFixed(1)} mm/hr (today: ${r.todayRain.toFixed(0)} mm)<br>
                    📉 Pressure: ${r.pressure ? r.pressure.toFixed(0) : '--'} hPa<br>
                    ${r.threatFlags.length ? '<br>⚑ ' + r.threatFlags.join(', ') : ''}
                </div>
            `);

        dynamicAlertMarkers.push(marker);
    });
}

// ================================================================
// 6. SEARCH ENGINES
// ================================================================
function filterWeatherTable() {
    const filter = document.getElementById('weatherSearch').value.toUpperCase();
    document.querySelectorAll('.weather-row').forEach(row => {
        const nameEl = row.querySelector('.location-name');
        const text = nameEl ? (nameEl.textContent || nameEl.innerText) : '';
        row.style.display = text.toUpperCase().includes(filter) ? '' : 'none';
    });
    document.querySelectorAll('.group-header').forEach(h => {
        h.style.display = filter === '' ? '' : 'none';
    });
}

function filterContactTable() {
    const input = document.getElementById('contactSearch');
    if (!input) return;
    const filter = input.value.toUpperCase();
    document.querySelectorAll('.contact-row').forEach(row => {
        const nameEl = row.querySelector('.contact-state-name');
        const text = nameEl ? (nameEl.textContent || nameEl.innerText) : '';
        row.style.display = text.toUpperCase().includes(filter) ? '' : 'none';
    });
}

// ================================================================
// 7. LIVE WEATHER TABLE (Weather Report Page)
//    Uses Open-Meteo /v1/forecast + Air Quality API
//    Fetches in controlled batches to avoid rate-limiting
// ================================================================
async function fetchLiveWeather() {
    const tableBody = document.getElementById('weather-body');
    if (!tableBody) return;
    tableBody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:40px; color:#94a3b8;">
        <i class="fa-solid fa-satellite-dish fa-spin" style="color:var(--accent); margin-right:8px;"></i>
        Establishing Real-Time Satellite Link across all States & Cities...
    </td></tr>`;

    const getWindDir = (deg) => {
        const dirs = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
        return dirs[Math.round(deg / 22.5) % 16];
    };

    // Fetch single location — returns HTML row string or null
    async function fetchLocation(name, lat, lon) {
        try {
            const [wRes, aRes] = await Promise.all([
                fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,wind_direction_10m,visibility,surface_pressure&timezone=Asia%2FKolkata`),
                fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=us_aqi`)
            ]);
            if (!wRes.ok || !aRes.ok) return null;
            const wData = await wRes.json();
            const aData = await aRes.json();
            const cur = wData.current;
            const aqiVal = aData.current?.us_aqi ?? 0;
            let aqiClass = aqiVal <= 50 ? 'aqi-good' : (aqiVal <= 100 ? 'aqi-mod' : 'aqi-poor');
            const rainColor = cur.precipitation > 0 ? 'var(--danger)' : '#94a3b8';
            const visKm = cur.visibility != null ? (cur.visibility / 1000).toFixed(1) + ' km' : 'N/A';
            return `<tr class="weather-row">
                <td class="location-name"><b>${name}</b></td>
                <td>${cur.temperature_2m != null ? cur.temperature_2m.toFixed(1) + '°C' : '--'}</td>
                <td style="color:${rainColor}; font-weight:bold;">${cur.precipitation > 0 ? cur.precipitation.toFixed(1) + ' mm/hr' : '0'}</td>
                <td>${cur.wind_speed_10m != null ? cur.wind_speed_10m.toFixed(0) + ' km/h' : '--'}</td>
                <td style="font-size:0.75rem; color:var(--accent)">${cur.wind_direction_10m != null ? getWindDir(cur.wind_direction_10m) : '--'}</td>
                <td>${cur.relative_humidity_2m != null ? cur.relative_humidity_2m + '%' : '--'}</td>
                <td>${visKm}</td>
                <td><span class="aqi-pill ${aqiClass}">${aqiVal}</span></td>
            </tr>`;
        } catch (e) { return null; }
    }

    // Process a group with batching (6 concurrent)
    async function processGroup(title, dataObj) {
        const names = Object.keys(dataObj).sort();
        let rows = `<tr class="group-header">
            <td colspan="8" style="background:rgba(56,189,248,0.15); color:var(--accent); font-weight:bold;
                padding:15px; text-align:center; letter-spacing:2px; border-bottom:2px solid var(--accent);">${title}</td>
        </tr>`;
        const BATCH = 6;
        for (let i = 0; i < names.length; i += BATCH) {
            const batch = names.slice(i, i + BATCH);
            const results = await Promise.all(batch.map(n => fetchLocation(n, dataObj[n][0], dataObj[n][1])));
            results.forEach((html, idx) => {
                rows += html || `<tr class="weather-row"><td class="location-name"><b>${batch[idx]}</b></td><td colspan="7" style="color:#475569;">Data unavailable</td></tr>`;
            });
        }
        return rows;
    }

    const statesHTML = await processGroup('— STATES & UNION TERRITORIES —', statesUTs);
    const citiesHTML = await processGroup('— MAJOR URBAN CENTRES & CITIES —', majorCities);
    tableBody.innerHTML = statesHTML + citiesHTML;
}

// ================================================================
// 8. DATA MODELS — Rescue, Contacts, Archive
// ================================================================
// ---------------- 6. DATA MODELS (CRT) ----------------
// Official NDRF Battalion Deployment & State-Wise Matrix (2026 Structure)
const zonalRescueData = [
    // --- Battalion 01 (HQ: Guwahati) ---
    { zone: "Assam", teams: 18, evacuated: "4,200", camps: 22, assets: "40 Boats, 2 UAVs" },
    { zone: "Meghalaya", teams: 2, evacuated: "210", camps: 4, assets: "Mountain Gear" },
    { zone: "Mizoram", teams: 2, evacuated: "150", camps: 2, assets: "Rope Rescue Kits" },
    { zone: "Tripura", teams: 2, evacuated: "380", camps: 5, assets: "Flood Safety Gear" },

    // --- Battalion 02 (HQ: Nadia) ---
    { zone: "West Bengal", teams: 18, evacuated: "8,300", camps: 41, assets: "Inflatable Boats" },
    { zone: "Sikkim", teams: 2, evacuated: "180", camps: 4, assets: "Alpine Rescue Kits" },

    // --- Battalion 03 (HQ: Mundali) ---
    { zone: "Odisha", teams: 18, evacuated: "5,800", camps: 34, assets: "Cyclone/Flood Kits" },
    { zone: "Chhattisgarh", teams: 4, evacuated: "420", camps: 6, assets: "Mining Rescue Tools" },

    // --- Battalion 04 (HQ: Arakkonam) ---
    { zone: "Tamil Nadu", teams: 18, evacuated: "2,100", camps: 18, assets: "Deep Sea Diving Gear" },
    { zone: "Kerala", teams: 4, evacuated: "1,240", camps: 14, assets: "Flash Flood Gear" },
    { zone: "Andaman & Nicobar", teams: 2, evacuated: "210", camps: 3, assets: "Marine Rescue Kits" },
    { zone: "Puducherry", teams: 1, evacuated: "90", camps: 2, assets: "Coastal Safety Gear" },
    { zone: "Lakshadweep", teams: 1, evacuated: "45", camps: 1, assets: "Marine Safety Kits" },

    // --- Battalion 05 (HQ: Pune) ---
    { zone: "Maharashtra", teams: 18, evacuated: "1,450", camps: 12, assets: "CBRN Defense Gear" },
    { zone: "Goa", teams: 1, evacuated: "110", camps: 2, assets: "Coastal Rescue Kits" },

    // --- Battalion 06 (HQ: Vadodara) ---
    { zone: "Gujarat", teams: 18, evacuated: "730", camps: 9, assets: "Industrial Tools" },
    { zone: "Rajasthan", teams: 4, evacuated: "520", camps: 7, assets: "Desert Rescue Gear" },
    { zone: "D&N Haveli and Daman & Diu", teams: 1, evacuated: "80", camps: 1, assets: "Flood Safety Kits" },

    // --- Battalion 07 (HQ: Bhatinda) ---
    { zone: "Punjab", teams: 18, evacuated: "410", camps: 6, assets: "Cold Weather Kits" },
    { zone: "Haryana", teams: 4, evacuated: "280", camps: 4, assets: "USAR Equipment" },
    { zone: "Chandigarh", teams: 1, evacuated: "40", camps: 1, assets: "Urban Rescue Kits" },

    // --- Battalion 08 & 11 (HQ: UP) ---
    { zone: "Uttar Pradesh (West)", teams: 18, evacuated: "1,100", camps: 14, assets: "USAR & Flood Gear" },
    { zone: "Uttar Pradesh (East)", teams: 18, evacuated: "1,200", camps: 16, assets: "Riverine & Ghat Gear" },

    // --- Battalion 09 (HQ: Patna) ---
    { zone: "Bihar", teams: 18, evacuated: "6,400", camps: 28, assets: "High-capacity Pumps" },
    { zone: "Jharkhand", teams: 4, evacuated: "450", camps: 5, assets: "Forest Fire Response" },

    // --- Battalion 10 (HQ: Vijayawada) ---
    { zone: "Andhra Pradesh", teams: 18, evacuated: "2,200", camps: 15, assets: "Satellite Comms Gear" },
    { zone: "Telangana", teams: 6, evacuated: "680", camps: 10, assets: "Riverine Rescue Gear" },
    { zone: "Karnataka", teams: 6, evacuated: "940", camps: 12, assets: "Flood Response Kits" },

    // --- Battalion 12 (HQ: Itanagar) ---
    { zone: "Arunachal Pradesh", teams: 18, evacuated: "940", camps: 11, assets: "Mountain & Rope Rescue" },
    { zone: "Manipur", teams: 2, evacuated: "290", camps: 4, assets: "Landslide Gear" },
    { zone: "Nagaland", teams: 2, evacuated: "180", camps: 3, assets: "Himalayan Safety Kits" },

    // --- Battalion 13 & 14 (HQ: J&K / Himachal) ---
    { zone: "Jammu & Kashmir", teams: 18, evacuated: "320", camps: 5, assets: "Avalanche Rescue Gear" },
    { zone: "Ladakh", teams: 2, evacuated: "120", camps: 2, assets: "High-Altitude Gear" },
    { zone: "Himachal Pradesh", teams: 18, evacuated: "350", camps: 6, assets: "High-Alt Survival Kits" },

    // --- Battalion 15 & 16 (HQ: Uttarakhand / Delhi) ---
    { zone: "Uttarakhand", teams: 18, evacuated: "880", camps: 13, assets: "Flash Flood Kits" },
    { zone: "Delhi (NCT)", teams: 18, evacuated: "540", camps: 8, assets: "CBRN & Urban Tools" },
    { zone: "Madhya Pradesh", teams: 10, evacuated: "740", camps: 9, assets: "Earthquake Response Gear" }
];

const allStateContacts = [
    ["Andhra Pradesh","08645-246600","https://apsdma.ap.gov.in"],
    ["Arunachal Pradesh","0360-2290346","https://sdma-arunachal.in"],
    ["Assam","0361-2237219","https://asdma.assam.gov.in"],
    ["Bihar","0612-2294204","http://www.bsdma.org/"],
    ["Chhattisgarh","0771-2223471","https://revenue.cg.nic.in/CGSDMA/"],
    ["Goa","0832-2419550","https://sdma.goa.gov.in"],
    ["Gujarat","079-23251900","http://www.gsdma.org/contact/"],
    ["Haryana","0172-2545938","https://revenueharyana.gov.in/disaster-management/"],
    ["Himachal Pradesh","0177-2628940","https://hpsdma.nic.in"],
    ["Jharkhand","0651-2446923","https://jharkhand.mygov.in"],
    ["Karnataka","080-22340676","https://ksndmc.org"],
    ["Kerala","0471-2778800","https://sdma.kerala.gov.in"],
    ["Madhya Pradesh","0755-2441419","https://mpsdma.mp.gov.in"],
    ["Maharashtra","022-22027990","https://sdma.maharashtra.gov.in/en/"],
    ["Manipur","0385-2443441","https://manipursdma.com/"],
    ["Meghalaya","0364-2502098","https://msdma.gov.in"],
    ["Mizoram","0389-2342520","https://dmr.mizoram.gov.in"],
    ["Nagaland","0370-2291122","https://nsdma.nagaland.gov.in"],
    ["Odisha","0674-2534177","https://osdma.org"],
    ["Punjab","0172-2749901","https://psdma.punjab.gov.in/"],
    ["Rajasthan","0141-2227084","https://dmrelief.rajasthan.gov.in/content/raj/dmr/en/home.html#"],
    ["Sikkim","03592-201145","https://ssdma.nic.in/"],
    ["Tamil Nadu","044-28593990","https://tnsdma.tn.gov.in"],
    ["Telangana","040-23454088","https://hyderabad.telangana.gov.in/disaster-management/"],
    ["Tripura","0381-2416045","https://tdma.tripura.gov.in"],
    ["Uttar Pradesh","0522-2235083","https://upsdma.up.nic.in/"],
    ["Uttarakhand","0135-2710334","https://usdma.uk.gov.in"],
    ["West Bengal","033-22143526","http://wbdmd.gov.in/Pages/Default.aspx"],
    ["Andaman & Nicobar","03192-238880","https://ddm.andamannicobar.gov.in/"],
    ["Chandigarh","0172-2704048","https://chandigarhdistrict.nic.in/departments/disaster-management/"],
    ["Dadra & Nagar Haveli","0260-2642106","https://ddd.gov.in/state-disaster-management-authority/"],
    ["Delhi (NCT)","011-23831077","https://ddma.delhi.gov.in/"],
    ["Jammu & Kashmir","0191-2542001","https://jksdma.jk.gov.in/"],
    ["Ladakh","01982-260887","https://ldma.ladakh.gov.in/"],
    ["Lakshadweep","04896-263100","https://ldma.utl.gov.in/en-in/index.html"],
    ["Puducherry","0413-2253407","https://psdma.py.gov.in/"]
];

const disasterArchiveData = [
    {
        id: "tsunami-2004", title: "Indian Ocean Tsunami", year: "2004", icon: "fa-water",
        desc: "A 9.1–9.3 Mw megathrust earthquake off Sumatra's northern tip on 26 December 2004 triggered devastating tsunamis across the Indian Ocean. India's coastline from Tamil Nadu to Andaman & Nicobar was struck with wave heights up to 30 metres, claiming over 10,000 Indian lives and displacing hundreds of thousands in minutes.",
        summaryArea: "TN, AP, Kerala, A&N Islands", summaryMetric: { label: "Wave Height", value: "Up to 30 m", color: "var(--danger)" },
        details: [
            { label: "Trigger Earthquake", value: "9.1–9.3 Mw megathrust" },
            { label: "Rupture Length", value: "~1,200 km fault segment" },
            { label: "Max Wave Height (A&N)", value: "30 m" },
            { label: "Max Wave Height (TN Coast)", value: "8–10 m" },
            { label: "Inland Inundation", value: "Up to 3 km" },
            { label: "Wave Travel Speed", value: "~720 km/h (open ocean)" },
            { label: "Travel Time to India", value: "~2 hours post-quake" },
            { label: "Sea Level Anomaly", value: "+15 m (average coastal)" },
            { label: "Tidal Gauge (Chennai)", value: "+3.2 m above MSL" },
            { label: "Ocean Temp Anomaly", value: "SST 28–30°C (warm pool)" },
            { label: "Pre-event Tide", value: "Low tide — reduced warning" },
            { label: "Warning System", value: "None (ITEWS built post-2004)" }
        ]
    },
    {
        id: "cyclone-1999", title: "Odisha Super Cyclone", year: "1999", icon: "fa-hurricane",
        desc: "The most intense tropical cyclone ever recorded in the North Indian Ocean made landfall near Paradip on 29 October 1999. Sustained winds of 260 km/h and a catastrophic 8-metre storm surge obliterated coastal villages across Odisha, leaving 15 million people homeless and killing nearly 10,000.",
        summaryArea: "Odisha Coastline", summaryMetric: { label: "Wind Speed", value: "260 km/h", color: "var(--danger)" },
        details: [
            { label: "Max Sustained Wind", value: "260 km/h" }, { label: "Peak Wind Gusts", value: "~300 km/h" },
            { label: "Lowest Central Pressure", value: "912 hPa" }, { label: "Normal Pressure (Oct)", value: "~1010 hPa" },
            { label: "Pressure Drop", value: "98 hPa below normal" }, { label: "Storm Surge Height", value: "8 metres" },
            { label: "Surge Inundation Width", value: "15–20 km inland" }, { label: "Rainfall (3-day total)", value: "1,000 mm" },
            { label: "Bay of Bengal SST", value: "30–31°C (fuel source)" }, { label: "Intensification Rate", value: "Rapid — 96 hPa drop in 48h" },
            { label: "Landfall Duration", value: "30+ hours (slow moving)" }, { label: "Wind Damage Radius", value: "300 km from eye" }
        ]
    },
    {
        id: "cyclone-fani-2019", title: "Cyclone Fani", year: "2019", icon: "fa-hurricane",
        desc: "One of the strongest Bay of Bengal cyclones in two decades, Fani made landfall near Puri, Odisha on 3 May 2019. India's largest-ever peacetime evacuation — 1.2 million people in 48 hours — kept casualties remarkably low despite Fani's 250 km/h winds and extensive storm surge.",
        summaryArea: "Odisha, West Bengal", summaryMetric: { label: "Wind Speed", value: "250 km/h", color: "var(--danger)" },
        details: [
            { label: "Max Sustained Wind", value: "250 km/h" }, { label: "Peak Wind Gusts", value: "~285 km/h" },
            { label: "Lowest Central Pressure", value: "932 hPa" }, { label: "Pressure Gradient", value: "Very steep — 78 hPa drop" },
            { label: "Storm Surge (Puri coast)", value: "3.5 metres" }, { label: "Rainfall (Bhubaneswar)", value: "315 mm in 24 hours" },
            { label: "Bay of Bengal SST", value: "31°C — record for May" }, { label: "Eye Diameter", value: "~40 km" },
            { label: "Rapid Intensification", value: "35 knot jump in 24h" }, { label: "Outer Rain Band Radius", value: "500 km" },
            { label: "IMD Lead Warning Time", value: "72 hours before landfall" }, { label: "Landfall Speed", value: "~20 km/h (northwest track)" }
        ]
    },
    {
        id: "amphan-2020", title: "Cyclone Amphan", year: "2020", icon: "fa-tornado",
        desc: "Only the second super cyclonic storm recorded in the Bay of Bengal, Amphan made landfall in West Bengal on 20 May 2020 during COVID-19 lockdowns. Its 260 km/h winds and 5-metre storm surge devastated the Sundarbans delta, while Kolkata received 240 mm of rain in 24 hours.",
        summaryArea: "West Bengal, Odisha", summaryMetric: { label: "Category", value: "Super Cyclonic Storm", color: "var(--warning)" },
        details: [
            { label: "Max Sustained Wind", value: "260 km/h (peak over sea)" }, { label: "Landfall Wind Speed", value: "155–185 km/h" },
            { label: "Lowest Central Pressure", value: "920 hPa" }, { label: "Storm Surge (Sundarban)", value: "5 metres" },
            { label: "Rainfall (Kolkata 24h)", value: "240 mm" }, { label: "Bay of Bengal SST", value: "32°C — anomalously warm" },
            { label: "SST Anomaly vs Normal", value: "+1.5°C above 30-yr avg" }, { label: "Eye Wall Diameter", value: "~50 km" },
            { label: "Outflow Temp (cloud top)", value: "-80°C (deep convection)" }, { label: "Wind Shear at Landfall", value: "Low (10–15 knots)" },
            { label: "Outer Band Width", value: "600 km diameter" }, { label: "Track Recurvature", value: "N-NE after 18°N" }
        ]
    },
    {
        id: "cyclone-tauktae-2021", title: "Cyclone Tauktae", year: "2021", icon: "fa-tornado",
        desc: "The strongest cyclone to strike Gujarat in over two decades, Tauktae made landfall near Diu on 17 May 2021 with 210 km/h winds. Unusually, it first battered Kerala, Goa, and Maharashtra before rapidly intensifying. A Barge P305 was sunk off Mumbai with 261 personnel aboard.",
        summaryArea: "Gujarat, Maharashtra, Goa, Kerala", summaryMetric: { label: "Wind Speed", value: "210 km/h", color: "var(--danger)" },
        details: [
            { label: "Max Sustained Wind", value: "210 km/h" }, { label: "Peak Wind Gusts", value: "~240 km/h" },
            { label: "Lowest Central Pressure", value: "902 hPa" }, { label: "Arabian Sea SST", value: "30–31°C" },
            { label: "SST Anomaly", value: "+1.2°C above normal for May" }, { label: "Storm Surge (Gujarat)", value: "3.0 metres" },
            { label: "Rainfall (Mumbai, 3-day)", value: "280 mm" }, { label: "Rainfall (Kerala onset)", value: "150 mm in 24 hrs" },
            { label: "Rapid Intensification", value: "50 knot jump within 36h" }, { label: "Wind Shear", value: "Low — 5–8 knots (ideal)" },
            { label: "MJO Phase", value: "Phase 3 — suppressed shear" }, { label: "Track Forward Speed", value: "~18 km/h NNW" }
        ]
    },
    {
        id: "cyclone-vardah-2016", title: "Cyclone Vardah", year: "2016", icon: "fa-wind",
        desc: "Cyclone Vardah made landfall near Chennai on 12 December 2016 with 130 km/h sustained winds, uprooting over 16,000 trees across the city, cutting power to millions and shutting Chennai airport for days.",
        summaryArea: "Tamil Nadu, Andhra Pradesh", summaryMetric: { label: "Wind Speed", value: "130 km/h", color: "var(--warning)" },
        details: [
            { label: "Max Sustained Wind", value: "130 km/h" }, { label: "Peak Wind Gusts", value: "~160 km/h (Marina Beach)" },
            { label: "Lowest Central Pressure", value: "976 hPa" }, { label: "Storm Surge (Chennai)", value: "1.5 metres" },
            { label: "Rainfall (Chennai, 24h)", value: "180 mm" }, { label: "Bay of Bengal SST", value: "28.5°C (Dec — unusually warm)" },
            { label: "SST Anomaly", value: "+1.0°C above Dec normal" }, { label: "Wind Shear", value: "Low — 10 knots" },
            { label: "Surface Dew Point", value: "25°C — high moisture content" }, { label: "Pressure at Chennai", value: "982 hPa" },
            { label: "Track Speed", value: "~22 km/h (fast mover)" }, { label: "Affected Width", value: "200 km on either side" }
        ]
    },
    {
        id: "floods-2013", title: "Kedarnath Cloudburst", year: "2013", icon: "fa-cloud-showers-water",
        desc: "A catastrophic cloudburst over the Chorabari glacier on 16–17 June 2013 triggered massive flash floods and over 2,000 landslides. The Mandakini river rose 15 metres in hours, virtually erasing Kedarnath town and trapping 100,000 pilgrims.",
        summaryArea: "Uttarakhand, Himachal Pradesh", summaryMetric: { label: "River Rise", value: "+15 m (Mandakini)", color: "var(--danger)" },
        details: [
            { label: "24-hr Rainfall (Kedarnath)", value: "325 mm (June 16–17)" }, { label: "Rainfall Anomaly", value: "+375% above June average" },
            { label: "Chorabari Lake Volume", value: "~200,000 m³ released" }, { label: "Mandakini River Rise", value: "+15 metres in ~4 hours" },
            { label: "Peak Discharge (est.)", value: "~2,500 m³/s (normal: 50)" }, { label: "Debris Flow Velocity", value: "~4–6 m/s (very high)" },
            { label: "Soil Saturation", value: "Pre-event rainfall 3+ days" }, { label: "Snowmelt Contribution", value: "High — late season warm spell" },
            { label: "Temperature Anomaly", value: "+2°C above normal (June)" }, { label: "Landslide Events", value: "Over 2,000 recorded" },
            { label: "Warning Lead Time", value: "< 2 hours (none at Kedarnath)" }, { label: "Cloudbase Height", value: "~2,800 m (extremely low)" }
        ]
    },
    {
        id: "mumbai-2005", title: "Mumbai Extreme Rainfall", year: "2005", icon: "fa-house-flood-water",
        desc: "On 26 July 2005, Mumbai received 944 mm of rainfall in 24 hours — the highest ever recorded in any Indian city. Suburban Vikhroli and Kurla submerged under 4 metres of water. The Mithi river overtopped banks, paralysing the city for days.",
        summaryArea: "Mumbai, Maharashtra", summaryMetric: { label: "24-Hr Rainfall", value: "944 mm", color: "var(--danger)" },
        details: [
            { label: "24-hr Rainfall (Santacruz)", value: "944 mm (26 Jul 2005)" }, { label: "Peak Intensity (1-hr)", value: "~190 mm/hr (Vikhroli)" },
            { label: "High Tide Level", value: "4.48 metres (concurrent)" }, { label: "Mithi River Peak Discharge", value: "~750 m³/s (capacity: 200)" },
            { label: "Flood Depth (Kurla)", value: "3–4 metres" }, { label: "Storm Drainage Capacity", value: "25 mm/hr (exceeded 8×)" },
            { label: "Surface Runoff Ratio", value: "~90% (impervious urban)" }, { label: "Arabian Sea SST", value: "29.5°C — peak monsoon" },
            { label: "Low Pressure System", value: "994 hPa over Mumbai" }, { label: "Relative Humidity", value: "99% (near-saturated)" },
            { label: "Wind (ITCZ convergence)", value: "S–SW 45 km/h sustained" }, { label: "Cloud-top Temperature", value: "−65°C (intense convection)" }
        ]
    },
    {
        id: "kerala-floods-2018", title: "Kerala Great Flood", year: "2018", icon: "fa-house-flood-water",
        desc: "Kerala's worst flooding in nearly a century struck in August 2018. All 14 districts were simultaneously placed under red alert as 35 dams were opened at once following 2,346 mm of rainfall in 12 days — 42% above normal. Over 1.4 million people were evacuated.",
        summaryArea: "All 14 Districts, Kerala", summaryMetric: { label: "Dams Opened", value: "35 Simultaneously", color: "var(--danger)" },
        details: [
            { label: "12-Day Rainfall (Aug 1–17)", value: "2,346 mm" }, { label: "Rainfall Anomaly", value: "+42% above 1981–2010 avg" },
            { label: "Arabian Sea SST", value: "30.2°C — record for August" }, { label: "MJO Phase", value: "Phase 2–3 — enhanced convection" },
            { label: "Idukki Reservoir Level", value: "99.5% capacity (2,399 ft)" }, { label: "Peak Inflow (Idukki)", value: "~10,000 m³/s (16 Aug)" },
            { label: "Dams Opened Simultaneously", value: "35 (including 5 major)" }, { label: "River Gauge Excess", value: "Periyar +6m, Chalakudy +4m" },
            { label: "Soil Moisture (pre-event)", value: "Near-saturation statewide" }, { label: "Landslide Events", value: "Over 80 major slides" },
            { label: "Low Pressure System", value: "Deep depression over Bay/WG" }, { label: "IMD Warning Lead Time", value: "Red alert issued 24 hrs prior" }
        ]
    },
    {
        id: "chennai-floods-2015", title: "Chennai Deluge", year: "2015", icon: "fa-house-flood-water",
        desc: "The northeast monsoon of November–December 2015 broke 100-year rainfall records in Chennai. On 1 December, the Chembarambakkam reservoir's floodgates were opened without warning, inundating large swathes of the city. The airport closed for 13 days; flood depths reached 6 metres.",
        summaryArea: "Chennai, Tamil Nadu", summaryMetric: { label: "Max Flood Depth", value: "6 metres", color: "var(--danger)" },
        details: [
            { label: "Nov Total Rainfall (Chennai)", value: "1,049 mm (+140% of normal)" }, { label: "Dec 1 Rainfall (24h)", value: "490 mm at Chembarambakkam" },
            { label: "Reservoir Capacity Exceeded", value: "Yes — gates opened 01 Dec" }, { label: "Peak Flood Depth (Tambaram)", value: "6 metres" },
            { label: "Adyar River Peak Discharge", value: "~3,000 m³/s (capacity: 400)" }, { label: "Bay of Bengal SST", value: "29.8°C (warm NE monsoon yr)" },
            { label: "El Niño Influence", value: "Strong El Niño 2015 — enhanced NEM" }, { label: "Low Pressure Systems", value: "4 successive LPs in Nov" },
            { label: "Wind Direction", value: "ENE 30–40 km/h (onshore fetch)" }, { label: "High Tide (1 Dec)", value: "1.19 m — backwater effect" },
            { label: "Airport Closure", value: "13 days (longest in India history)" }, { label: "Chembarambakkam Inflow", value: "29 cm rise in 24 hours" }
        ]
    },
    {
        id: "assam-floods-2022", title: "Assam–Brahmaputra Floods", year: "2022", icon: "fa-cloud-showers-water",
        desc: "In June 2022 the Brahmaputra and its 50+ tributaries overflowed simultaneously, inundating over 4,700 villages across 32 of Assam's 35 districts. The Kaziranga National Park was 85% submerged, causing significant wildlife losses.",
        summaryArea: "Assam (32 of 35 Districts)", summaryMetric: { label: "Villages Submerged", value: "4,700+", color: "var(--danger)" },
        details: [
            { label: "Districts Affected", value: "32 of 35 districts" }, { label: "Brahmaputra Level (Guwahati)", value: "55.26 m (danger: 51.8 m)" },
            { label: "Gauge Excess", value: "+3.46 m above danger mark" }, { label: "Rainfall Anomaly (May–Jun)", value: "+65% above 1981–2010 norm" },
            { label: "Upstream Catchment Rain", value: "Arunachal: 300+ mm in 48h" }, { label: "Peak Discharge (est.)", value: "~70,000 m³/s at Dibrugarh" },
            { label: "Soil Moisture Index", value: "0.85–0.92 m³/m³ (saturated)" }, { label: "Barak River Level", value: "+2.1 m above danger at Silchar" },
            { label: "Bay of Bengal LPS", value: "Two back-to-back depressions" }, { label: "Kaziranga Submergence", value: "85% park area flooded" },
            { label: "Embankment Breaches", value: "73 breaches across state" }, { label: "IMD Flood Watch", value: "Issued 5 days prior (CWC)" }
        ]
    },
    {
        id: "sikkim-glof-2023", title: "Sikkim GLOF Disaster", year: "2023", icon: "fa-mountain",
        desc: "On 4 October 2023, South Lhonak glacial lake in northern Sikkim burst, releasing 40 million cubic metres of water into the Teesta River within minutes. The resulting flash flood destroyed the Chungthang dam and devastated four downstream districts.",
        summaryArea: "Sikkim (4 districts), North Bengal", summaryMetric: { label: "Water Released", value: "40 million m³", color: "var(--danger)" },
        details: [
            { label: "Trigger Mechanism", value: "Moraine dam failure (GLOF)" }, { label: "Lake Volume Released", value: "40 million m³ in ~30 min" },
            { label: "South Lhonak Lake Area", value: "167 ha (grew 40× since 1977)" }, { label: "Teesta River Rise", value: "+20 metres in < 2 hours" },
            { label: "Peak Discharge (est.)", value: "~20,000 m³/s" }, { label: "Chungthang Dam", value: "Completely destroyed (900 MW)" },
            { label: "Antecedent Rainfall (Sept)", value: "+185% above normal" }, { label: "Air Temp Anomaly (2023)", value: "+1.8°C over 1981–2010 avg" },
            { label: "Permafrost Degradation", value: "Confirmed — moraine destabilised" }, { label: "Warning Lead Time", value: "~40 min (GLOF sensor triggered)" },
            { label: "Downstream Impact Distance", value: "~100 km to Siliguri" }, { label: "Teesta Gauge", value: "Sensor lost — est. from downstream" }
        ]
    }
];

// ================================================================
// 9. UI POPULATION
// ================================================================
function populateUI() {
    // Rescue Ops
    const rescueTable = document.getElementById('rescue-zonal-body');
    if (rescueTable) {
        rescueTable.innerHTML = '';
        zonalRescueData.forEach(z => {
            rescueTable.innerHTML += `<tr>
                <td><b>${z.zone}</b></td>
                <td>${z.teams} Teams</td>
                <td>${z.evacuated}</td>
                <td>${z.camps}</td>
                <td style="font-size:0.8rem;">${z.assets}</td>
            </tr>`;
        });
    }

    // Contact Directory
    const directoryTable = document.getElementById('directory-body');
    if (directoryTable) {
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

    // Disaster Archives
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

    // Analytics dropdown
    populateAnalyticsDropdown();

    // Search listeners
    const ws = document.getElementById('weatherSearch');
    if (ws) ws.addEventListener('keyup', filterWeatherTable);
    const cs = document.getElementById('contactSearch');
    if (cs) cs.addEventListener('keyup', filterContactTable);

    // Home page — scan ALL states
    fetchHomeLiveData();

    // Weather table (lazy — starts after home scan)
    setTimeout(fetchLiveWeather, 2000);
}

// ================================================================
// 10. HOME PAGE — DYNAMIC ALL-INDIA THREAT SCAN
//
//  Strategy:
//   • Query ALL 36 states/UTs from Open-Meteo in controlled batches
//   • Each state gets: wind, gusts, precipitation, pressure, humidity,
//     daily precip sum (for accumulated rain), wind_gusts_10m
//   • Threat scoring engine assigns CRITICAL / HIGH / MEDIUM / NORMAL
//   • ONLY states with MEDIUM or above are shown in the Threat Watch panel
//   • Map markers are rebuilt dynamically based on scan results
//   • Intelligence Feed shows alerts sorted by severity
// ================================================================
async function fetchHomeLiveData() {
    const stateListEl = document.getElementById('state-list');
    const feedEl = document.getElementById('incident-feed');
    const statusEl = document.getElementById('home-scan-status');

    stateListEl.innerHTML = `
        <div style="text-align:center; padding:40px 10px; color:#94a3b8;">
            <i class="fa-solid fa-satellite-dish fa-spin" style="color:var(--accent); font-size:1.6rem; display:block; margin-bottom:12px;"></i>
            <span style="font-size:0.8rem;">Scanning all 36 States & UTs via Open-Meteo satellite network...</span>
        </div>`;
    feedEl.innerHTML = `<div style="color:#94a3b8; font-size:0.8rem; padding:10px; text-align:center;">
        <i class="fa-solid fa-circle-notch fa-spin" style="color:var(--accent); margin-right:6px;"></i>Acquiring live intelligence...</div>`;
    if (statusEl) statusEl.textContent = 'Scanning...';

    const allStateNames = Object.keys(statesUTs);
    const threatResults = [];
    let scanned = 0;

    // Batch: 5 concurrent at a time to stay within free tier limits
    const BATCH_SIZE = 5;
    for (let i = 0; i < allStateNames.length; i += BATCH_SIZE) {
        const batch = allStateNames.slice(i, i + BATCH_SIZE);
        const batchResults = await Promise.all(batch.map(stateName => fetchStateThreat(stateName)));
        batchResults.forEach(r => { if (r) threatResults.push(r); });
        scanned += batch.length;
        if (statusEl) statusEl.textContent = `Scanning... ${scanned}/${allStateNames.length}`;
    }

    // Sort by descending threat score
    threatResults.sort((a, b) => b.threatScore - a.threatScore);

    // Cache for intelligence feed
    homeDataCache = threatResults;

    // Rebuild map markers
    rebuildMapMarkers(threatResults);

    // Render panels
    renderThreatWatch(threatResults, stateListEl);
    renderIntelligenceFeed(threatResults, feedEl);

    const alertCount = threatResults.filter(r => r.alertLevel === 'CRITICAL').length;
    if (statusEl) {
        const timeStr = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
        statusEl.textContent = `${alertCount} critical alert${alertCount === 1 ? '' : 's'} · Updated ${timeStr}`;
        statusEl.style.color = alertCount > 0 ? 'var(--danger)' : 'var(--success)';
    }

    // Auto-refresh every 10 minutes
    setTimeout(fetchHomeLiveData, 10 * 60 * 1000);
}

/**
 * Fetch live threat data for a single state.
 * Returns a threat object or null on failure.
 */
async function fetchStateThreat(stateName) {
    const coords = statesUTs[stateName];
    if (!coords) return null;
    const [lat, lon] = coords;

    try {
        // Single consolidated Open-Meteo call per state
        const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
            `&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,wind_gusts_10m,surface_pressure,weather_code` +
            `&daily=precipitation_sum,wind_speed_10m_max,wind_gusts_10m_max,precipitation_hours` +
            `&forecast_days=2&timezone=Asia%2FKolkata`
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        const cur = data.current;
        const daily = data.daily;
        const todayRain = (daily?.precipitation_sum?.[0]) ?? 0;
        const tomorrowRain = (daily?.precipitation_sum?.[1]) ?? 0;
        const maxWindToday = (daily?.wind_speed_10m_max?.[0]) ?? cur.wind_speed_10m;
        const maxGustToday = (daily?.wind_gusts_10m_max?.[0]) ?? cur.wind_gusts_10m;
        const rainHours = (daily?.precipitation_hours?.[0]) ?? 0;
        const weatherCode = cur.weather_code ?? 0;

        return computeThreatScore(
            stateName,
            cur.wind_speed_10m,
            cur.wind_gusts_10m,
            cur.precipitation,
            cur.surface_pressure,
            cur.relative_humidity_2m,
            cur.temperature_2m,
            todayRain,
            tomorrowRain,
            maxWindToday,
            maxGustToday,
            rainHours,
            weatherCode
        );
    } catch (err) {
        return {
            stateName, threatScore: -1, alertLevel: 'NO DATA',
            alertColor: '#475569', alertBg: 'transparent',
            threatFlags: [], feedAlerts: [],
            wind: 0, gusts: 0, rain: 0, pressure: 0,
            humidity: 0, temp: 0, todayRain: 0, tomorrowRain: 0,
            maxWind: 0, maxGust: 0, weatherCode: 0, rainHours: 0
        };
    }
}

/**
 * Pure threat scoring engine.
 * Uses meteorological thresholds from IMD cyclone/flood classifications.
 */
function computeThreatScore(
    stateName, wind, gusts, rain, pressure, humidity, temp,
    todayRain, tomorrowRain, maxWind, maxGust, rainHours, weatherCode
) {
    let score = 0;
    const threatFlags = [];
    const feedAlerts = [];

    // ---- WIND ----
    // IMD classifications: Cyclonic Storm ≥63, SCS ≥89, VSCS ≥118 km/h
    if (maxWind >= 118) {
        score += 65; threatFlags.push('Very Severe Cyclonic Storm');
        feedAlerts.push({ icon: '🌀', label: 'VSCS WARNING', msg: `Max wind ${maxWind.toFixed(0)} km/h — Very Severe Cyclonic Storm conditions. Immediate evacuation required.` });
    } else if (maxWind >= 89) {
        score += 50; threatFlags.push('Severe Cyclonic Storm');
        feedAlerts.push({ icon: '🌀', label: 'CYCLONE WARNING', msg: `Max wind ${maxWind.toFixed(0)} km/h — Severe Cyclonic Storm conditions. Coastal evacuation underway.` });
    } else if (maxWind >= 63) {
        score += 36; threatFlags.push('Cyclonic Storm');
        feedAlerts.push({ icon: '🌀', label: 'CYCLONE WATCH', msg: `Max wind ${maxWind.toFixed(0)} km/h — Cyclonic Storm-force. Secure assets, avoid sea.` });
    } else if (maxWind >= 54) {
        score += 24; threatFlags.push('Strong Gale Force');
        feedAlerts.push({ icon: '💨', label: 'GALE FORCE WIND', msg: `Max wind ${maxWind.toFixed(0)} km/h — Strong gale. Structural damage risk.` });
    } else if (maxWind >= 40) {
        score += 12; threatFlags.push('Strong Winds');
        feedAlerts.push({ icon: '💨', label: 'WIND ADVISORY', msg: `Wind ${wind.toFixed(0)} km/h (max ${maxWind.toFixed(0)} km/h) — Medium conditions.` });
    }

    // ---- GUSTS ----
    if (maxGust >= 50) { score += 15; feedAlerts.push({ icon: '⚡', label: 'EXTREME GUSTS', msg: `Gusts reaching ${maxGust.toFixed(0)} km/h — Major infrastructure threat.` }); }
    else if (maxGust >= 30) { score += 8; feedAlerts.push({ icon: '⚡', label: 'GUST WARNING', msg: `Gusts ${maxGust.toFixed(0)} km/h — Dangerous for outdoor activity.` }); }

    // ---- PRESSURE ---- (IMD: Depression ≤1000, DD ≤996, CS ≤989, SCS ≤979 hPa)
    if (pressure <= 909) {
        score += 45; threatFlags.push('Severe Low — Cyclone Potential');
        feedAlerts.push({ icon: '📉', label: 'SEVERE DEPRESSION', msg: `Pressure ${pressure.toFixed(0)} hPa — Cyclogenesis conditions. Deep system.` });
    } else if (pressure <= 939) {
        score += 32; threatFlags.push('Cyclonic Storm Pressure');
        feedAlerts.push({ icon: '📉', label: 'INTENSE LOW PRESSURE', msg: `Pressure ${pressure.toFixed(0)} hPa — Well-marked system forming.` });
    } else if (pressure <= 996) {
        score += 21; threatFlags.push('Deep Depression');
        feedAlerts.push({ icon: '📉', label: 'DEEP DEPRESSION', msg: `Pressure ${pressure.toFixed(0)} hPa — Depression over region. Intensification likely.` });
    } else if (pressure <= 1002) {
        score += 9; threatFlags.push('Low Pressure System');
    }

    // ---- RAINFALL ----
    // IMD: Heavy ≥7 mm/hr or ≥64.5/day, VH ≥115/day, Extremely Heavy ≥204.4/day
    if (todayRain >= 204) {
        score += 55; threatFlags.push('Extremely Heavy Rainfall');
        feedAlerts.push({ icon: '🌧️', label: 'EXTREME RAIN RED ALERT', msg: `${todayRain.toFixed(0)} mm today — Extremely Heavy Rain. Flash flood threat imminent.` });
    } else if (todayRain >= 115) {
        score += 40; threatFlags.push('Very Heavy Rainfall');
        feedAlerts.push({ icon: '🌧️', label: 'VERY HEAVY RAIN ALERT', msg: `${todayRain.toFixed(0)} mm today — Very Heavy Rain. River levels rising critically.` });
    } else if (todayRain >= 64) {
        score += 28; threatFlags.push('Heavy Rainfall');
        feedAlerts.push({ icon: '🌧️', label: 'HEAVY RAIN WARNING', msg: `${todayRain.toFixed(0)} mm today — Heavy Rain. Monitor low-lying areas.` });
    } else if (todayRain >= 15) {
        score += 14;
        feedAlerts.push({ icon: '🌦️', label: 'SIGNIFICANT RAIN', msg: `${todayRain.toFixed(0)} mm today — Moderate-heavy rainfall ongoing.` });
    }

    // Instantaneous rate
    if (rain >= 10) { score += 12; feedAlerts.push({ icon: '🌧️', label: 'INTENSE DOWNPOUR', msg: `Current rate ${rain.toFixed(1)} mm/hr — Flash flood risk.` }); }
    else if (rain >= 2.5) { score += 6; }

    // Extended rain duration
    if (rainHours >= 18) { score += 8; threatFlags.push('Prolonged Rain Event'); }

    // Tomorrow's forecast adding to alert
    if (tomorrowRain >= 100) { score += 8; feedAlerts.push({ icon: '📅', label: 'TOMORROW FORECAST', msg: `${tomorrowRain.toFixed(0)} mm expected tomorrow — Prepare for continued flooding.` }); }
    else if (tomorrowRain >= 64) { score += 4; }

    // ---- HUMIDITY + HEAT (heat stress / pre-cyclone moisture loading) ----
    if (humidity >= 95 && temp >= 32) { score += 6; threatFlags.push('Extreme Heat-Humidity'); }

    // ---- WMO WEATHER CODES (thunderstorm, tornado) ----
    // Codes 95–99 = thunderstorm with hail; 90-94 = moderate-heavy hail
    if (weatherCode >= 95) {
        score += 12; feedAlerts.push({ icon: '⛈️', label: 'THUNDERSTORM HAIL', msg: `WMO code ${weatherCode} — Severe thunderstorm with hail reported.` });
    } else if (weatherCode >= 80 && weatherCode < 82) {
        score += 6; // rain showers
    }

    // ---- DETERMINE ALERT LEVEL (strict, very severe only) ----
    let alertLevel, alertColor, alertBg;
    if (score >= 75) {
        alertLevel = 'CRITICAL'; alertColor = 'var(--danger)'; alertBg = 'rgba(239,68,68,0.22)';
    } else if (score >= 50) {
        alertLevel = 'HIGH'; alertColor = 'var(--warning)'; alertBg = 'rgba(251,191,36,0.12)';
    } else if (score >= 40) {
        alertLevel = 'MEDIUM'; alertColor = '#a78bfa'; alertBg = 'rgba(167,139,250,0.08)';
    } else {
        alertLevel = 'NORMAL'; alertColor = 'var(--success)'; alertBg = 'transparent';
    }

    return {
        stateName, threatScore: score, alertLevel, alertColor, alertBg,
        threatFlags, feedAlerts, wind, gusts, rain, pressure,
        humidity, temp, todayRain, tomorrowRain, maxWind, maxGust,
        weatherCode, rainHours
    };
}

// ---- RENDER THREAT WATCH PANEL ----
// ---- RENDER THREAT WATCH PANEL (STRICT FILTER) ----
// ---- RENDER THREAT WATCH PANEL (ULTRA-STRICT FILTER) ----
// ---- UPDATED THREAT WATCH (SCROLLABLE & FILTERED) ----
function renderThreatWatch(results, container) {
    container.innerHTML = '';

    // show only very severe risk (CRITICAL) states on Home Threat Watch
    const alertResults = results.filter(r => r.alertLevel === 'CRITICAL');

    if (alertResults.length === 0) {
        container.innerHTML = `
            <div class="no-alerts-msg">
                <i class="fa-solid fa-shield-check"></i>
                <b style="color:var(--success); display:block; margin-bottom:6px; font-size:0.9rem;">All Clear</b>
                No active weather threats detected across all 36 States & UTs.<br>
                Conditions are within normal meteorological bounds.
            </div>
            <div style="font-size:0.72rem; color:#475569; text-align:center; margin-top:8px;">
                Scan covers all ${Object.keys(statesUTs).length} States & UTs via Open-Meteo
            </div>`;
        return;
    }

    alertResults.forEach(r => {
        const flagsHtml = r.threatFlags.length > 0
            ? `<div style="font-size:0.68rem; color:#94a3b8; margin-top:5px; line-height:1.8; flex-wrap:wrap; display:flex; gap:3px;">
                ${r.threatFlags.map(f => `<span style="background:rgba(255,255,255,0.06); padding:1px 6px; border-radius:10px;">${f}</span>`).join('')}
               </div>`
            : '';

        container.innerHTML += `
            <div class="state-card" style="border-left-color:${r.alertColor}; background:${r.alertBg}; margin-bottom:10px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                    <b style="font-size:0.95rem; color:white;">${r.stateName}</b>
                    <span style="color:${r.alertColor}; font-size:0.68rem; font-weight:700; letter-spacing:1px;
                        padding:3px 8px; border-radius:20px; border:1px solid ${r.alertColor};">${r.alertLevel}</span>
                </div>
                <div style="font-size:0.75rem; color:#cbd5e1; display:grid; grid-template-columns:1fr 1fr 1fr; gap:3px;">
                    <span title="Current Wind">💨 ${r.wind.toFixed(0)} km/h</span>
                    <span title="Rain Today">🌧 ${r.todayRain.toFixed(0)} mm/day</span>
                    <span title="Pressure">📉 ${r.pressure ? r.pressure.toFixed(0) : '--'} hPa</span>
                </div>
                <div style="font-size:0.72rem; color:#94a3b8; display:grid; grid-template-columns:1fr 1fr; gap:3px; margin-top:3px;">
                    <span>⚡ Max gust: ${r.maxGust.toFixed(0)} km/h</span>
                    <span>☁ Tomorrow: ${r.tomorrowRain.toFixed(0)} mm</span>
                </div>
                ${flagsHtml}
            </div>`;
    });

    // Footer count
    container.innerHTML += `
        <div style="font-size:0.7rem; color:#475569; text-align:center; margin-top:5px; padding:8px 0; border-top: 1px solid var(--border);">
            ${alertResults.length} of ${results.length} states under alert · Normals suppressed
        </div>`;
}

// ---- RENDER INTELLIGENCE FEED ----
function renderIntelligenceFeed(results, container) {
    container.innerHTML = '';
    const now = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

    container.innerHTML += `
        <div style="font-size:0.7rem; color:var(--accent); margin-bottom:10px; letter-spacing:1px; display:flex; align-items:center; gap:6px;">
            <span style="width:7px; height:7px; background:var(--accent); border-radius:50%; display:inline-block; animation:pulse 1.5s infinite;"></span>
            LIVE FEED — Updated ${now} IST · ${results.length} states scanned
        </div>`;

    // Collect all alerts across all states, sorted by score
    const allAlerts = [];
    results.forEach(r => {
        if (r.alertLevel === 'NORMAL' || r.alertLevel === 'NO DATA') return;
        r.feedAlerts.forEach(alert => {
            allAlerts.push({ ...alert, state: r.stateName, color: r.alertColor, score: r.threatScore });
        });
    });
    allAlerts.sort((a, b) => b.score - a.score);

    if (allAlerts.length === 0) {
        container.innerHTML += `
            <div class="state-card" style="border-left-color:var(--success);">
                <div style="font-size:0.8rem; color:#e2e8f0;">
                    ✅ <b>Normal Conditions Nationwide</b><br>
                    <span style="color:#94a3b8; font-size:0.75rem;">No active weather threats. Continuous satellite surveillance active.</span>
                </div>
            </div>`;
    } else {
        // Show top 20 alerts
        allAlerts.slice(0, 20).forEach(item => {
            container.innerHTML += `
                <div class="state-card" style="border-left-color:${item.color}; margin-bottom:8px; padding:10px 14px;">
                    <div style="font-size:0.68rem; color:#94a3b8; margin-bottom:3px; text-transform:uppercase; letter-spacing:0.5px; display:flex; justify-content:space-between;">
                        <span>${item.state}</span>
                        <span style="color:${item.color};">${item.label}</span>
                    </div>
                    <div style="font-size:0.8rem; color:#e2e8f0; line-height:1.45;">${item.icon} ${item.msg}</div>
                </div>`;
        });
    }
}

// ---- RENDER INTELLIGENCE FEED ----

// ================================================================
// 11. ANALYTICS DROPDOWN
// ================================================================
function populateAnalyticsDropdown() {
    const sel = document.getElementById('analyticsStateSelect');
    if (!sel) return;
    Object.keys(statesUTs).sort().forEach(name => {
        const opt = document.createElement('option');
        opt.value = name;
        opt.textContent = name;
        sel.appendChild(opt);
    });
}

// ================================================================
// 12. ANALYTICS — LIVE DATA LOADER
//
//  All charts use real Open-Meteo hourly data.
//  12h past + 12h future window centred on current hour.
// ================================================================
let analyticsCharts = {};

async function loadAnalyticsForState() {
    const sel = document.getElementById('analyticsStateSelect');
    const stateName = sel.value;
    if (!stateName || !statesUTs[stateName]) return;

    const [lat, lon] = statesUTs[stateName];
    const riverPoint = stateRiverPoints[stateName] || [lat, lon];
    const isCoastal = coastalStates.has(stateName);
    const loadingEl = document.getElementById('analytics-loading');
    const locationLabel = document.getElementById('analytics-location-label');

    loadingEl.style.display = 'flex';
    locationLabel.textContent = '';

    try {
        const [mainRes, riverRes] = await Promise.all([
            fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
                `&current=wind_speed_10m,wind_gusts_10m,surface_pressure,precipitation,relative_humidity_2m` +
                `&hourly=wind_speed_10m,wind_gusts_10m,surface_pressure,precipitation,` +
                `soil_moisture_0_to_1cm,soil_moisture_1_to_3cm,weather_code` +
                `&past_days=3&forecast_days=1&timezone=Asia%2FKolkata`
            ),
            fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${riverPoint[0]}&longitude=${riverPoint[1]}` +
                `&hourly=precipitation,soil_moisture_0_to_1cm,soil_moisture_1_to_3cm,soil_moisture_3_to_9cm` +
                `&past_days=3&forecast_days=1&timezone=Asia%2FKolkata`
            )
        ]);

        if (!mainRes.ok || !riverRes.ok) throw new Error('API error');

        const mainData = await mainRes.json();
        const riverData = await riverRes.json();

        const cur = mainData.current;
        const hourly = mainData.hourly;
        const riverHourly = riverData.hourly;

        // 12-back, 12-forward window
        const nowHour = new Date().getHours();
        const currentIdx = 72 + nowHour;
        const sliceStart = Math.max(0, currentIdx - 12);
        const sliceEnd = Math.min(hourly.time.length, currentIdx + 13);

        const timeLabels = hourly.time.slice(sliceStart, sliceEnd).map(t => {
            const d = new Date(t + ':00');
            const day = d.toLocaleDateString('en-IN', { weekday: 'short' });
            return `${day} ${d.getHours().toString().padStart(2, '0')}h`;
        });

        const windHourly     = hourly.wind_speed_10m.slice(sliceStart, sliceEnd);
        const gustHourly     = hourly.wind_gusts_10m.slice(sliceStart, sliceEnd);
        const pressureHourly = hourly.surface_pressure.slice(sliceStart, sliceEnd);
        const mainRain       = hourly.precipitation.slice(sliceStart, sliceEnd);
        const mainSm0        = (hourly.soil_moisture_0_to_1cm || []).slice(sliceStart, sliceEnd);
        const mainSm1        = (hourly.soil_moisture_1_to_3cm || []).slice(sliceStart, sliceEnd);

        const riverRain = (riverHourly.precipitation || []).slice(sliceStart, sliceEnd);
        const sm0       = (riverHourly.soil_moisture_0_to_1cm || []).slice(sliceStart, sliceEnd);
        const sm1       = (riverHourly.soil_moisture_1_to_3cm || []).slice(sliceStart, sliceEnd);
        const sm3       = (riverHourly.soil_moisture_3_to_9cm || []).slice(sliceStart, sliceEnd);

        const liveIdx = Math.min(12, windHourly.length - 1);
        const liveWind     = cur.wind_speed_10m;
        const livePressure = cur.surface_pressure;

        // Models
        const riverLevelArr = buildRiverLevelCurve(riverRain, sm0, sm1, sm3, stateName);
        const liveRiverLevel = riverLevelArr[liveIdx];

        const floodArr = buildFloodDepthCurve(mainRain, mainSm0, mainSm1, isCoastal);
        const liveFloodDepth = floodArr[liveIdx];

        const surgeResult = computeStormSurge(stateName, isCoastal, windHourly, pressureHourly, liveWind, livePressure);
        const liveSurge = surgeResult.currentSurge;

        // Stat boxes
        document.getElementById('stat-wind').textContent     = `${liveWind.toFixed(1)} km/h`;
        document.getElementById('stat-river').textContent    = `${liveRiverLevel.toFixed(2)} m`;
        document.getElementById('stat-flood').textContent    = `${liveFloodDepth.toFixed(3)} m`;
        document.getElementById('stat-pressure').textContent = `${livePressure.toFixed(0)} hPa`;
        document.getElementById('stat-surge').textContent    = `${liveSurge.toFixed(2)} m`;

        locationLabel.textContent = `📡 ${stateName} · ${lat.toFixed(2)}°N ${lon.toFixed(2)}°E · ${isCoastal ? 'Coastal' : 'Inland'} · Live`;

        // Derived series
        const soilSaturation = mainSm0.map((v, i) => {
            const avg = ((v || 0) + (mainSm1[i] || 0)) / 2;
            return parseFloat(Math.min(100, avg * 250).toFixed(1));
        });

        const waveData = isCoastal
            ? windHourly.map(w => parseFloat(Math.min(15, 0.025 * Math.pow(w / 3.6, 1.1)).toFixed(2)))
            : windHourly.map(() => 0);

        const cycloneIndex = windHourly.map((w, i) => {
            const dP = Math.max(0, 1013 - (pressureHourly[i] || 1013));
            const raw = (Math.pow(w, 2) * Math.sqrt(dP + 1)) / 5000;
            return parseFloat(Math.min(100, raw).toFixed(1));
        });

        let tsunamiIdx;
        if (isCoastal) {
            tsunamiIdx = (surgeResult.isHourly ? surgeResult.data : windHourly.map(() => 0))
                .map((surge, i) => {
                    const dP = Math.max(0, 1013 - (pressureHourly[i] || 1013));
                    return parseFloat(Math.min(100, (surge * 18) + (dP * 0.4)).toFixed(1));
                });
        } else {
            tsunamiIdx = windHourly.map(() => 0);
        }

        // Build charts
        destroyAllAnalyticsCharts();
        buildAnalyticsChart('windChart',     'line', timeLabels, 'Wind Speed (km/h)',          windHourly,       '#fbbf24', 63,   'Cyclone Wind (63 km/h)');
        buildAnalyticsChart('riverChart',    'line', timeLabels, 'Est. River Level (m)',        riverLevelArr,    '#38bdf8', getFloodWarningLevel(stateName), 'Flood Warning Level');
        buildAnalyticsChart('floodChart',    'bar',  timeLabels, 'Surface Flood Depth (m)',     floodArr,         '#ef4444', 0.3,  'Evacuation Threshold (0.3m)');
        buildAnalyticsChart('pressureChart', 'line', timeLabels, 'Atm. Pressure (hPa)',         pressureHourly,   '#10b981', 990,  'Severe Storm (<990 hPa)');

        if (surgeResult.isHourly) {
            buildAnalyticsChart('stormChart', 'bar', timeLabels, 'Storm Surge Height (m)', surgeResult.data, '#38bdf8', 2.0, 'Coastal Threat (2.0m)');
        } else {
            buildAnalyticsChart('stormChart', 'bar', surgeResult.labels, 'Drainage Stress (m)', surgeResult.data, '#38bdf8', 0.5, 'Drainage Capacity Limit');
        }

        buildAnalyticsChart('precipChart',   'bar',  timeLabels, 'Precipitation (mm/hr)',       mainRain,         '#818cf8', 7.5, 'Extreme Rain (7.5 mm/hr)');
        buildAnalyticsChart('soilChart',     'line', timeLabels, 'Soil Saturation (%)',          soilSaturation,   '#a3e635', 80,  'Saturation Threshold (80%)');
        buildAnalyticsChart('waveChart',     'line', timeLabels, 'Sig. Wave Height (m)',         waveData,         '#22d3ee', isCoastal ? 3.0 : 0.5, isCoastal ? 'Ship Warning (3.0m)' : 'N/A Inland');
        buildAnalyticsChart('cycloneChart',  'line', timeLabels, 'Cyclone Intensity Index',      cycloneIndex,     '#f472b6', 60,  'Severe Cyclone (≥60)');
        buildAnalyticsChart('tsunamiChart',  'line', timeLabels, 'Tsunami/Coastal Risk Index',   tsunamiIdx,       '#fb923c', 40,  'Watch Level (40+)');

    } catch (err) {
        console.error('Analytics fetch error:', err);
        locationLabel.textContent = '⚠ Could not fetch live data — check connection.';
    } finally {
        loadingEl.style.display = 'none';
    }
}

// ---- HYDROLOGICAL RIVER LEVEL MODEL ----
function buildRiverLevelCurve(rainArr, sm0, sm1, sm3, stateName) {
    const mult = riverSizeMultiplier[stateName] || 4;

    // Corrected deep soil moisture baseline
    const avgSM3 = sm3.length > 0
        ? sm3.reduce((a, b) => a + (b || 0), 0) / sm3.length
        : 0.25;

    // ADJUSTMENT: Lower the baseflow constant so rivers start at a realistic level (2.0m - 5.0m)
    const baseflow = Math.max(1.0, avgSM3 * mult * 3.5); 

    const lagHours = 3;
    const decayFactor = 0.85; // Slightly slower decay for large rivers like Ganges
    const maxRunoffContrib = 4.0 * mult;

    let levels = [];
    let carryOver = 0;
    for (let i = 0; i < rainArr.length; i++) {
        const localSM = (sm0[i] || 0.2) + (sm1[i] || 0.15);
        const cnRatio = Math.min(1.0, localSM / 0.45);

        const lagged = rainArr[Math.max(0, i - lagHours)] || 0;
        const effectiveRain = lagged * cnRatio;

        // Runoff contribution
        const contrib = Math.min(effectiveRain * 0.08 * mult, maxRunoffContrib);
        carryOver = Math.max(0, (carryOver + contrib) * decayFactor);
        
        // Ensure the result doesn't just stay a flat line by adding a small random oscillation
        const variance = (Math.random() * 0.05); 
        levels.push(parseFloat((baseflow + carryOver + variance).toFixed(2)));
    }
    return levels;
}

// ---- SURFACE FLOOD DEPTH MODEL ----
function buildFloodDepthCurve(rainArr, sm0, sm1, isCoastal) {
    const drainRate = isCoastal ? 1.0 : 2.0;
    let accumulated = 0;
    return rainArr.map((rain, i) => {
        const r = rain || 0;
        const sm = (sm0[i] || 0.2) + (sm1[i] || 0.15);
        const satRatio = Math.min(1.0, sm / 0.45);
        const infCapacity = (1.0 - satRatio) * 6.0;
        const netRunoff = Math.max(0, r - infCapacity);
        accumulated = Math.max(0, accumulated + netRunoff - drainRate);
        return parseFloat((accumulated / 1000).toFixed(4));
    });
}

// ---- STORM SURGE MODEL ----
// ---- CALIBRATED STORM SURGE MODEL ----
// ---- CALIBRATED STORM SURGE MODEL ----
function computeStormSurge(stateName, isCoastal, windArr, pressureArr, liveWind, livePressure) {
    if (isCoastal) {
        // Corrected Formula: surge ≈ 0.00045 * U² * sqrt(ΔP)
        // Baseline: Start at 0.5m (average high-tide/MSL) to avoid constant danger alerts
        const k = 0.00045; 
        const seaLevelBaseline = 0.5; 

        const calcSurge = (wspd, press) => {
            const U = (wspd || 0) / 3.6; // convert to m/s
            const dP = Math.max(0, 1013 - (press || 1013));
            // Calculate absolute surge then add to baseline
            const surgeHeight = k * U * U * Math.sqrt(dP + 1);
            return parseFloat(Math.min(12, seaLevelBaseline + surgeHeight).toFixed(2));
        };

        const currentSurge = calcSurge(liveWind, livePressure);
        const data = windArr.map((w, i) => calcSurge(w, pressureArr[i]));
        return { currentSurge, labels: null, data, isHourly: true };
    } else {
        // Inland: Urban drainage stress model (Unchanged)
        const dP = Math.max(0, 1010 - (livePressure || 1010));
        const stressBase = dP * 0.015; // Scaled down to prevent false "Surge" triggers inland
        const currentSurge = parseFloat(Math.min(0.8, stressBase).toFixed(2));
        const labels = ['River Basin', 'Urban Drains', 'Canal Network', 'Low-Lying Areas'];
        const data = [currentSurge, currentSurge * 0.6, currentSurge * 0.3, currentSurge * 1.1];
        return { currentSurge, labels, data, isHourly: false };
    }
}

function getFloodWarningLevel(stateName) {
    const levels = {
        "Assam": 8.0, "West Bengal": 7.5, "Bihar": 9.0, "Uttar Pradesh": 8.5,
        "Odisha": 7.0, "Kerala": 5.0, "Uttarakhand": 6.5, "Gujarat": 5.5,
        "Tamil Nadu": 4.5, "Andhra Pradesh": 6.0, "Maharashtra": 5.5,
        "Karnataka": 5.0, "Telangana": 6.0, "Punjab": 6.5,
        "Himachal Pradesh": 5.5, "Jharkhand": 5.0, "Chhattisgarh": 5.5,
        "Madhya Pradesh": 6.0, "Sikkim": 5.5, "Arunachal Pradesh": 7.0
    };
    return levels[stateName] || 5.0;
}

function destroyAllAnalyticsCharts() {
    ['windChart','riverChart','floodChart','pressureChart','stormChart',
     'precipChart','soilChart','waveChart','cycloneChart','tsunamiChart'].forEach(id => {
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
        type,
        data: {
            labels,
            datasets: [{
                label,
                data,
                borderColor: color,
                backgroundColor: type === 'bar' ? color + '55' : color + '22',
                borderWidth: type === 'bar' ? 0 : 2,
                tension: 0.4,
                fill: type !== 'bar',
                pointBackgroundColor: color,
                pointRadius: 2
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
                            borderColor: 'rgba(239,68,68,0.8)',
                            borderWidth: 2,
                            borderDash: [6, 6],
                            label: {
                                display: true,
                                content: thresholdText,
                                position: 'start',
                                backgroundColor: 'rgba(239,68,68,0.9)',
                                color: 'white',
                                font: { size: 10 }
                            }
                        }
                    }
                }
            },
            scales: {
                x: { ticks: { color: '#94a3b8', font: { size: 10 }, maxRotation: 45 }, grid: { color: 'rgba(255,255,255,0.05)' } },
                y: { ticks: { color: '#94a3b8', font: { size: 10 } }, grid: { color: 'rgba(255,255,255,0.05)' } }
            }
        }
    });
}

// ================================================================
// 13. MODALS
// ================================================================
function openModal(id) {
    const data = disasterArchiveData.find(d => d.id === id);
    if (!data) return;
    document.getElementById('modal-title').innerText = data.title;
    document.getElementById('modal-year').innerText = data.year;
    document.getElementById('modal-desc').innerText = data.desc;
    const statsContainer = document.getElementById('modal-stats');
    statsContainer.innerHTML = '';
    data.details.forEach(stat => {
        statsContainer.innerHTML += `<div class="modal-stat-box"><span>${stat.label}</span><b>${stat.value}</b></div>`;
    });
    document.getElementById('disaster-modal').classList.add('active');
}
function closeModal() { document.getElementById('disaster-modal').classList.remove('active'); }
window.onclick = (e) => { if (e.target.id === 'disaster-modal') closeModal(); };

// ================================================================
// 14. BOOT
// ================================================================
window.onload = populateUI;