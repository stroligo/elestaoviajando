import { useState, useEffect } from 'react';
import { getAllTrips } from '../../../services/api';
import { Link } from 'wouter';
import { Slugify } from '../../../utils/stringUtils';
import { Card } from '../../card';
import { Filter } from './Filter';
import { IntroSection } from '../IntroSection';

export function Trips() {
  const [locations, setLocations] = useState([]);
  const [displayedLocations, setDisplayedLocations] = useState([]);

  useEffect(() => {
    async function loadViagens() {
      const data = await getAllTrips();
      setLocations(data.locations);
      setDisplayedLocations(data.locations);
    }
    loadViagens();
  }, []);

  const handleFilterChange = (filter) => {
    const filteredLocations = getFilteredLocations(
      locations,
      filter.filterCountry,
      filter.searchTerm,
    );
    setDisplayedLocations(filteredLocations);
  };

  const handleClearFilter = () => {
    setDisplayedLocations(locations);
  };

  const getFilteredLocations = (locations, filterCountry, searchTerm) => {
    const filteredLocations = filterCountry
      ? locations.filter((location) => location.country === filterCountry)
      : locations;

    return searchTerm
      ? filteredLocations.filter((location) =>
          Slugify(location.city).includes(Slugify(searchTerm)),
        )
      : filteredLocations;
  };

  const renderItems = () => {
    return (
      <div>
        {displayedLocations.length > 0 ? (
          <div className="flex  items-center  justify-end">
            <div className="font-bold text-lg">
              {displayedLocations.length} viagens encontradas
            </div>
          </div>
        ) : (
          <div className="flex  items-center  justify-end">
            <div className="font-bold text-lg">Nenhuma viagem encontrada</div>
          </div>
        )}

        <div className="grid  md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 py-10">
          {displayedLocations.map((location) => (
            <Link to={`/trips/${Slugify(location.city)}`} key={location.id}>
              <Card location={location} />
            </Link>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="flex md:justify-between md:flex-row flex-col md:items-center ">
        <IntroSection title="Todas as" subtitle="Viagens" />

        <Filter
          locations={locations}
          onFilterChange={handleFilterChange}
          onClearFilter={handleClearFilter}
        />
      </div>

      {renderItems()}
    </div>
  );
}
