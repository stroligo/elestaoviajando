import { useState, useEffect } from 'react';
import { getTripByCity } from '../services/api';
import { useParams } from 'wouter';

export function Travel() {
  const [location, setLocation] = useState({});
  const { city } = useParams();

  useEffect(() => {
    async function loadViagem() {
      if (city) {
        try {
          const location = await getTripByCity(city);
          setLocation(location);
        } catch (error) {
          console.error('Error:', error);
        }
      }
    }
    loadViagem();
  }, [city]);

  return (
    <div>
      <h1>Viagem {location.id}</h1>
      <div>
        {location && location.city && (
          <div>
            <h1>Location: {location.city}</h1>
            <p>Description: {location.description}</p>
            {location.images &&
              location.images.map((image, index) => (
                <img src={`../${image}`} alt={location.city} key={index} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
