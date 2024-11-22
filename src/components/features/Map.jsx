import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { Link } from 'wouter';
import { Slugify } from '../../utils/stringUtils';

export function Map() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/data/viagens.json')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  if (!data) return <div>Carregando...</div>;

  return (
    <MapContainer
      center={[-22.9068, -43.1729]}
      zoom={3}
      scrollWheelZoom={false}
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data.locations.map((location) => (
        <Marker
          key={location.id}
          position={[location.coordinates.lat, location.coordinates.lng]}
        >
          <Popup>
            <h2>{location.city}</h2>
            <p>{location.description}</p>
            <Link to={`/trips/${Slugify(location.city)}`}>Ver mais</Link>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
