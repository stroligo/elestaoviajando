import { Slugify } from '../utils/stringUtils';

export async function getAllTrips() {
  const response = await fetch('/data/viagens.json');
  return await response.json();
}

export async function getTripByCity(city) {
  const response = await fetch('/data/viagens.json');
  const data = await response.json();
  const viagem = data.locations.find((location) => {
    const citySlug = Slugify(location.city);
    return citySlug === city;
  });
  return viagem;
}
