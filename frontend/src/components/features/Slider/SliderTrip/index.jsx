import { useState } from 'react';
import PropTypes from 'prop-types';
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
import Style from './style.module.css';
import { Modal } from '@/components/features/Modal';
import { CLOUDINARY_BASE_URL } from '@/utils/cloudinary';

export function SliderTrip({ imagens }) {
  const [imagemSelecionada, setImagemSelecionada] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = (imagem) => {
    setImagemSelecionada(imagem);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  if (imagens.length === 1) {
    return (
      <div>
        <figure className=" cursor-pointer">
          <img
            src={`${CLOUDINARY_BASE_URL}${imagens[0]}`}
            alt="Imagem"
            style={{ width: '100%', height: '700px', objectFit: 'cover' }}
            onClick={() => handleOpenModal(imagens[0])}
          />
        </figure>

        <Modal isOpen={isOpen} onClose={handleCloseModal}>
          {imagemSelecionada && (
            <figure className="h-fit max-h-full">
              <img
                src={`${CLOUDINARY_BASE_URL}${imagemSelecionada}`}
                alt="Imagem selecionada"
                className="md:max-w-screen-md max-w-sm max-h-[85vh] object-cover"
              />
            </figure>
          )}
        </Modal>
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
    height: '700px',
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
                style={{ height: '100%', cursor: 'pointer' }}
                onClick={() => handleOpenModal(imagem)}
              >
                <img
                  src={`${CLOUDINARY_BASE_URL}${imagem}`}
                  alt={`Imagem ${index + 1}`}
                  className="w-full object-cover "
                />
              </SplideSlide>
            ))}
          </SplideTrack>
        </div>
      </Splide>
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        {imagemSelecionada && (
          <figure className="h-fit max-h-full">
            <img
              src={`${CLOUDINARY_BASE_URL}${imagemSelecionada}`}
              alt="Imagem selecionada"
              className="md:max-w-screen-md max-w-sm max-h-[85vh] object-cover"
            />
          </figure>
        )}
      </Modal>
    </div>
  );
}

SliderTrip.propTypes = {
  imagens: PropTypes.arrayOf(PropTypes.string),
};
