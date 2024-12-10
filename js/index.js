getforecast("cairo");
let apiKey = "d13edda706df4244a0a42849241012";
let current;
let city;
let forecast;


const searchInput = document.getElementById("search");

const submit = document.getElementById("submit");

let days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const monthNames = [
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

searchInput.addEventListener("keyup", function () {
    getforecast(searchInput.value);
});

async function getforecast(term) {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=d13edda706df4244a0a42849241012&q=${term}&days=7&aqi=no&alerts=no`
  );
  let responseData = await response.json();

  if (response.status >= 200 && response.status < 300) {
    current = responseData.current;
    city = responseData.location;
    forecast = responseData.forecast.forecastday;

    displayCurrent(current, city);
    displayForecast(forecast);
  }
}

function displayCurrent(c, l) {
    var e = new Date(l.localtime.replace(" ", "T"));
    let current = `
    <div >
      <div class="forecast">
        <div class="today">
          <div class="header d-flex justify-content-center align-items-center">
            <div class="day h2">${days[e.getDay()]}</div>
            <div class="date h2 ps-3">${e.getDate() +" "+ monthNames[e.getMonth()]}</div>
          </div>
          <div class="body text-center my-4">
            <div class="location h1 pb-3 ">${l.name}</div>
            <div class="degree">
              <div class="num h1 ">${c.temp_c} <sup>o</sup>C</div>
            </div>
            <div class="condition d-flex justify-content-center align-items-center pt-2">
             <div class="condition-text h3" width=120>${c.condition.text}</div>
            <div class="condition-img "><img src="https:${c.condition.icon}" alt="" width=120></div>
            </div>
           
          </div>
          <div class="footer text-center pb-3">
           <span class="humidity pe-2"><i class="fa-solid fa-water"></i> ${c.humidity}%</span>
           <span class="wind-speed pe-2  "><i class="fa-solid fa-wind"></i> ${c.wind_kph}km/h</span>
           <span class="wind-dir"><i class="fa-regular fa-compass"></i> ${c.wind_dir}</span>
          </div>
          </div>
        </div>
      </div>`;
  
    document.getElementById("forecast").innerHTML = current;
  }
  function displayForecast(f) {
    let forecastdays = "";
    for (let i = 1; i < f.length; i++) {
      forecastdays += `
      <div class="col-md-4">
        <div class="forecast text-center">
          <div class="today">
            <div class="header">
              <div class="day mb-2">${days[new Date(f[i].date.replace(" ","T")).getDay()]}</div>
            </div>
            <div class="body mb-4 ">
              <div class="location h2 pb-3 ">${city.name}</div>
              <div class="degree">
                <div class="num maxtemp h4">Max: ${f[i].day.maxtemp_c} <sup>o</sup>C</div>
                <div class="num mintemp h4">Min: ${f[i].day.mintemp_c} <sup>o</sup>C</div>
                <div class="num avgtemp h4">AVG: ${f[i].day.avgtemp_c} <sup>o</sup>C</div>
                <div class="icon"></div>
              </div>
              <div class="conditioncondition d-flex justify-content-center align-items-center pt-2">
              <div class="condition-text ">${f[i].day.condition.text}</div>
              <div class="condition-img "><img src="https:${f[i].day.condition.icon}" alt="" width=48></div>
              </div>
              
            </div>
            <div class="footer mb-5">
             <span class="humidity pe-2"><i class="fa-solid fa-water"></i> Avg H: ${f[i].day.avghumidity}%</span>
             <span class="wind-speed pe-2  "><i class="fa-solid fa-wind"></i> Max W: ${f[i].day.maxwind_kph}km/h</span>
             <span class="rain"><i class="fa-solid fa-cloud-rain"></i> Rain: ${f[i].day.daily_will_it_rain}</span>
            </div>
          </div>
        </div>
      </div>`;
    }
  
    document.getElementById("rowData").innerHTML = forecastdays;
  }
  