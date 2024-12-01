/* import { Slugify } from '../components/utils/stringUtils'; */

/**
 * Fetches all trip data from the trips JSON file.
 *
 * This function makes an asynchronous request to retrieve the data
 * from the specified JSON file containing trip information.
 *
 * @returns {Promise<Object>} A promise that resolves to an object
 * containing all the trips data.
 */
export async function getAllTrips() {
  const response = await fetch('/data/trips.json');
  return await response.json();
}

export async function getTrip(id) {
  const response = await fetch('/data/trips.json');
  const data = await response.json();
  const dataId = data.locations.find((location) => location.id === id);
  return dataId;
}

/**
 * Fetches weather data for a given city.
 *
 * This function makes an asynchronous request to the OpenWeatherMap API
 * to retrieve the current weather data for the given city.
 *
 * @param {string} city - The name of the city to get the weather data for.
 * @returns {Promise<Object>} - A promise that resolves to the weather data
 * object for the given city if found, otherwise undefined.
 */
export async function getWeather(city) {
  const API_KEY = 'be16c876a4dd3f05bb88eeeef8d8e7fd';

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
  const response = await fetch(url);
  return await response.json();
}
