import { useState, useEffect } from 'react';
import { getTrip, getWeather } from '../services/api';
import { useParams } from 'wouter';
import { MapSingle } from '../components/features/Map/Trip';
import { IntroSection } from '../components/features/IntroSection';
import { SliderTrip } from '../components/features/Slider/SliderTrip';

import { Weather } from '../components/features/weather';
import { DateTrip } from '../components/ui/DateTrip';

export function TripDetails() {
  const [location, setLocation] = useState({});
  const [weather, setWeather] = useState({});
  const { city } = useParams();

  useEffect(() => {
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
        <div className=" flex flex-col gap-10 ">
          <div className="w-full flex flex-col lg:flex-row-reverse gap-8 ">
            {/* Slider Header */}
            <div className="relative w-full   lg:w-7/12">
              <div className="sticky top-10 z-50">
                <SliderTrip imagens={location.images} />
                {/*  <div className="absolute top-0 left-0  w-full pt-6 pl-6">
                  <IntroSection
                    title={location.country}
                    subtitle={location.city}
                    style="hero"
                  />
                </div> */}
              </div>
            </div>
            {/* Container */}
            <div className="flex flex-col w-full lg:w-5/12  gap-8">
              <article className="bg-gray-extralight relative rounded-md p-6">
                <div className="flex flex-col gap-4 pb-6">
                  <div className="flex flex-col gap-1 pb-4">
                    <IntroSection
                      title={location.country}
                      subtitle={location.city}
                      customCss="pb-2"
                    />
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
                {/* Clima */}

                <div>
                  <IntroSection title="Informações" customCss="pb-4" />
                  <Weather weather={weather} />
                </div>
              </article>
              {/* Mapa */}

              <div className="flex flex-col gap-4">
                <IntroSection title="Localizacão" customCss="pb-2" />
                <div>
                  <MapSingle location={location} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
