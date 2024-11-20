import PropTypes from 'prop-types';
import './card.modules.css';

export function Card({ location }) {
  return (
    <div className="card">
      <figure>
        <img src={location.thumbnail} alt={location.city} />
        <div className="card-content ">
          <div className="date">{location.date}</div>
          <div className="title">{location.city}</div>
          <div className="country"> {location.country}</div>
        </div>
      </figure>
    </div>
  );
}

Card.propTypes = {
  location: PropTypes.shape({
    city: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
};
