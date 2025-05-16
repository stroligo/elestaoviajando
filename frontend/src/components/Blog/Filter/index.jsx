import { useState } from 'react';
import PropTypes from 'prop-types';

import { SearchInput } from '@/components/ui/SearchInput';
import { Svg } from '@/components/ui/Icons';
import { Button } from '@/components/ui/Button';

export function Filter({ onFilterChange, onOrderByChange }) {
  /*   console.log(Alerta); */
  const [filter, setFilter] = useState({
    searchTerm: '',
    orderBy: 'asc',
  });
  const [resetSearch, setResetSearch] = useState(false);

  const handleSearchTermChange = (searchTerm) => {
    setFilter({ ...filter, searchTerm });
    onFilterChange({ ...filter, searchTerm });
  };

  const handleOrderByChange = (orderBy) => {
    setFilter({ ...filter, orderBy });
    onOrderByChange(orderBy);
  };

  const handleClearFilter = () => {
    onFilterChange({ searchTerm: '', orderBy: 'asc' });
    setResetSearch(true);
  };

  return (
    <div className="relative h-full">
      <div className="absolute top-0 right-0 -translate-y-10">
        {filter.searchTerm && (
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

        <div className="flex gap-2">
          <Button
            onClick={() => handleOrderByChange('asc')}
            className="flex gap-2"
          >
            <span>Antigos</span>
          </Button>
          <Button
            onClick={() => handleOrderByChange('desc')}
            className="flex gap-2"
          >
            <span>Recentes</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

Filter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  onOrderByChange: PropTypes.func.isRequired,
};
