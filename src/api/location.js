import axios from "axios";
import { mapboxToken } from "./config";

const baseUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/";

export async function getLocationName(location) {
  const { latitude, longitude } = getLocation();

  const data = {
    // limit:1,
    access_token: mapboxToken,
  };

  const params = new URLSearchParams(data);
  //   axios.get(
  //     "https://api.mapbox.com/geocoding/v5/mapbox.places/4.672024652546668,50.913224452359685.json?limit=1&access_token=pk.eyJ1IjoiZHJza3VuayIsImEiOiJja3ZndW4xYmQwM2FkMnZuMG9rY3ozeXFyIn0.eJOp4rEskG_p-HoUdOgYAQ"
  //   );
  const endpoint = `${baseUrl}${latitude},${longitude}.json?${params.toString()}`;

  try {
    const { data } = await axios.get(endpoint);
    console.log(data);

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Invalid API request");
  }
}
