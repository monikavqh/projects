let now = new Date();

let weekdayName = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = weekdayName[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let seconds = now.getSeconds();
if (seconds < 10) {
  seconds = `0${seconds}`;
}
let displayCurrentTime = document.querySelector(".actual-date");
displayCurrentTime.innerHTML = `${day} ${hours}:${minutes}:${seconds}`;

let citySearch = document.querySelector("#search-form");
citySearch.addEventListener("submit", searchCity);
citySearch.addEventListener("click", searchCity);

function displayCurrentLocation() {
  navigator.geolocation.getCurrentPosition(setPosition);
}

function displayWeather(response) {
  let city = response.data.name;
  let currentCity = document.querySelector(".current-city");
  currentCity.innerHTML = city;
  let temperature = Math.round(response.data.main.temp);
  let cityTemperature = document.querySelector(".sixteen-degree");
  cityTemperature.innerHTML = `${temperature}°C`;
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector(".search-bar");
  let apiKey = "af01fd994ae220754a5ce37013724a3a";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=${unit}&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(displayWeather);
}

function setPosition(position) {
  let lan = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "af01fd994ae220754a5ce37013724a3";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lan}&lon=${lon}&units=${unit}&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(displayWeather);
}
