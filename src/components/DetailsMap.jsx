import { useState, useEffect } from 'react';

export default function DetailsMap({ placeId }) {
  const [placeDetails, setPlaceDetails] = useState(null);

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=AIzaSyCHT_DQUhRKEr3eKVvdDUIdxIIc1LvSR0o`;
      const response = await fetch(url, { mode: 'no-cors' });
      const data = await response.text();
      console.log(data); // Adicione esse console.log para verificar a resposta do servidor
      if (data !== '') {
        setPlaceDetails(JSON.parse(data).result);
      } else {
        console.log('Resposta do servidor vazia');
      }
    };
    fetchPlaceDetails();
  }, [placeId]);

  return (
    <div>
      Local:
      {placeDetails && (
        <div>
          <h2>{placeDetails.name}</h2>
          <p>{placeDetails.formatted_address}</p>
        </div>
      )}
    </div>
  );
}
