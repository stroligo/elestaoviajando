import { MapContainer, TileLayer, Marker } from 'react-leaflet';

import PropTypes from 'prop-types';

export function MapSingle({ location }) {
  return (
    <MapContainer
      center={[location.coordinates.lat, location.coordinates.lng]}
      zoom={5}
      scrollWheelZoom={false}
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">Colaboradores do OpenStreetMap</a>'
        url="https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?lang=pt"
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
