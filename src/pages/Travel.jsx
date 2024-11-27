import { useState, useEffect } from 'react';
import { getTripByCity, getWeather } from '../services/api';
import { useParams } from 'wouter';
import { MapSingle } from '../components/map/MapSingle';
import { IntroSection } from '../components/features/IntroSection';
import { SliderTrip } from '../components/slider/SliderTrip';
import { DateTrip } from '../components/features/DateTrip';
import { Weather } from '../components/weather';

/**
 * Renders a travel page for a given city.
 * Retrieves and displays location data, weather data, and a map for the given city.
 * @param {string} city - the city to be displayed, as a slug.
 * @return {JSX.Element} - the travel page component.
 */
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
          const locationData = await getTripByCity(city);
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
        <div className=" flex flex-col  md:flex-row gap-8">
          <div className="w-full md:w-8/12">
            <IntroSection title={location.country} subtitle={location.city} />

            <div className="pb-10">
              <DateTrip date={location.date} />
            </div>

            <SliderTrip imagens={location.images} />
          </div>
          <div className="w-full md:w-4/12">
            <div className="flex flex-col gap-4 ">
              <div className="">
                <div className="flex md:hidden">
                  <IntroSection subtitle="Clima" />
                </div>
                <Weather weather={weather} />
              </div>
              <div className="">
                <div className="flex md:hidden">
                  <IntroSection subtitle="Mapa" />
                </div>
                <MapSingle location={location} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
