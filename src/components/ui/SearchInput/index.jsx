import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

export function SearchInput({ placeholder, value, onChange, reset }) {
  const [searchTerm, setSearchTerm] = useState(value);

  useEffect(() => {
    if (reset) {
      setSearchTerm('');
    }
  }, [reset]);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
    onChange(event.target.value);
  };

  return (
    <div className="relative">
      <input
        type="search"
        value={searchTerm}
        onChange={handleSearchTermChange}
        placeholder={placeholder}
        className="px-3 py-1 text-lg  hover:bg-gray-extralight hover:text-blue-dark h-fit bg-white  text-blue-dark hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange rounded-lg transition-all duration-150 ease-in-out pl-10"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-1/2 left-3 transform -translate-y-1/2 w-5 h-5 text-gray-400"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}

SearchInput.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  reset: PropTypes.bool,
};
