import { useState, useEffect } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { getAllTrips } from '../../../services/api';
import { Link } from 'wouter';
import { Slugify } from '../../../utils/stringUtils';
import { Card } from '../../card';
import { IntroSection } from '../IntroSection';
import Style from './style.module.css';

import { Button } from '../../ui/Button';

export function LastTrips() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    async function loadViagens() {
      const data = await getAllTrips();
      setLocations(data.locations);
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
    easing: 'ease-in-out', // Adiciona um efeito de transição suave
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
          subtitle="10 Viagens"
          customCss="md:items-center"
        />
      </div>

      <Splide options={options} className={Style.splide} autoPlay={true}>
        {locations.slice(0, 10).map((location) => (
          <SplideSlide key={location.id} className={Style.splide__slide}>
            <Link to={`/trips/${Slugify(location.city)}`}>
              <div>
                <Card location={location} />
              </div>
            </Link>
          </SplideSlide>
        ))}
      </Splide>

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
