import PropTypes from 'prop-types';
import './card.modules.css';
import { CLOUDINARY_BASE_URL } from '@/utils/cloudinary';

export function Card({ location }) {
  /*   const date = new Date(location.date); */
  /*   const formattedDate = date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }); */

  return (
    <div className="card">
      <figure>
        {/* IMG REMOTA */}
        <img
          src={`${CLOUDINARY_BASE_URL}${location.thumbnail}`}
          alt={location.titulo || location.city}
        />

        {/*  <div className="date">{formattedDate}</div> */}
        <div className="card-content">
          {location.titulo && (
            <div className="blogtitle">{location.titulo}</div>
          )}
          {location.city && <div className="title">{location.city}</div>}
          {location.country && (
            <div className="country"> {location.country}</div>
          )}
          {location.hashtag && location.hashtag.length > 0 && (
            <div className="hashtags">
              {location.hashtag.map((tag, index) => (
                <span key={index} className="hashtag">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </figure>
    </div>
  );
}

Card.propTypes = {
  location: PropTypes.shape({
    titulo: PropTypes.string,
    city: PropTypes.string,
    country: PropTypes.string,
    thumbnail: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    hashtag: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};
