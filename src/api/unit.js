/**
 * Converts speed in meters per second to beaufort scale
 * {@link https://stackoverflow.com/a/60001992 Source on Stackoverflow}
 * @param {number} ms - the speed in meters per second
 * @returns {number} speed in beaufort
 */
export function msToBeaufort(ms) {
  return Math.ceil(Math.cbrt(Math.pow(ms / 0.836, 2)));
}

const zeroDegreesCelsius = 273.15;

/**
 * Converts temperature in kelvin to celsius
 * @param {number} kelvin - temperature in kelvin
 * @returns {number} temperature in celsius
 */
export function kelvinToCelsius(kelvin) {
  return Math.round(kelvin - zeroDegreesCelsius);
}

/**
 * Converts temperature in kelvin to fahrenheit
 * @param {number} kelvin - temperature in kelvin
 * @returns {number} temperature in fahrenheit
 */
export function kelvinToFahrenheit(kelvin) {
  return Math.round((kelvin - zeroDegreesCelsius) * 1.8 + 32);
}

/**
 * Convert wind direction in degrees to a compass point
 * @param {number} degree - wind direction in degrees
 * @returns {String} abbreviated wind direction
 */
export function degreeToWindDirection(degree) {
  const val = Math.round(degree / 22.5);
  const directions = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  return directions[val % 16];
}
