import { useState, useEffect } from 'react';
import { getViagemById } from '../services/api';
import { useParams } from 'wouter';

export function Travel() {
  const [location, setLocation] = useState({});
  const { id } = useParams();

  useEffect(() => {
    async function loadViagem() {
      if (id) {
        try {
          const location = await getViagemById(id);
          setLocation(location);
        } catch (error) {
          console.error('Error:', error);
        }
      }
    }
    loadViagem();
  }, [id]);

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
