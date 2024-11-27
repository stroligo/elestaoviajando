import PropTypes from 'prop-types';
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
import Style from './style.module.css';

export function SliderTrip({ imagens }) {
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
          <SplideTrack>
            {imagens.map((imagem, index) => (
              <SplideSlide
                key={index}
                style={{ width: '100%', height: '100%' }}
              >
                <img
                  src={imagem}
                  alt={`Imagem ${index + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </SplideSlide>
            ))}{' '}
          </SplideTrack>
        </div>
      </Splide>
    </div>
  );
}

SliderTrip.propTypes = {
  imagens: PropTypes.arrayOf(PropTypes.string),
};
