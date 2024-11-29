import { useState, useEffect } from 'react';
import { getAllTrips } from '../../../services/api';
import { Link } from 'wouter';
import { Slugify } from '../../utils/stringUtils';
import { Card } from '../../card';
import { Filter } from './Filter';
import { IntroSection } from '../IntroSection';

export function Trips() {
  const [locations, setLocations] = useState([]);
  const [displayedLocations, setDisplayedLocations] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [orderedLocations, setOrderedLocations] = useState([]);

  useEffect(() => {
    async function loadViagens() {
      const data = await getAllTrips();
      setLocations(data.locations);
      setDisplayedLocations(data.locations);
    }
    loadViagens();
  }, []);

  useEffect(() => {
    const orderedLocations = displayedLocations.sort((a, b) => {
      if (orderBy === 'asc') {
        return a.city.localeCompare(b.city);
      } else if (orderBy === 'desc') {
        return b.city.localeCompare(a.city);
      }
    });
    setOrderedLocations(orderedLocations);
  }, [displayedLocations, orderBy]);

  const handleFilterChange = (filter) => {
    const filteredLocations = getFilteredLocations(
      locations,
      filter.filterCountry,
      filter.searchTerm,
    );

    setDisplayedLocations(filteredLocations);
  };

  const handleOrderByChange = (orderBy) => {
    setOrderBy(orderBy);
    handleFilterChange({ filterCountry: '', searchTerm: '' });
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
        {orderedLocations.length > 0 ? (
          <div className="flex  items-center  justify-end">
            <div className="font-bold text-lg">
              {orderedLocations.length} viagens encontradas
            </div>
          </div>
        ) : (
          <div className="flex  items-center  justify-end">
            <div className="font-bold text-lg">Nenhuma viagem encontrada</div>
          </div>
        )}

        <div className="grid  md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 py-10">
          {orderedLocations.map((location) => (
            <Link to={`/trips/${location.trip}`} key={location.id}>
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
          onOrderByChange={handleOrderByChange}
          onClearFilter={handleClearFilter}
        />
      </div>

      {renderItems()}
    </div>
  );
}
