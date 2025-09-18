const API_KEY = "47b077337d3cf29864b64da2d24da93d"; // <-- Replace with your OpenWeatherMap API key
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

const cityInput = document.getElementById("cityInput");
const search_button = document.getElementById("searchbtn");
const weather_display = document.getElementById("Weatherdisplay");
const loading = document.getElementById("loading"); // You should have a loading element with id="loading"
const error = document.getElementById("error");
const errormessage = document.getElementById("errormessage");

// display elements
const city_name = document.getElementById("cityname");
const temperature = document.getElementById("temperature");
const weatherdescription = document.getElementById("weatherdescription");
const feelslike = document.getElementById("feelslike");
const humidity = document.getElementById("humidity");
const windspeed = document.getElementById("windspeed");

search_button.addEventListener("click", handleSearch);
cityInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        handleSearch();
    }
});

function handleSearch() {
    const city = cityInput.value.trim();
    if (!city) {
        showError("Please enter a city name");
        return;
    }
    hideAllSections();
    showLoading();
    fetchWeatherData(city);
}

async function fetchWeatherData(city) {
    try {
        const URL = `${API_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
        const response = await fetch(URL);
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("City not found");
            } else if (response.status === 401) {
                throw new Error("Invalid API Key");
            } else {
                throw new Error("Failed to fetch weather data");
            }
        }
        const data = await response.json();
        displayWeatherData(data);
    } catch (err) {
        console.error("Error fetching weather data:", err);
        hideLoading();
        showError(err.message);
    }
}

function displayWeatherData(data) {
    hideLoading();
    const citynametext = `${data.name}, ${data.sys.country}`;
    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const feelsliketemp = Math.round(data.main.feels_like);
    const humidityvalue = data.main.humidity;
    const windspeedvalue = Math.round(data.wind.speed);

    city_name.textContent = citynametext;
    temperature.textContent = temp;
    weatherdescription.textContent = description;
    feelslike.textContent = feelsliketemp;
    humidity.textContent = humidityvalue;
    windspeed.textContent = windspeedvalue;

    showWeatherDisplay();
}

function showLoading() {
    if (loading) loading.classList.remove("hidden");
}
function hideLoading() {
    if (loading) loading.classList.add("hidden");
}

function showError(message) {
    if (errormessage) errormessage.textContent = message;
    if (error) error.classList.remove("hidden");
}

function hideError() {
    if (error) error.classList.add("hidden");
}

function showWeatherDisplay() {
    if (weather_display) weather_display.classList.remove("hidden");
}

function hideWeatherDisplay() {
    if (weather_display) weather_display.classList.add("hidden");
}

function hideAllSections() {
    hideLoading();
    hideError();
    hideWeatherDisplay();
}

function clearInput() {
    cityInput.value = "";
}