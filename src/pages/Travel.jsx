import { useState, useEffect } from 'react';
import { getTripByCity } from '../services/api';
import { useParams } from 'wouter';
import { MapSingle } from '../components/map/MapSingle';
import { IntroSection } from '../components/features/IntroSection';

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
      {location && location.city && (
        <div className=" flex flex-row gap-8">
          <div className="w-8/12">
            <IntroSection title={location.country} subtitle={location.city} />

            <p>{location.description}</p>

            {location.images &&
              location.images.map((image, index) => (
                <img src={`../${image}`} alt={location.city} key={index} />
              ))}
          </div>
          <div className="w-4/12">
            <div>
              <MapSingle location={location} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
