import { useState, useEffect } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { Link } from 'wouter';
import Style from './style.module.css';

import { getAllTrips } from '@/services/api';
import { IntroSection } from '@/components/features/IntroSection';
import { Card } from '@/components/card';
import { Button } from '@/components/ui/Button';

export function SliderLastTrip() {
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadViagens() {
      const data = await getAllTrips();
      const sortedTrips = data.locations.sort(
        (a, b) => new Date(b.date) - new Date(a.date),
      );
      setLocations(sortedTrips);
      setIsLoading(false);
    }
    loadViagens();
  }, []);

  const options = {
    type: 'loop',
    perPage: 4,
    perMove: 1,
    pagination: false,
    autoplay: true,
    interval: 3000,
    speed: 1000,
    easing: 'ease-in-out',
    with: '100%',
    breakpoints: {
      640: {
        fixedWidth: '60%',
      },
    },
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="container mx-auto px-5">
        <IntroSection
          title="Nossas Últimas"
          subtitle="20 Viagens"
          customCss="md:items-center"
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Carregando...</span>
          </div>
        </div>
      ) : (
        <Splide options={options} className={Style.splide} autoPlay={true}>
          {locations.slice(0, 20).map((location) => (
            <SplideSlide key={location.id} className={Style.splide__slide}>
              <Link to={`/trips/${location.id}`}>
                <div>
                  <Card location={location} />
                </div>
              </Link>
            </SplideSlide>
          ))}
        </Splide>
      )}

      <div className="container mx-auto px-5">
        <div className="flex justify-center">
          <Link href="/trips">
            <Button>Ver todas as viagens</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
