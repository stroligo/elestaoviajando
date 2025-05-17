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
  if (!location?.coordinates?.lat || !location?.coordinates?.lng) {
    return (
      <div className="min-h-[400px] w-full bg-gray-extralight rounded-2xl flex items-center justify-center">
        <p className="text-gray">Localização não disponível</p>
      </div>
    );
  }

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
      lat: PropTypes.number,
      lng: PropTypes.number,
    }),
  }),
};
