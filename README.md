# Task-1
API INTEGRATION

*COMPANY* : CODTECH IT SOLUTIONS

*NAME* : MAYANK PUROHIT

*INTERN ID* : CT04DN457

*DOMAIN* : FULL STACK WEB DEVELOPMENT

*DURATION* : 4 WEEKS

*MENTOR* : NEELA SANTOSH

Weather Dashboard Web Application: Task Description
Objective
The task involves developing a responsive weather dashboard web application that fetches and displays real-time weather data from the Open-Meteo API, a free public weather API that provides hyperlocal forecasts without requiring an API key. The application should allow users to search for weather information by city name or use their current location, displaying both current conditions and an hourly forecast in an intuitive, visually appealing interface.

Key Features & Requirements
1. API Integration
The application must fetch weather data from the Open-Meteo API:

Current weather (temperature, wind speed, humidity, weather condition)

Hourly forecast (temperature trends over the next 24 hours)

The API endpoint used is:

text
https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,weathercode
Geocoding (converting city names to coordinates) is handled via Open-Meteo’s geocoding API:

text
https://geocoding-api.open-meteo.com/v1/search?name={city}
2. User Interface
The web application must include:

A search bar for users to enter a city name.

A "Use My Location" button to fetch weather based on the device’s GPS.

Current weather display showing:

Location name

Temperature (°C)

Weather condition (e.g., "Sunny," "Rainy")

Wind speed (km/h)

Humidity (%)

A weather icon (e.g., sun, cloud, rain)

Hourly forecast (scrollable) showing:

Time (in 24-hour format)

Temperature (°C)

Weather icon for each hour

3. Responsive Design
The webpage must adapt to different screen sizes (desktop, tablet, mobile).

Mobile-friendly UI:

Stacked elements on small screens.

Scrollable hourly forecast for better usability.

Desktop-friendly UI:

Side-by-side components where appropriate.

Smooth hover effects on interactive elements.

4. Error Handling
Display user-friendly error messages if:

The city is not found.

Geolocation is blocked.

The API request fails.

Graceful fallbacks (e.g., showing "--" if data is missing).

5. Performance & Best Practices
Efficient API calls (avoid unnecessary requests).

Loading states (show spinners/placeholders while data is fetched).

No external dependencies (only vanilla JavaScript, HTML, and CSS).

Optimized for speed (minimal blocking operations).

Technical Implementation
Frontend Structure
HTML (index.html)

Semantic structure with <header>, <main>, and <footer>.

Search input and buttons for user interaction.

Containers for current weather and hourly forecast.

CSS (styles.css)

Flexbox/Grid for responsive layouts.

Custom styling for weather cards, buttons, and scrollable sections.

Smooth transitions and hover effects.

JavaScript (script.js)

Fetch API for HTTP requests.

Geolocation API for detecting user location.

Dynamic DOM updates to display weather data.

Weather code mapping (converting API codes to icons/descriptions).

Workflow
Initial Load

Default location (e.g., Berlin) is displayed.

User Searches for a City

Input is sent to Open-Meteo’s geocoding API.

Coordinates are used to fetch weather data.

User Clicks "Use My Location"

Browser requests GPS permission.

Coordinates are sent to Open-Meteo’s weather API.

Data Display

Current weather updates in real time.

Hourly forecast is populated dynamically.

Expected Outcome
A fully functional, visually appealing weather dashboard that:
✔ Fetches real-time weather data from Open-Meteo.
✔ Works on all devices (responsive design).
✔ Provides accurate forecasts (current + hourly).
✔ Handles errors gracefully (user-friendly messages).
✔ Runs efficiently (no unnecessary API calls).

Why This Task Matters
This project demonstrates:

API integration (fetching and parsing JSON data).

Frontend development skills (HTML, CSS, JavaScript).

Responsive design principles (mobile-first approach).

Error handling & user experience (UX best practices).

By completing this task, you will have built a practical, real-world application that showcases modern web development techniques.

Final Notes
No API key is needed (Open-Meteo is free and open).

No frameworks required (vanilla JS is sufficient).

Extendable (can later add 7-day forecasts, weather maps, etc.).

OUTPUT IMAGE

![Image](https://github.com/user-attachments/assets/19aebbfa-78b6-4707-a729-d3035eb0810a)
