//current day and time
let now = new Date();
let currentDate = document.querySelector("#date");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let date = now.getDate();
let months = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let month = months[now.getMonth()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
currentDate.innerHTML = `${day}, ${date} ${month}. ${hour}:${minute}`;

//Replace the default city with the search value
function search(city) {
  let apiKey = "515c9ddbeb3cda9061acfab71031839e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-in").value;
  search(city);
}
let theCity = document.querySelector("#search-form");
theCity.addEventListener("submit", searchCity);
let button = document.querySelector("#s-button");
button.addEventListener("click", searchCity);

function showWeather(response) {
  document.querySelector("h2").innerHTML = response.data.name;
  document.querySelector("#desc").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#currentTemperature").innerHTML = Math.round(
    response.data.main.temp
  );
  
  function handleCelsius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#currentTemperature");
  tempElement.innerHTML = "☀️66°";
}

function handleFahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#currentTemperature");
  tempElement.innerHTML = "☀️19°";
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", handleFahrenheit);
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", handleCelsius);
  
  document.querySelector("#pressure").innerHTML = response.data.main.pressure;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  //console.log(response.data)
}
function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(theLocation);
}
function theLocation(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "0dc40d3d7cda209ca40e77430c74cf57";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

let sbutton = document.querySelector("#c-button");
sbutton.addEventListener("click", currentLocation);

search("Kyiv");

///Name of the city after searching
function cityName(event) {
  event.preventDefault();
  let cityDisplay = document.querySelector("#city-input");
  let currentCity = document.querySelector("#city");
  if (cityDisplay.value) {
    currentCity.innerHTML = cityDisplay.value;
  } else {
    currentCity.innerHTML = null;
    alert("Please type a city");
    currentCity.innerHTML = "Nowhere";
  }
  let apiKey =
    "0fe8a8c3e267816d7e1a6e4de374af4d"; /*display searching city and temp part 11*/
  let urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${cityDisplay.value}&appid=${apiKey}&units=metric`;
  axios.get(urlWeather).then(locationWeather);
}
let city = document.querySelector("#search-form");
city.addEventListener("submit", cityName);
