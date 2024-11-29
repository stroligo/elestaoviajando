import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import Style from './style.module.css';
import PropTypes from 'prop-types';

export function MapSingle({ location }) {
  return (
    <MapContainer
      center={[location.coordinates.lat, location.coordinates.lng]}
      zoom={5}
      scrollWheelZoom={false}
      className={Style.MapContainerSingle}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={[location.coordinates.lat, location.coordinates.lng]}
      ></Marker>
    </MapContainer>
  );
}
MapSingle.propTypes = {
  location: PropTypes.shape({
    id: PropTypes.number.isRequired,
    city: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    coordinates: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};
