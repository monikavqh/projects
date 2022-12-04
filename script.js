//date
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
let monthName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let date = now.getDate();
let month = monthName[now.getMonth()];
let year = now.getFullYear();

let displayCurrentTime = document.querySelector(".actual-date");
displayCurrentTime.innerHTML = `${day} ${hours}:${minutes}:${seconds}`;
let displayCurrentDate = document.querySelector(".date");
displayCurrentDate.innerHTML = `${date} ${month} ${year}`;

//search
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

//humid, wind
  let humidity = response.data.main.humidity;
  let currentHumidity = document.querySelector(".humidity");
  currentHumidity.innerHTML = ` ${humidity} %`;

  let wind = response.data.wind.speed;
  let currentWind = document.querySelector(".wind-speed");
  currentWind.innerHTML = ` ${wind} km/h`;
}

let iconElement = document.querySelector(".cloud-emoji");
iconElement.setAttribute(
  "src",
  `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt, response.data.weather[0].description");  


function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector(".search-bar");
  let humidity = document.querySelector(".search-bar");
  let wind =document.querySelector(".search-bar");
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

// Fahrenheit, Celsius conversion
function convertToFahren(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".sixteen-degree");
  celsiusLink.classList.remove(".active");
  fahrenheitLink.classList.add(".active");
  let fahrenheitElement = (celsiusElement * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitElement);

}

function convertToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector(".sixteen-degree");
  temperatureElement.innerHTML = Math.round(celsiusElement);
}

let celsiusElement = 5;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahren);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertToCelsius);

//humidity add!!

let humidityElement = document.querySelector(".humidity");
let windElement = document.querySelector(".wind-speed");

humidityElement.innerHTML = response.data.temperature.humidity;
windElement.innerHTML = Math.round(response.data.wind.speed);



