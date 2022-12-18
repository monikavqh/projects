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
if (hours < 10) {
  hours = `0${hours}`;
}
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}


function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
          <div class="col">
            <div class="weather-forecast-date">${formatDay(
              forecastDay.dt
            )}</div>
            <img
              src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt=""
              width="42"
            />
            <div class="weather-forecast-temperatures">
              <span class="weather-forecast-temperature-max"> ${Math.round(
                forecastDay.temp.max
              )}°</span>
              <span class="weather-forecast-temperature-min">${Math.round(
                forecastDay.temp.min
              )}°</span>
            </div>
          </div>
      `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "5aac6d0188c6f17d6d2bbe6591b6fef0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

//search
let citySearch = document.querySelector("#search-form");
citySearch.addEventListener("submit", searchCity);


function displayCurrentLocation() {
  navigator.geolocation.getCurrentPosition(setPosition);
}

function displayWeather(response) {
  console.log(response.data);
  let city = response.data.name;
  let currentCity = document.querySelector(".current-city");
  currentCity.innerHTML = city;
  let temperature = Math.round(response.data.main.temp);
  let cityTemperature = document.querySelector(".sixteen-degree");
  cityTemperature.innerHTML = `${temperature}°C`;
  let humidity = response.data.main.humidity;
  let currentHumidity = document.querySelector(".humidity");
  currentHumidity.innerHTML = ` ${humidity} %`;
  let wind = response.data.wind.speed;
  let currentWind = document.querySelector(".wind-speed");
  currentWind.innerHTML = ` ${wind} km/h`;
  document.querySelector(".weather-description").innerHTML =
    response.data.weather[0].description;
  let emoji = document.querySelector(".emoji-icon");
  emoji.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  emoji.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector(".search-bar");
  let humidity = document.querySelector(".search-bar");
  let wind = document.querySelector(".search-bar");
  let description = document.querySelector(".search-bar");
  let apiKey = "af01fd994ae220754a5ce37013724a3a";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=${unit}&appid=${apiKey}`;
  console.log(axios);
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
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.remove(".active");
  let fahrenheitElement = (celsiusElement * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitElement);
}

function convertToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add(".active");
  fahrenheitLink.classList.remove(".active");
  let temperatureElement = document.querySelector(".sixteen-degree");
  temperatureElement.innerHTML = Math.round(celsiusElement);
}

let celsiusElement = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahren);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertToCelsius);

//humidity + wind

let humidityElement = document.querySelector(".humidity");
let windElement = document.querySelector(".wind-speed");

// humidityElement.innerHTML = response.data.temp.humidity;
// windElement.innerHTML = Math.round(response.data.wind.speed);
