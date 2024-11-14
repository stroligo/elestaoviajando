const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const fetchPlaceDetails = async (placeId) => {
  const url = `/maps/api/place/details/json?place_id=${placeId}&key=${googleMapsApiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error('Error fetching place details:', error);
    return null;
  }
};

const fetchPlaceData = async (placeId) => {
  const url = `/maps/api/place/details/json?place_id=${placeId}&key=${googleMapsApiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching place data:', error);
    return null;
  }
};

export { fetchPlaceDetails, fetchPlaceData };
