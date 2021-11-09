import axios from "axios";
import store from "../store";
import { i18n } from "../i18n";
import { defaultSearchLimit, mapboxToken } from "./config";

const mapBoxBaseUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
const getLocationUrl = "https://ipapi.co/json";

/**
 * @typedef {Object} Location
 * @property {number} latitude - Latitude of the location
 * @property {number} longitude - Longitude of the location
 */

/**
 * @typedef {Object} Feature
 * @property {string} name - Name of the location
 * @property {Location} coordinates - Location coordinates
 */

/**
 * Get the location name based on latitude and longitude
 * @param {Location} location - Location object
 * @returns {Promise<string>}
 */
export async function getNameFromPosition(location) {
  const { latitude, longitude } = location;

  const data = await doRequest(`${longitude},${latitude}`);
  if (data.features.length === 0) {
    return null;
  }
  return data.features[0].place_name;
}

/**
 * Get the location coordinates based on location name
 * @param  locationName - Name of the location
 * @returns {Promise<Location>}
 */
export async function getPositionFromName(locationName) {
  const data = await doRequest(locationName);
  if (data.features.length === 0) {
    return null;
  }
  const [longitude, latitude] = data.features[0].center;
  return { longitude, latitude };
}

/**
 *
 * @param {string} text - Text to search for
 * @returns {Promise<Feature[]>} - List of search results
 */
export async function search(text) {
  const data = await doRequest(text, defaultSearchLimit);
  if (data.features.length === 0) {
    return [];
  }
  const features = data.features.map(({ place_name, center }) => ({
    name: place_name,
    coordinates: { longitude: center[0], latitude: center[1] },
  }));
  return features;
}

/**
 * Set the location info based on the requesting IP address
 */
export async function setUserLocationFromIp() {
  const { latitude, longitude, city } = (await axios.get(getLocationUrl)).data;
  store.commit("setLocation", {
    latitude,
    longitude,
  });
  store.commit("setLocationName", city);
}

/**
 * Request user location from the browser and set it in the store
 */
export async function setUserLocationFromBrowser() {
  if (!("geolocation" in navigator)) {
    return;
  }

  const { latitude, longitude } = (
    await new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    })
  ).coords;
  store.dispatch("setLocation", { latitude, longitude });

  const name = await getNameFromPosition(store.state.location);
  if (name) {
    store.dispatch("setLocationName", name);
  }
}

/**
 * @param {string|string[]} queryParams - Query parameters
 * @param {number} [limit] - Limit of results
 * @throws Will throw on invalid API request
 * @returns {Promise<Object>} - Response of webrequest
 */
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
    throw new Error(t("mapbox.apiError"));
  }
}
