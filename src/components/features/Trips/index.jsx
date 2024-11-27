import { useState, useEffect } from 'react';
import { getAllTrips } from '../../../services/api';
import { Link } from 'wouter';
import { Slugify } from '../../../utils/stringUtils';
import { Card } from '../../card';
import { Filter } from './Filter';
import { IntroSection } from '../IntroSection';

/**
 * The Trips component renders a list of trips fetched from the API.
 *
 * It also renders a Filter component which allows the user to filter the trips
 * by country and search for a specific trip.
 *
 * @function
 * @returns {JSX.Element} The JSX element representing the Trips component.
 */
export function Trips() {
  const [locations, setLocations] = useState([]);
  const [displayedLocations, setDisplayedLocations] = useState([]);

  useEffect(() => {
    /**
     * Fetches all trips from the API and sets the `locations` and
     * `displayedLocations` states with the fetched data.
     */
    async function loadViagens() {
      const data = await getAllTrips();
      setLocations(data.locations);
      setDisplayedLocations(data.locations);
    }
    loadViagens();
  }, []);

  /**
   * Updates the `displayedLocations` state with the locations that match
   * the filter criteria specified in the `filter` object.
   *
   * @param {Object} filter - An object containing the filter criteria.
   * @param {string} filter.filterCountry - The country to filter by.
   * @param {string} filter.searchTerm - The search term to filter by.
   */
  const handleFilterChange = (filter) => {
    const filteredLocations = getFilteredLocations(
      locations,
      filter.filterCountry,
      filter.searchTerm,
    );
    setDisplayedLocations(filteredLocations);
  };

  /**
   * Resets the `displayedLocations` state to the original list of locations.
   * This is used to clear the filter and display all locations.
   */
  const handleClearFilter = () => {
    setDisplayedLocations(locations);
  };

  /**
   * Filters the given locations based on the filterCountry and searchTerm.
   *
   * @param {Object[]} locations - The list of locations to filter.
   * @param {string} [filterCountry] - The country to filter by.
   * @param {string} [searchTerm] - The search term to filter by.
   * @returns {Object[]} The filtered list of locations.
   */
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

  /**
   * Renders the list of filtered locations.
   * If no locations are found, renders a message indicating this.
   * Otherwise, renders a message with the number of locations found,
   * and a grid of Card components, each representing a location.
   *
   * @returns {JSX.Element} The rendered list of locations.
   */
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
