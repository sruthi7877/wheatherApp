document.addEventListener("DOMContentLoaded", function () {
  const searchBtn = document.getElementById("searchBtn");
  const cityInput = document.getElementById("city");
  const errorElement = document.getElementById("error");
  const weatherCard = document.getElementById("weatherCard");
  const weatherIcon = document.getElementById("weatherIcon");
  const cityName = document.getElementById("cityName");
  const temperature = document.getElementById("temperature");
  const description = document.getElementById("description");
  const humidity = document.getElementById("humidity");
  const container=document.getElementById("container")
  const unitToggle = document.getElementById("unitToggle");

  let currentUnit = "metric"; 
  const apiKey = "60df638744af473d2a30c640f44e34b3";

  function weatherImage(main){
    switch (main) {
      case "Clouds":
        container.style.background='url("https://www.thoughtco.com/thmb/EYThUyLlbrtjCQ-7z2q2Nc6LOWo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/548306131-56a9e2a33df78cf772ab3983.jpg")';
        break;
      case "Smoke":
        container.style.background='url("https://v.w-x.co/1687960759383_062823_SMOKE_IMPACTS_FORECAST_COMBO.jpg")';
        break;
      case "Haze":
        container.style.background='url("https://c.pxhere.com/photos/25/5b/sun_mist_field_fog_landscape_nature_morning_sunlight-792667.jpg!d")';
        break;
      case "Clear":
        container.style.background='url("https://www.teahub.io/photos/full/363-3632655_photo-wallpaper-clouds-nature-the-sky-clear-weather.jpg")';
        break;
      case "Snow":
        container.style.background='url("https://snowbrains.com/wp-content/uploads/2016/06/13502876_10153519052800653_6683864389039971594_o.jpg")';
        break;
      case "Rain":
        container.style.background='url("https://wallpaperset.com/w/full/5/8/8/32321.jpg")';
        break;
      default:
        container.style.background='url("https://www.teahub.io/photos/full/363-3632655_photo-wallpaper-clouds-nature-the-sky-clear-weather.jpg")';
        break
   }
  }

  function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${currentUnit}&appid=${apiKey}`;
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);

      xhr.onload = function () {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject("City not found, Please try another city");
        }
      };

      xhr.onerror = function () {
        reject("Network error");
      };

      xhr.send();
    });
  }

  // Get weather data based on geolocation (latitude, longitude)
  function fetchWeatherByLocation(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${currentUnit}&appid=${apiKey}`;
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);

      xhr.onload = function () {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject("Unable to fetch weather data for your location");
        }
      };

      xhr.onerror = function () {
        reject("Network error");
      };

      xhr.send();
    });
  }

  // Get the weather icon from the icon code
  function getWeatherIcon(iconCode) {
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    return `<img src="${iconUrl}" alt="Weather Icon" class="weather-icon-img">`;
  }

  function getWeatherByGeolocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          fetchWeatherByLocation(lat, lon)
            .then(data => {
              errorElement.textContent = "";
              weatherCard.classList.remove("hidden");
              weatherIcon.innerHTML = getWeatherIcon(data.weather[0].icon);
              cityName.textContent = data.name;
              temperature.textContent = `${data.main.temp}°${currentUnit === "metric" ? "C" : "F"}`;
              description.textContent = data.weather[0].description;
              humidity.textContent = `Humidity: ${data.main.humidity}%`;
              weatherImage(data.weather[0].main)
            })
            .catch(error => {
              weatherCard.classList.add("hidden");
              errorElement.textContent = error;
            });
        },
        function () {
          weatherCard.classList.add("hidden");
          errorElement.textContent = "Geolocation access denied!";
        }
      );
    } else {
      weatherCard.classList.add("hidden");
      errorElement.textContent = "Geolocation is not supported by this browser.";
    }
  }

  function toggleUnit() {
    currentUnit = currentUnit === "metric" ? "imperial" : "metric"; 
    const city = cityInput.value || cityName.textContent;
    if (city) {
      fetchWeather(city)
        .then(data => {
          weatherIcon.innerHTML = getWeatherIcon(data.weather[0].icon);
          cityName.textContent = data.name;
          temperature.textContent = `${data.main.temp}°${currentUnit === "metric" ? "C" : "F"}`;
          description.textContent = data.weather[0].description;
          humidity.textContent = `Humidity: ${data.main.humidity}%`;
        })
        .catch(error => {
          weatherCard.classList.add("hidden");
          errorElement.textContent = error;
        });
    }
  }

  searchBtn.addEventListener("click", function () {
    const city = cityInput.value;
    if (city) {
      fetchWeather(city)
        .then(data => {
          errorElement.textContent = "";
          weatherCard.classList.remove("hidden");
          weatherIcon.innerHTML = getWeatherIcon(data.weather[0].icon);
          cityName.textContent = data.name;
          temperature.textContent = `${data.main.temp}°${currentUnit === "metric" ? "C" : "F"}`;
          description.textContent = data.weather[0].description;
          humidity.textContent = `Humidity: ${data.main.humidity}%`;
          weatherImage(data.weather[0].main)
        })
        .catch(error => {
          weatherCard.classList.add("hidden");
          errorElement.textContent = error;
        });
    }
  });

  unitToggle.addEventListener("click", toggleUnit);

  getWeatherByGeolocation();
});

