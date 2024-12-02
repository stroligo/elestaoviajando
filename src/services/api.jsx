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
export async function conectData() {
  const response = await fetch('/data/data.json');
  return await response.json();
}

export async function getTrip(id) {
  const response = await fetch('/data/data.json');
  const data = await response.json();
  const dataId = data.trip.find((trip) => trip.id === id);
  return dataId;
}

export async function getBlog(id) {
  const response = await fetch('/data/data.json');
  const data = await response.json();
  const dataId = data.blog.find((blog) => blog.id === id);
  return dataId;
}

export async function getWeather(lat, lon) {
  if (!lat || !lon) {
    throw new Error('Latitude e longitude são obrigatórias');
  }

  const API_KEY = 'be16c876a4dd3f05bb88eeeef8d8e7fd';
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  const response = await fetch(url);
  return await response.json();
}
