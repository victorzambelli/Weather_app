const WEATHER_API_KEY = ""; // Coloque sua chave de API aqui
const API_COUNTRY = "https://flagsapi.com/";

const cityInput = document.getElementById("city-input");
const searchInput = document.getElementById("search-btn");

const weatherData = document.getElementById("weather-data");

const cityElement = document.getElementById("city");
const countryIconElement = document.getElementById("country");
const tempElement = document.getElementById("temperature");
const descElement = document.getElementById("description");
const weatherIconElement = document.getElementById("weather-icon");
const umidityElement = document.getElementById("umidity");
const windElement = document.getElementById("wind");

const getWeatherData = async(city) => {
    const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric&lang=pt_br`
    const response = await fetch(apiWeatherUrl)
    const data = await response.json()

    weatherData.classList.remove("hide");
    
    return data;
}

const showWeatherData = async(city) => {
    const data = await getWeatherData(city);

    if (data.name != undefined) {
        cityElement.innerText = data.name;
        countryIconElement.src = `${API_COUNTRY}${data.sys.country}/flat/64.png`
        tempElement.innerText = data.main.temp + '°C';
        descElement.innerText = data.weather[0].description;
        weatherIconElement.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        umidityElement.innerText = data.main.humidity + '%';
        windElement.innerText = data.wind.speed + 'km/h';
    } else {
        alert('Cidade não encontrada!');
    }
}

searchInput.addEventListener("click", (e) => {
    e.preventDefault();

    const city = cityInput.value;

    showWeatherData(city);
})

cityInput.addEventListener("keyup", (e) => {
    if (e.code == "Enter" || e.code == "NumpadEnter") {
        const city = cityInput.value;
        showWeatherData(city);
    }
})