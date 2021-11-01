import axios from "axios";

const baseUrl = "https://api.openweathermap.org/data/2.5/";
const location = { lat: 50.8758, lon: 4.7314 };
const appid = import.meta.env.VITE_OPENWEATHER_API_KEY;

// https://openweathermap.org/api/one-call-api
export async function oneCall() {
  const data = {
    appid,
    lat: location.lat,
    lon: location.lon,
  };
  const excludeOptions = ["minutely", "hourly", "alert"];
  if (excludeOptions.length !== 0) {
    data.exclude = excludeOptions.join(",");
  }
  const params = new URLSearchParams(data);
  const endpoint = `${baseUrl}onecall?${params.toString()}`;

  try {
    const { data } = await axios.get(endpoint);
    console.log(data);
    const result = {};
    result.current = data.current;
    result.daily = data.daily.slice(1);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Invalid API request");
  }
}
