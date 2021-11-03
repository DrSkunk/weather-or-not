import axios from "axios";
import { defaultSearchLimit, mapboxToken } from "./config";
import store from "../store";

const baseUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/";

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
  const data = {
    limit,
    access_token: mapboxToken,
    language: store.getters.locale,
  };

  const query = Array.isArray(queryParams)
    ? queryParams.join(",")
    : queryParams;

  const params = new URLSearchParams(data);
  const endpoint = `${baseUrl}${query}.json?${params.toString()}`;

  try {
    const { data } = await axios.get(endpoint);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Invalid API request");
  }
}
