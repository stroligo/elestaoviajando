import { useState, useEffect } from 'react';
import { getTrip, getWeather } from '../services/api';
import { useParams } from 'wouter';
import { MapSingle } from '../components/features/Map/MapSingle';
import { IntroSection } from '../components/features/IntroSection';
import { SliderTrip } from '../components/features/Slider/SliderTrip';
import { DateTrip } from '../components/features/DateTrip';
import { Weather } from '../components/features/weather';

export function Travel() {
  const [location, setLocation] = useState({});
  const [weather, setWeather] = useState({});
  const { city } = useParams();

  useEffect(() => {
    /**
     * Loads travel data for a given city.
     * Retrieves and sets location data and weather data
     * based on the city parameter obtained from URL.
     * Logs error to console if data fetching fails.
     */
    async function loadViagem() {
      if (city) {
        try {
          const locationData = await getTrip(city);
          setLocation(locationData);
          const weatherData = await getWeather(city);
          setWeather(weatherData);
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
        <div className=" flex flex-col  md:flex-row gap-10">
          <div className="w-full md:w-8/12 flex flex-col gap-6">
            {/* Header */}
            <div className="relative">
              <SliderTrip imagens={location.images} />
              <div className="absolute top-0 left-0  w-full pt-6 pl-6">
                <IntroSection
                  title={location.country}
                  subtitle={location.city}
                  style="hero"
                />
              </div>
            </div>
            {/* Container */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center mb-4">
                <IntroSection subtitle="Nossa viagem" customCss="pb-0" />
                <DateTrip date={location.date} />
              </div>
              <div>
                {Array.isArray(location.description) &&
                  location.description.length > 0 &&
                  location.description.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
              </div>
            </div>
          </div>
          <div className="w-full md:w-4/12">
            <div className="flex flex-col gap-4 md:gap-8">
              <div>
                <IntroSection title="Informações" customCss="pb-4" />
                <Weather weather={weather} />
              </div>
              <div>
                <IntroSection title="Localizacão" customCss="pb-4" />
                <MapSingle location={location} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
