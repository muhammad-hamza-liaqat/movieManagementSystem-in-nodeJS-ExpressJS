
const WeatherModel = require("./Models/weatherModel");

async function getWeather() {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=31.5497&lon=74.3436&appid=65e6e54a1cad67cf9e26505200fabeda`
    );

    if (!response.ok) {
      throw new Error("Unable to find the data through API");
    }

    const apiResponseInJSON = await response.json();

    const cityName = apiResponseInJSON.name;
    const cityTemperature = apiResponseInJSON.main.temp;

    const cityHumidity = apiResponseInJSON.main.humidity;
    const cityWind = apiResponseInJSON.wind;

    const lastUpdated = new Date();

    const weatherData = {
      cityName,
      temperature: cityTemperature,
      humidity: cityHumidity,
      wind: cityWind,
      lastUpdated,
    };

    const newWeatherData = new WeatherModel(weatherData);
    await newWeatherData.save();

    return weatherData;
  } catch (error) {
    console.error("Error processing weather data:", error);
    throw error;
  }
}

module.exports = getWeather;
