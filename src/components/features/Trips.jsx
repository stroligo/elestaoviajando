import { Card } from '../card';
import { useState, useEffect } from 'react';
import { getViagens } from '../../services/api';
import { Link } from 'wouter';

export function Trips() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    async function loadViagens() {
      const data = await getViagens();
      setLocations(data.locations);
    }
    loadViagens();
  }, []);

  return (
    <div className="grid  md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
      {locations.map((location) => (
        <Link
          to={`/trips/${location.id}/${location.city
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/ /g, '-')}`}
          key={location.id}
        >
          <Card location={location} />
        </Link>
      ))}
    </div>
  );
}
