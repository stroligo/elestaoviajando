import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import PropTypes from 'prop-types';

import 'leaflet/dist/leaflet.css';

import Style from '../style.module.css';
import Pin from '/assets/img/pin.png';

const icon = L.icon({
  iconUrl: Pin,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

export function MapSingle({ location }) {
  return (
    <MapContainer
      center={[location.coordinates.lat, location.coordinates.lng]}
      zoom={14}
      scrollWheelZoom={false}
      className={Style.MapContainerSingle}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={[location.coordinates.lat, location.coordinates.lng]}
        icon={icon}
      ></Marker>
    </MapContainer>
  );
}

MapSingle.propTypes = {
  location: PropTypes.shape({
    coordinates: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};
