import { useState } from 'react';
import PropTypes from 'prop-types';
import { Select } from '../../ui/Select';
import { SearchInput } from '../../ui/SearchInput';
import { Svg } from '../../icons';

export function Filter({ locations, onFilterChange }) {
  /*   console.log(Alerta); */
  const [filter, setFilter] = useState({ filterCountry: '', searchTerm: '' });
  const [resetSearch, setResetSearch] = useState(false);

  const handleFilterCountry = (event) => {
    const selectedCountry = event.target.value;
    setFilter({ ...filter, filterCountry: selectedCountry });
    onFilterChange({ ...filter, filterCountry: selectedCountry });
  };

  const handleSearchTermChange = (searchTerm) => {
    setFilter({ ...filter, searchTerm });
    onFilterChange({ ...filter, searchTerm });
  };

  const handleClearFilter = () => {
    setFilter({ filterCountry: '', searchTerm: '' });
    onFilterChange({ filterCountry: '', searchTerm: '' });
    setResetSearch(true);
  };

  return (
    <div className="relative h-full">
      <div className="absolute top-0 right-0 -translate-y-10">
        {(filter.filterCountry || filter.searchTerm) && (
          <div
            onClick={handleClearFilter}
            className="flex gap-1 items-center hover:border-orange border-transparent border-b-2 cursor-pointer text-orange  font-serif px-2 "
          >
            Limpar Filtro{' '}
            <Svg type="ClearFilter" color="#eb9658" width={20} height={20} />
          </div>
        )}
      </div>

      <div className="flex w-full h-fit md:flex-row flex-col justify-between gap-4 items-center  bg-beige p-3 rounded-xl">
        <SearchInput
          placeholder="Buscar local"
          value={filter.searchTerm}
          onChange={handleSearchTermChange}
          reset={resetSearch}
          onReset={() => setFilter({ ...filter, searchTerm: '' })}
        />

        <Select value={filter.filterCountry} onChange={handleFilterCountry}>
          <option value="">Todos os países</option>
          {Array.from(new Set(locations.map((location) => location.country)))
            .sort((a, b) => a.localeCompare(b))
            .map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
        </Select>
      </div>
    </div>
  );
}

Filter.propTypes = {
  locations: PropTypes.array.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};
