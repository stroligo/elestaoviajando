import { useState } from 'react';
import PropTypes from 'prop-types';

import { SearchInput } from '@/components/ui/SearchInput';
import { Svg } from '@/components/ui/Icons';
import { Button } from '@/components/ui/Button';

export function Filter({ onFilterChange, onOrderByChange }) {
  /*   console.log(Alerta); */
  const [filter, setFilter] = useState({
    searchTerm: '',
    hashtag: '',
    orderBy: 'asc',
  });
  const [resetSearch, setResetSearch] = useState(false);

  const handleSearchTermChange = (searchTerm) => {
    setFilter({ ...filter, searchTerm });
    onFilterChange({ ...filter, searchTerm });
  };

  const handleHashtagChange = (hashtag) => {
    setFilter({ ...filter, hashtag });
    onFilterChange({ ...filter, hashtag });
  };

  const handleOrderByChange = (orderBy) => {
    setFilter({ ...filter, orderBy });
    onOrderByChange(orderBy);
  };

  const handleClearFilter = () => {
    onFilterChange({ searchTerm: '', hashtag: '', orderBy: 'asc' });
    setResetSearch(true);
  };

  return (
    <div className="relative h-full">
      <div className="absolute top-0 right-0 -translate-y-10">
        {(filter.searchTerm || filter.hashtag) && (
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
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <SearchInput
            placeholder="Buscar post"
            value={filter.searchTerm}
            onChange={handleSearchTermChange}
            reset={resetSearch}
            onReset={() => setFilter({ ...filter, searchTerm: '' })}
          />
          <SearchInput
            placeholder="Filtrar por hashtag"
            value={filter.hashtag}
            onChange={handleHashtagChange}
            reset={resetSearch}
            onReset={() => setFilter({ ...filter, hashtag: '' })}
          />
        </div>

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
