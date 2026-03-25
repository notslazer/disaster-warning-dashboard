# Disaster Warning Dashboard

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## Description

The Disaster Warning Dashboard is a comprehensive web application designed to provide real-time disaster monitoring and response information for India. It aggregates meteorological data, threat assessments, and emergency response details to help users stay informed about potential natural disasters such as floods, cyclones, and earthquakes.

This dashboard serves as an educational tool for understanding disaster management systems and promotes awareness about safety measures during emergencies.

## Features

### Home Page
Displays a threat watch overview for all Indian states and union territories, featuring an interactive map powered by Leaflet.js and a live intelligence feed of recent incidents.

### Weather Report Page
Provides national meteorological forecasts with detailed weather data tables fetched from reliable APIs, including temperature, humidity, wind speed, and air quality indices.

### Data Analytics Page
Offers in-depth data visualization through interactive charts using Chart.js, covering metrics like wind speed trends, river levels, flood depths, pressure variations, storm surges, precipitation rates, soil saturation, wave heights, cyclone intensities, and tsunami risk indices. Users can select specific states for localized analytics.

### Rescue Ops Page
Presents a zonal rescue intelligence matrix detailing NDRF (National Disaster Response Force) battalion deployments and state-wise emergency response capabilities.

### Contact Directory Page
Contains a comprehensive list of emergency contact numbers for various disaster management agencies, helplines, and state control rooms across India.

### Disaster Archives Page
Archives historical disaster events with detailed descriptions, meteorological data, and impact statistics to facilitate learning from past incidents.

### Awareness Page
Provides safety guidelines and preparedness tips for different types of disasters including floods, cyclones, and tsunamis, presented in an easy-to-understand format.

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Mapping**: Leaflet.js for interactive maps
- [Leaflet.js Documentation](https://leafletjs.com/)
- **Charts**: Chart.js with Chart.js Plugin Annotation for data visualization
- [Chart.js Documentation](https://www.chartjs.org/)
- **Icons**: Font Awesome for UI icons
- [Font Awesome](https://fontawesome.com/)
- **Fonts**: Google Fonts (Inter) for typography
- [Google Fonts](https://fonts.google.com/)
- **Styling**: Custom CSS with glassmorphism effects and responsive design

## APIs Used

- **Open-Meteo API**: Provides free weather forecast data including temperature, precipitation, wind speed, and atmospheric pressure. No API key required.
- [Open-Meteo API Documentation](https://open-meteo.com/en/docs)
- **Open-Meteo Air Quality API**: Supplies real-time air quality data with AQI indices.
- [Open-Meteo Air Quality API Documentation](https://open-meteo.com/en/docs/air-quality-api)

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for API data fetching and map tiles

### Installation and Setup
1. Clone or download this repository to your local machine.
2. Navigate to the project directory.
3. Open `index.html` in your web browser.
4. The dashboard will automatically load and start fetching real-time data.

No additional installation or build steps are required as this is a static web application.

## Disclaimer

This project was created as part of a college assignment for educational purposes only. It is not intended for production use or as a substitute for official disaster management systems. Always refer to official government sources for real disaster information and emergency response.

## References

- [Open-Meteo API](https://open-meteo.com/)
- [Leaflet.js](https://leafletjs.com/)
- [Chart.js](https://www.chartjs.org/)
- [Font Awesome](https://fontawesome.com/)
- [Google Fonts](https://fonts.google.com/)
- [CartoDB Basemaps](https://carto.com/basemaps/) for map tiles