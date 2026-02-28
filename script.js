// CLOCK ENGINE
setInterval(() => {
    document.getElementById('live-clock').innerText = new Date().toLocaleTimeString('en-IN');
}, 1000);

// NAVIGATION SPA LOGIC
function showPage(pageId, el) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    // Remove active state from all nav buttons
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    
    // Show selected page and activate button
    document.getElementById(pageId).classList.add('active');
    el.classList.add('active');
}