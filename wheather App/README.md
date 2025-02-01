# Weather App

## Overview

This is a simple Weather App that fetches real-time weather data from the OpenWeather API. It provides weather details such as temperature, humidity, and weather conditions based on the user's search query or geolocation.

## Features

- Search for weather data by city name.
- Automatically detect the user's location and fetch weather data.
- Toggle between Celsius (°C) and Fahrenheit (°F) for temperature display.
- Display weather icons from the API response.
- Dynamic background changes based on weather conditions.
- Error handling for invalid city names and network issues.

## Technologies Used

- HTML
- CSS
- JavaScript (Vanilla JS with XMLHttpRequest)
- OpenWeather API

## Setup Instructions

1. **Clone the Repository**

   ```sh
   git clone <repository-url>
   cd weather-app
   ```

2. **Obtain API Key**

   - Sign up at [OpenWeather](https://openweathermap.org/) to get an API key.

3. **Run the App Locally**

   - Open `index.html` in a web browser.
   - No need to do any additional server setup.

## Challenges and Solutions

### 1. **Geolocation Handling**

- **Challenge**: Users may deny location access.
- **Solution**: Display an error message and allow manual search as a fallback.

### 2. **CORS and API Response Handling**

- **Challenge**: Handling API request failures due to incorrect API key or network issues.
- **Solution**: Implement error handling using `onerror` and `onload` methods in `XMLHttpRequest`.

### 3. **Dynamic Backgrounds Based on Weather**

- **Challenge**: Mapping API weather conditions to suitable background images.
- **Solution**: Created a function that assigns appropriate background images based on weather conditions.

## File Structure

```
/weather-app/
│-- index.html
│-- style.css
│-- app.js
│-- README.md
```

## Credits

- OpenWeather API for weather data
- Free stock images for background changes

## License

This project is open-source and available for modification and distribution.

# wheatherApp
