// TripList.js
import { Link } from 'wouter';
import { Card } from '@/components/ui/Card';
import PropTypes from 'prop-types';

function generateSlug(city, id) {
  const citySlug = city
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  return `${citySlug}-${id}`;
}

export function TripList({ trips, orderBy, page, pageSize }) {
  const sortedTrips = trips.sort((a, b) => {
    if (orderBy === 'asc') {
      return new Date(a.date) - new Date(b.date);
    } else {
      return new Date(b.date) - new Date(a.date);
    }
  });

  const paginatedTrips = sortedTrips.slice(
    page * pageSize,
    (page + 1) * pageSize,
  );

  if (paginatedTrips.length === 0) {
    return <div>Nenhum post encontrado</div>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
      {paginatedTrips.map((item) => (
        <Link key={item._id} to={`/trips/${generateSlug(item.city, item._id)}`}>
          <Card location={item} />
        </Link>
      ))}
    </div>
  );
}

TripList.propTypes = {
  trips: PropTypes.array.isRequired,
  orderBy: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
};
