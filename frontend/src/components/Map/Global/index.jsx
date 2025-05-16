import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { Link } from 'wouter';
import Style from '../style.module.css';
import { conectTrips } from '@/services/api';

import { Button } from '@/components/ui/Button';
import Pin from '/assets/img/pin.png';

const icon = L.icon({
  iconUrl: Pin,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

export function MapGlobal() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function loadViagens() {
      const data = await conectTrips();
      setData(data);
    }
    loadViagens();
  }, []);

  if (!data) return <div>Carregando...</div>;

  return (
    <MapContainer
      center={[47.471330401942076, -1.587923206983062]}
      zoom={4}
      scrollWheelZoom={false}
      style={{ height: '550px', width: '100%' }}
      className={Style.MapContainerGlobal}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data.map((location) => (
        <Marker
          key={location.id}
          position={[location.coordinates.lat, location.coordinates.lng]}
          icon={icon}
        >
          <Popup>
            <div className="flex flex-col gap-4 justify-center items-center">
              <div className="font-extrabold text-blue-dark font-serif text-xl leading-none pb-1   pr-4 border-b-2 border-orange w-fit">
                {location.city}
              </div>
              <Link to={`/trips/${location.id}`}>
                <Button> Ver Viagem </Button>
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
