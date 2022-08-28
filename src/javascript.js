//current time
let now = new Date();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Monday", "Tuesday", "Wednesday", "Thursday"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `  
          <div class="col-3">
            <div class="in-card">${day}</div>
            <img 
            src="http://openweathermap.org/img/wn/10d@2x.png" 
            alt="" 
            width="42"/>
            <div class="degreein in-card">
              <span class="weather-forecast-temperature-max">18°</span> |
              <span class="weather-forecast-temperature-min">12°</span>
            </div>
          </div>
        `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//from celsius to fahrenheit
function showWeather(response) {
  document.querySelector("#displayed-city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#maxTemperature").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#minTemperature").innerHTML = Math.round(
    response.data.main.temp_min
  );

  celsiusTemperature = response.data.main.temp;
}

function search(city) {
  let apiKey = "7fef5d169773c3ea2391e9aa3ffecb34";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}
function searchCurrentLocation(position) {
  let apiKey = "7fef5d169773c3ea2391e9aa3ffecb34";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}
function convertFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
function convertCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;

let day = days[now.getDay()];

let currentDay = document.querySelector("#current-time");
currentDay.innerHTML = `${day} ${hours}:${minutes}`;

let CurrentLocationButton = document.querySelector("#current-location");
CurrentLocationButton.addEventListener("click", currentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertCelsius);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

displayForecast();
search("New York");
