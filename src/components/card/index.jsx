import PropTypes from 'prop-types';

export function Card({ location }) {
  return (
    <div className="border border-beige rounded-md overflow-hidden">
      <figure className="relative h-[150px] overflow-clip">
        <img
          src={location.thumbnail}
          alt={location.city}
          className=" object-cover w-full h-full"
        />
        <div className="absolute bottom-0 right-0 bg-black text-white p-2">
          {location.city}, {location.country}
        </div>
      </figure>
      <div className="px-2 py-2">
        <div>Visitado em:{location.date}</div>
        <div>{location.description}</div>
      </div>
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
