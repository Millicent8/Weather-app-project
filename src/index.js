let now = new Date();

function formateTime() {
  let currentHour = document.querySelector("#current-Time");
  let hour = now.getHours();
  let minutes = now.getMinutes();
  currentHour.innerHTML = `${hour}:${minutes}`;
}

formateTime();

function formateDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "September",
    "October",
    "November",
    "December"
  ];
  let day = days[now.getDay()];
  let month = months[now.getMonth()];
  let date = now.getDate();
  let year = now.getFullYear();
  let currentDay = document.querySelector("#current-Date");
  currentDay.innerHTML = `${day} ${date} ${month} ${year}`;
}

formateDate();

function showCurrentTemperature(response) {
  document.querySelector("#current-City").innerHTML = response.data.name;
  let celciusTemperature = Math.round(response.data.main.temp);
  let celciusMin = Math.round(response.data.main.temp_min);
  let replacmentTemperature = document.querySelector("#automatic-reading");
  replacmentTemperature.innerHTML = `${celciusTemperature}°C | ${celciusMin}°C`;
}

function search(city) {
  let apiKey = "25c5997bc71299b7ffa2b6572f41f1d0";
  let defaultUnit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${defaultUnit}`;
  axios.get(`${apiUrl}`).then(showCurrentTemperature);
}

function isCity(event) {
  event.preventDefault();
  let apiKey = "25c5997bc71299b7ffa2b6572f41f1d0";
  let defaultUnit = "metric";
  let location = document.querySelector("#new-City");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location.value}&appid=${apiKey}&units=${defaultUnit}`;
  axios.get(`${apiUrl}`).then(showCurrentTemperature);
}

let newCity = document.querySelector("#city-Search");
newCity.addEventListener("submit", isCity);

function showFarenheitTemperature(response) {
  let farenheitTemperature = Math.round(response.data.main.temp);
  let farenheitMin = Math.round(response.data.main.temp_min);
  document.querySelector(
    "#automatic-reading"
  ).innerHTML = `${farenheitTemperature}°F | ${farenheitMin}°F`;
}

function farenheit(event) {
  event.preventDefault();
  let apiKey = "25c5997bc71299b7ffa2b6572f41f1d0";
  let unitF = "imperial";
  let location = document.querySelector("#new-City");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location.value}&appid=${apiKey}&units=${unitF}`;
  axios.get(`${apiUrl}`).then(showFarenheitTemperature);
}

let changeTemperature = document.querySelector("#farenheit");
changeTemperature.addEventListener("click", farenheit);

function showCelciusTemperature(response) {
  let temperature = response.data.main.temp;
  let temperatureMin = Math.round(response.data.main.temp_min);
  document.querySelector(
    "#automatic-reading"
  ).innerHTML = `${temperature}°C | ${temperatureMin}°C`;
}
function isCelcius(event) {
  event.preventDefault();
  let apiKey = "25c5997bc71299b7ffa2b6572f41f1d0";
  let unitC = "metric";
  let location = document.querySelector("#new-City");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location.value}&appid=${apiKey}&units=${unitC}`;
  axios.get(apiUrl).then(showCelciusTemperature);
}

let returnTemperature = document.querySelector("#celcius");
returnTemperature.addEventListener("click", isCelcius);

function showLocationTemperature(response) {
  let temp = Math.round(response.data.main.temp);
  let tempMin = Math.round(response.data.main.temp_min);
  document.querySelector(
    "#automatic-reading"
  ).innerHTML = `${temp}°C | ${tempMin}°C`;
}
function currentLocale(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "25c5997bc71299b7ffa2b6572f41f1d0";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showLocationTemperature);
}

function isLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocale);
}

let getCurrentTemp = document.querySelector("#Location");
getCurrentTemp.addEventListener("click", isLocation);

search("London");
