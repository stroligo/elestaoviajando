import { useState, useEffect } from 'react';
import { conectTrips } from '@/services/api';
import { Slugify } from '@/utils/stringUtils';
import { IntroSection } from '@/components/features/IntroSection';
import { Pagination } from './Pagination';
import { Filter } from './Filter';
import { TripList } from './List';

export function Trips() {
  const [trips, setTrips] = useState([]);
  const [displayedTrips, setDisplayedTrips] = useState([]);
  const [orderBy, setOrderBy] = useState('desc');
  const [page, setPage] = useState(0);
  const [pageSize] = useState(20);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadTrips() {
      try {
        const data = await conectTrips();
        setTrips(data);
        setDisplayedTrips(data);
        setError(null);
      } catch (error) {
        console.error('Erro ao carregar viagens:', error);
        setError('Não foi possível carregar as viagens');
        setTrips([]);
        setDisplayedTrips([]);
      } finally {
        setIsLoading(false);
      }
    }
    loadTrips();
  }, []);

  const handleFilterChange = (filter) => {
    const filteredTrips = getFilteredTrips(
      trips,
      filter.filterCountry,
      filter.searchTerm,
    );
    setDisplayedTrips(filteredTrips);
  };

  const handleOrderByChange = (orderBy) => {
    setOrderBy(orderBy);
    handleFilterChange({ filterCountry: '', searchTerm: '' });
  };

  const handleClearFilter = () => {
    setDisplayedTrips(trips);
  };

  const getFilteredTrips = (trips, filterCountry, searchTerm) => {
    const filteredTrips = filterCountry
      ? trips.filter((trip) => trip.country === filterCountry)
      : trips;

    return searchTerm
      ? filteredTrips.filter((trip) =>
          Slugify(trip.city).includes(Slugify(searchTerm)),
        )
      : filteredTrips;
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      <div className="flex md:justify-between md:flex-row flex-col md:items-center ">
        <IntroSection title="Todas as" subtitle="Viagens" />

        <Filter
          trips={trips}
          onFilterChange={handleFilterChange}
          onOrderByChange={handleOrderByChange}
          onClearFilter={handleClearFilter}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-gray">{error}</div>
        </div>
      ) : displayedTrips.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-gray">Nenhuma viagem encontrada</div>
        </div>
      ) : (
        <>
          <TripList
            trips={displayedTrips}
            orderBy={orderBy}
            page={page}
            pageSize={pageSize}
          />

          <Pagination
            page={page}
            pageSize={pageSize}
            totalTrips={displayedTrips.length}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
