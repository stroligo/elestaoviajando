import { useState, useEffect } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { getAllTrips } from '../../../services/api';
import { Link } from 'wouter';
/* import { Slugify } from '../../utils/stringUtils'; */
import { Card } from '../../card';
import { IntroSection } from '../IntroSection';
import Style from './style.module.css';

import { Button } from '../../ui/Button';

/**
 * LastTrips component fetches and displays the last 10 trips using a carousel slider.
 *
 * This component utilizes the Splide library for displaying trips in a looped slider
 * format with autoplay functionality and responsive breakpoints. It fetches trip data
 * from the API and updates the state with the locations to be displayed.
 *
 * The component includes:
 * - An introductory section with a title and subtitle.
 * - A carousel slider showing the last 10 trips, each as a card with a link to its detail page.
 * - A button linking to the page with all trips.
 */
export function LastTrips() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    async function loadViagens() {
      const data = await getAllTrips();
      const sortedTrips = data.locations.sort(
        (a, b) => new Date(b.date) - new Date(a.date),
      );
      setLocations(sortedTrips);
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

      <Splide options={options} className={Style.splide} autoPlay={true}>
        {locations.slice(0, 20).map((location) => (
          <SplideSlide key={location.id} className={Style.splide__slide}>
            <Link to={`/trips/${location.trip}`}>
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
