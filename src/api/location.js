import axios from "axios";
import store from "@/store";
import { i18n } from "@/i18n";
import { defaultSearchLimit, mapboxToken } from "./config";

const mapBoxBaseUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
const getLocationUrl = "https://ipapi.co/json";

export async function getNameFromPosition(location) {
  const { latitude, longitude } = location;

  const data = await doRequest(`${longitude},${latitude}`);
  if (data.features.length === 0) {
    return null;
  }
  return data.features[0].context[1].text;
}

export async function getPositionFromName(location) {
  const data = await doRequest(location);
  if (data.features.length === 0) {
    return null;
  }
  const [longitude, latitude] = data.features[0].center;
  return { longitude, latitude };
}

export async function search(text) {
  const data = await doRequest(text, defaultSearchLimit);
  if (data.features.length === 0) {
    return [];
  }
  const locations = data.features.map(({ place_name, center }) => ({
    name: place_name,
    coordinates: { longitude: center[0], latitude: center[1] },
  }));
  return locations;
}

async function doRequest(queryParams, limit = 1) {
  const { t } = i18n.global;
  const data = {
    limit,
    access_token: mapboxToken,
    language: t("mapbox.locale"),
  };

  const query = Array.isArray(queryParams)
    ? queryParams.join(",")
    : queryParams;

  const params = new URLSearchParams(data);
  const endpoint = `${mapBoxBaseUrl}${query}.json?${params.toString()}`;

  try {
    const { data } = await axios.get(endpoint);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Invalid API request");
  }
}

export async function setUserLocationFromIp() {
  const { latitude, longitude, city } = (await axios.get(getLocationUrl)).data;
  store.commit("setLocation", {
    latitude,
    longitude,
  });
  store.commit("setLocationName", city);
}

export async function setUserLocationFromBrowser() {
  if (!("geolocation" in navigator)) {
    return;
  }

  const { latitude, longitude } = await new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  }).coords;
  store.dispatch("setLocation", { latitude, longitude });

  const name = await getNameFromPosition(store.state.location);
  if (name) {
    store.dispatch("setLocationName", name);
  }
}
