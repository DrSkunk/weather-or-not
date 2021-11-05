import axios from "axios";
import { i18n } from "@/i18n";
import store from "@/store";
import { openWeatherApiKey } from "./config";
import {
  kelvinToCelsius,
  kelvinToFahrenheit,
  msToBeaufort,
} from "./unitConversion";
import temperatureScale from "./temperatureScale";

const baseUrl = "https://api.openweathermap.org/data/2.5/";
const appid = openWeatherApiKey;

// https://openweathermap.org/api/one-call-api
export async function oneCall({ latitude, longitude }) {
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
  const endpoint = `${baseUrl}onecall?${params.toString()}`;

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
      windSpeed: data.current.wind_speed,
      beaufort: msToBeaufort(data.current.wind_speed),
      temperature: convertTemperature(data.current.temp),
      minimumTemperature: convertTemperature(data.daily[0].temp.min),
      maximumTemperature: convertTemperature(data.daily[0].temp.max),
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
      windSpeed: day.wind_speed,
      beaufort: msToBeaufort(day.wind_speed),
      temperature: convertTemperature(day.temp.day),
      minimumTemperature: convertTemperature(day.temp.min),
      maximumTemperature: convertTemperature(day.temp.max),
    }));
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Invalid API request");
  }
}

function convertTemperature(temperature) {
  switch (store.state.temperatureScale) {
    case temperatureScale.CELSIUS:
      return kelvinToCelsius(temperature);
    case temperatureScale.FAHRENHEIT:
      return kelvinToFahrenheit(temperature);
    default:
      throw new Error("Invalid temperature scale");
  }
}
