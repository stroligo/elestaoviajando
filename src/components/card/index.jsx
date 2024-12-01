import PropTypes from 'prop-types';
import './card.modules.css';

export function Card({ location }) {
  const date = new Date(location.date);
  const formattedDate = date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <div className="card">
      <figure>
        <img src={location.thumbnail} alt={location.city} />
        <div className="date">{formattedDate}</div>
        <div className="card-content">
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
    thumbnail: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
};
