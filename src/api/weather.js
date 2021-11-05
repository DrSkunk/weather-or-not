import axios from "axios";
import { i18n } from "../i18n";
import store from "../store";
import { openWeatherApiKey } from "./config";
import {
  degreeToWindDirection,
  kelvinToCelsius,
  kelvinToFahrenheit,
  msToBeaufort,
} from "./unitConversion";
import temperatureScale from "./temperatureScale";

const baseUrl = "https://api.openweathermap.org/data/2.5/";
const appid = openWeatherApiKey;

/**
 * @typedef {Object} DayForecast
 * @property {Date} date - Date of the forecast
 * @property {string} icon - Weather icon of the forecast {@link https://openweathermap.org/weather-conditions list of weather conditions}
 * @property {string} description - Forecast text,
 * @property {Date} sunrise - Date of the sunrise,
 * @property {Date} sunset - Date of the sunset,
 * @property {number} pressure - Atmospheric pressure in hPa,
 * @property {number} humidity - Humidity in %,
 * @property {number} windDegree - Wind direction in degrees,
 * @property {string} windDirection - Wind direction in localised cardinal direction,
 * @property {number} windSpeed - Wind speed in m/s
 * @property {number} beaufort - Wind speed in Beaufort scale
 * @property {number} temperature - Temperature in Kelvin
 * @property {number} minimumTemperature - Minimum temperature in Kelvin
 * @property {number} maximumTemperature - Maximum temperature in Kelvin
 */

/**
 * @typedef {Object} WeatherForecast
 * @property {DayForecast} daily - Weather forecast of today
 * @property {DayForecast[]} daily - Weather forecast of the next 7 days
 */

/**
 * Get weather forecast based on the given location
 * {@link https://openweathermap.org/api/one-call-apiSource API reference}
 * @param {Object} location - The location for which to get the weather forecast
 * @returns {WeatherForecast} The weather forecast
 */
export async function getWeatherForecast({ latitude, longitude }) {
  const { t } = i18n.global;
  const data = {
    appid,
    lat: latitude,
    lon: longitude,
    lang: t("openweathermap.locale"),
  };
  const excludeOptions = ["minutely", "hourly", "alert"];
  if (excludeOptions.length !== 0) {
    data.exclude = excludeOptions.join(",");
  }
  const params = new URLSearchParams(data);
  const endpoint = `${baseUrl}onecall?${params.tostring()}`;

  try {
    const { data } = await axios.get(endpoint);
    const result = {};
    result.current = {
      date: new Date(data.current.dt * 1000),
      icon: data.current.weather[0].icon,
      description: data.current.weather[0].description,
      sunrise: new Date(data.current.sunrise * 1000),
      sunset: new Date(data.current.sunset * 1000),
      pressure: data.current.pressure,
      humidity: data.current.humidity,
      windDegree: data.current.wind_deg,
      windDirection: degreeToWindDirection(data.current.wind_deg),
      windSpeed: data.current.wind_speed,
      beaufort: msToBeaufort(data.current.wind_speed),
      temperature: data.current.temp,
      minimumTemperature: data.daily[0].temp.min,
      maximumTemperature: data.daily[0].temp.max,
    };
    result.daily = data.daily.slice(1).map((day) => ({
      date: new Date(day.dt * 1000),
      icon: day.weather[0].icon,
      description: day.weather[0].description,
      sunrise: new Date(day.sunrise * 1000),
      sunset: new Date(day.sunset * 1000),
      pressure: day.pressure,
      humidity: day.humidity,
      windDegree: day.wind_deg,
      windDirection: degreeToWindDirection(day.wind_deg),
      windSpeed: day.wind_speed,
      beaufort: msToBeaufort(day.wind_speed),
      temperature: day.temp.day,
      minimumTemperature: day.temp.min,
      maximumTemperature: day.temp.max,
    }));
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Invalid API request");
  }
}

/**
 * Convert the given temperature in Kelvin to the localised temperature scale
 * @param {number} temperature  - Temperature in Kelvin
 * @returns {number} Temperature in the localised temperature scale
 */
export function convertTemperature(temperature) {
  switch (store.state.temperatureScale) {
    case temperatureScale.CELSIUS:
      return kelvinToCelsius(temperature);
    case temperatureScale.FAHRENHEIT:
      return kelvinToFahrenheit(temperature);
    default:
      throw new Error("Invalid temperature scale");
  }
}
