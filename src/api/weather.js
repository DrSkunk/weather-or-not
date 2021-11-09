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
 * @property {number} [minimumTemperature] - Minimum temperature in Kelvin
 * @property {number} [maximumTemperature] - Maximum temperature in Kelvin
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
 * @throws Will throw error on invalid key, location or locale
 * @returns {WeatherForecast} The weather forecast for today and the next 7 days
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
  const params = new URLSearchParams(data).toString();
  const endpoint = `${baseUrl}onecall?${params}`;

  try {
    const { data } = await axios.get(endpoint);
    const result = {};
    result.current = parseDayForecast(data.current);
    result.daily = data.daily.slice(1).map(parseDayForecast);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error(t("openweathermap.apiError"));
  }
}

/**
 * Convert OpenWeather API response into the internal day forecast object
 * @param {Object} dayForecast - The day forecast to parse
 * @returns {DayForecast} The parsed day forecast
 */
function parseDayForecast(dayForecast) {
  const result = {
    date: new Date(dayForecast.dt * 1000),
    icon: dayForecast.weather[0].icon,
    description: dayForecast.weather[0].description,
    sunrise: new Date(dayForecast.sunrise * 1000),
    sunset: new Date(dayForecast.sunset * 1000),
    pressure: dayForecast.pressure,
    humidity: dayForecast.humidity,
    windDegree: dayForecast.wind_deg,
    windDirection: degreeToWindDirection(dayForecast.wind_deg),
    windSpeed: dayForecast.wind_speed,
    beaufort: msToBeaufort(dayForecast.wind_speed),
    temperature: dayForecast.temp,
  };
  if (dayForecast.temp) {
    result.minimumTemperature = dayForecast.temp.min;
    result.maximumTemperature = dayForecast.temp.max;
  }
  return result;
}

/**
 * Get weather forecast of a day in the past five days based on the given location
 * {@link https://openweathermap.org/api/one-call-apiSource API reference}
 * @param {Date} date - The date for which to get the weather forecast
 * @param {Object} location - The location for which to get the weather forecast
 * @throws Will throw error on invalid key, date, location or locale
 * @returns {DayForecast} The weather forecast for the given day and location
 */
export async function getHistoricalWeatherForecast(
  date,
  { latitude, longitude }
) {
  const { t } = i18n.global;
  const data = {
    appid,
    lat: latitude,
    lon: longitude,
    dt: Math.round(date / 1000),
    lang: t("openweathermap.locale"),
  };

  const params = new URLSearchParams(data).toString();
  const endpoint = `${baseUrl}onecall/timemachine?${params}`;

  try {
    const { data } = await axios.get(endpoint);
    return parseDayForecast(data.current);
  } catch (error) {
    console.error(error);
    throw new Error(t("openweathermap.apiError"));
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
