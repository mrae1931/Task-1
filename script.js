// DOM elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const locationBtn = document.getElementById('location-btn');
const currentLocation = document.getElementById('current-location');
const currentTemp = document.getElementById('current-temp');
const weatherDescription = document.getElementById('weather-description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const weatherIcon = document.getElementById('weather-icon');
const hourlyContainer = document.getElementById('hourly-container');

// Default location (Berlin)
let currentLatitude = 52.52;
let currentLongitude = 13.41;

// Weather code to description mapping
const weatherCodes = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    56: 'Light freezing drizzle',
    57: 'Dense freezing drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    66: 'Light freezing rain',
    67: 'Heavy freezing rain',
    71: 'Slight snow fall',
    73: 'Moderate snow fall',
    75: 'Heavy snow fall',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail'
};

// Weather code to icon mapping
const weatherIcons = {
    0: 'fa-sun',
    1: 'fa-cloud-sun',
    2: 'fa-cloud',
    3: 'fa-cloud',
    45: 'fa-smog',
    48: 'fa-smog',
    51: 'fa-cloud-rain',
    53: 'fa-cloud-rain',
    55: 'fa-cloud-showers-heavy',
    56: 'fa-temperature-low',
    57: 'fa-temperature-low',
    61: 'fa-cloud-rain',
    63: 'fa-cloud-showers-heavy',
    65: 'fa-cloud-showers-heavy',
    66: 'fa-temperature-low',
    67: 'fa-temperature-low',
    71: 'fa-snowflake',
    73: 'fa-snowflake',
    75: 'fa-snowflake',
    77: 'fa-snowflake',
    80: 'fa-cloud-rain',
    81: 'fa-cloud-showers-heavy',
    82: 'fa-cloud-showers-heavy',
    85: 'fa-snowflake',
    86: 'fa-snowflake',
    95: 'fa-bolt',
    96: 'fa-bolt',
    99: 'fa-bolt'
};

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    fetchWeatherData(currentLatitude, currentLongitude);
});

// Event listeners
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        geocodeCity(city);
    }
});

locationBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                currentLatitude = position.coords.latitude;
                currentLongitude = position.coords.longitude;
                fetchWeatherData(currentLatitude, currentLongitude);
                updateLocationName(currentLatitude, currentLongitude);
            },
            (error) => {
                alert('Unable to retrieve your location. Please enter a city manually.');
                console.error(error);
            }
        );
    } else {
        alert('Geolocation is not supported by your browser. Please enter a city manually.');
    }
});

// Convert city name to coordinates using Open-Meteo's geocoding API
async function geocodeCity(city) {
    try {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`);
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
            currentLatitude = data.results[0].latitude;
            currentLongitude = data.results[0].longitude;
            fetchWeatherData(currentLatitude, currentLongitude);
            currentLocation.textContent = `${data.results[0].name}, ${data.results[0].country}`;
        } else {
            alert('City not found. Please try another name.');
        }
    } catch (error) {
        console.error('Error geocoding city:', error);
        alert('Error finding city. Please try again.');
    }
}

// Fetch weather data from Open-Meteo API
async function fetchWeatherData(latitude, longitude) {
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,weathercode`;
        const response = await fetch(url);
        const data = await response.json();
        
        displayCurrentWeather(data);
        displayHourlyForecast(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data. Please try again.');
    }
}

// Update location name using reverse geocoding
async function updateLocationName(latitude, longitude) {
    try {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/reverse?latitude=${latitude}&longitude=${longitude}`);
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
            currentLocation.textContent = `${data.results[0].name}, ${data.results[0].country}`;
        }
    } catch (error) {
        console.error('Error getting location name:', error);
        currentLocation.textContent = `${latitude.toFixed(2)}°N, ${longitude.toFixed(2)}°E`;
    }
}

// Display current weather
function displayCurrentWeather(data) {
    const current = data.current_weather;
    
    currentTemp.textContent = `${current.temperature}°C`;
    windSpeed.textContent = `${current.windspeed} km/h`;
    
    // Get weather description from code
    const weatherCode = current.weathercode;
    weatherDescription.textContent = weatherCodes[weatherCode] || 'Unknown weather';
    
    // Set weather icon
    const iconClass = weatherIcons[weatherCode] || 'fa-question';
    weatherIcon.innerHTML = `<i class="fas ${iconClass}"></i>`;
    
    // Get humidity from hourly data (current hour)
    if (data.hourly && data.hourly.relativehumidity_2m && data.hourly.time) {
        const now = new Date();
        const currentHour = now.getHours();
        const hourlyTimes = data.hourly.time;
        
        // Find the index of the current hour
        const currentIndex = hourlyTimes.findIndex(time => {
            const date = new Date(time);
            return date.getHours() === currentHour;
        });
        
        if (currentIndex !== -1 && data.hourly.relativehumidity_2m[currentIndex]) {
            humidity.textContent = `${data.hourly.relativehumidity_2m[currentIndex]}%`;
        }
    }
}

// Display hourly forecast
function displayHourlyForecast(data) {
    hourlyContainer.innerHTML = '';
    
    if (!data.hourly || !data.hourly.time) return;
    
    const now = new Date();
    const currentHour = now.getHours();
    
    // Show next 24 hours of data
    for (let i = 0; i < 24; i++) {
        const timeIndex = currentHour + i;
        if (timeIndex >= data.hourly.time.length) break;
        
        const timeString = data.hourly.time[timeIndex];
        const time = new Date(timeString);
        const hour = time.getHours();
        const temp = data.hourly.temperature_2m[timeIndex];
        const weatherCode = data.hourly.weathercode[timeIndex];
        const iconClass = weatherIcons[weatherCode] || 'fa-question';
        
        const hourCard = document.createElement('div');
        hourCard.className = 'hourly-card';
        hourCard.innerHTML = `
            <div class="hourly-time">${hour}:00</div>
            <div class="hourly-icon"><i class="fas ${iconClass}"></i></div>
            <div class="hourly-temp">${temp}°C</div>
        `;
        
        hourlyContainer.appendChild(hourCard);
    }
}