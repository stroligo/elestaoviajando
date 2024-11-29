import PropTypes from 'prop-types';
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
import Style from './style.module.css';

export function SliderTrip({ imagens }) {
  if (imagens.length === 1) {
    return (
      <div>
        <img
          src={imagens[0]}
          alt="Imagem"
          style={{ width: '100%', height: '500px', objectFit: 'cover' }}
        />
      </div>
    );
  }

  const options = {
    type: 'loop',
    perPage: 1,
    perMove: 1,
    pagination: true,
    gap: '10px',
    arrows: true,
    autoplay: true,
    interval: 2000,
    height: '500px',
    width: '100%',
    easing: 'ease-in-out',
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
