import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { Link } from 'wouter';
import { Slugify } from '../../utils/stringUtils';
import { Button } from '../../ui/Button';
import Style from './style.module.css';

export function MapGlobal() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/data/trips.json')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  if (!data) return <div>Carregando...</div>;

  return (
    <MapContainer
      center={[55.426616, 14.119192]}
      zoom={3}
      scrollWheelZoom={false}
      style={{ height: '500px', width: '100%' }}
      className={Style.MapContainerGlobal}
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
            <div className="font-extrabold text-blue-dark font-serif text-xl leading-none pb-1   pr-4 border-b-2 border-orange w-fit">
              {location.city}
            </div>
            <p>{location.description}</p>
            <Link to={`/trips/${Slugify(location.city)}`}>
              <Button> Ver Viagem </Button>
            </Link>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
