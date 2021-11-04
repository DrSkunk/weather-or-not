import axios from "axios";
import { i18n } from "../i18n";
import { openWeatherApiKey } from "./config";
import { msToBeaufort } from "./unit";

const baseUrl = "https://api.openweathermap.org/data/2.5/";
const appid = openWeatherApiKey;

// https://openweathermap.org/api/one-call-api
export async function oneCall({ latitude, longitude }) {
  const { t } = i18n.global;
  const data = {
    appid,
    lat: latitude,
    lon: longitude,
    lang: t("openweathermap.lang"),
  };
  const excludeOptions = ["minutely", "hourly", "alert"];
  if (excludeOptions.length !== 0) {
    data.exclude = excludeOptions.join(",");
  }
  const params = new URLSearchParams(data);
  const endpoint = `${baseUrl}onecall?${params.toString()}`;

  try {
    msToBeaufort;
    const { data } = await axios.get(endpoint);
    const result = {};
    result.current = {
      date: new Date(data.current.dt * 1000),
      icon: data.current.weather[0].icon,
      description: data.current.weather[0].description,
      temperature: data.current.temp,
      sunrise: new Date(data.current.sunrise * 1000),
      sunset: new Date(data.current.sunset * 1000),
      pressure: data.current.pressure,
      humidity: data.current.humidity,
      windDegree: data.current.wind_deg,
      windSpeed: data.current.wind_speed,
      beaufort: msToBeaufort(data.current.wind_speed),
      minimumTemperature: data.daily[0].temp.min,
      minimumTemperature: data.daily[0].temp.max,
    };
    result.daily = data.daily.slice(1).map((day) => ({
      ...day,
      date: new Date(day.dt * 1000),
    }));
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Invalid API request");
  }
}
