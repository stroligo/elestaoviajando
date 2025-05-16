import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Svg } from '../Icons';

export function SearchInput({ placeholder, value, onChange, reset }) {
  const [searchTerm, setSearchTerm] = useState(value);

  useEffect(() => {
    if (reset) {
      setSearchTerm('');
    }
  }, [reset]);

  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
    onChange(event.target.value);
  };

  return (
    <div className="relative w-full md:w-fit">
      <input
        type="search"
        value={searchTerm}
        onChange={handleSearchTermChange}
        placeholder={placeholder}
        className="px-3 py-1 text-lg  hover:bg-gray-extralight hover:text-blue-dark h-fit bg-white  text-blue-dark hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange rounded-lg transition-all duration-150 ease-in-out pl-10 w-full md:w-fit "
      />
      <div className="absolute top-1/2 -translate-y-1/2 left-2">
        <Svg type="Search" color="#000" width={24} height={24} />
      </div>
    </div>
  );
}

SearchInput.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  reset: PropTypes.bool,
};
