import { Card } from '../card';
import { useState, useEffect } from 'react';
import { getAllTrips } from '../../services/api';
import { Link } from 'wouter';
import { Slugify } from '../../utils/stringUtils';

export function Trips() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    async function loadViagens() {
      const data = await getAllTrips();
      setLocations(data.locations);
    }
    loadViagens();
  }, []);

  return (
    <div className="grid  md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
      {locations.map((location) => (
        <Link to={`/trips/${Slugify(location.city)}`} key={location.id}>
          <Card location={location} />
        </Link>
      ))}
    </div>
  );
}
