import PropTypes from 'prop-types';
import { Splide, SplideTrack } from '@splidejs/react-splide';
import Style from './style.module.css';

export function SliderLastTrip({ children }) {
  const options = {
    type: 'loop',
    perPage: 1,
    perMove: 1,
    pagination: true,
    gap: '10px',
    arrows: true,
    autoplay: true,
    interval: 3000,
    height: '400px',
    width: '100%',
  };

  return (
    <div>
      <Splide
        options={options}
        aria-label="My Favorite Images"
        className={Style.splide}
        hasTrack={false}
      >
        <div className={Style.custom}>
          <SplideTrack>{children}</SplideTrack>
        </div>
      </Splide>
    </div>
  );
}

SliderLastTrip.propTypes = {
  children: PropTypes.node,
};
