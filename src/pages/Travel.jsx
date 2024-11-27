import { useState, useEffect } from 'react';
import { getTripByCity } from '../services/api';
import { useParams } from 'wouter';
import { MapSingle } from '../components/map/MapSingle';
import { IntroSection } from '../components/features/IntroSection';
import { SliderTrip } from '../components/slider/SliderTrip';
import { DateTrip } from '../components/features/DateTrip';

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
    <div className="container py-5 md:py-10 mx-auto flex px-5 md:px-0  flex-col">
      {location && location.city && (
        <div className=" flex flex-col  md:flex-row gap-8">
          <div className="w-full md:w-8/12">
            <IntroSection title={location.country} subtitle={location.city} />

            <div className="pb-10">
              <DateTrip date={location.date} />

              <p>{location.description}</p>
            </div>

            <SliderTrip imagens={location.images} />
          </div>
          <div className="w-full md:w-4/12">
            <div className="flex md:hidden">
              <IntroSection subtitle="Mapa" />
            </div>
            <MapSingle location={location} />
          </div>
        </div>
      )}
    </div>
  );
}
