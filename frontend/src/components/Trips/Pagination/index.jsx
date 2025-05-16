import PropTypes from 'prop-types';
import { useState } from 'react';
import { Svg } from '@/components/ui/Icons';

export function Pagination({ pageSize, totalTrips, onPageChange }) {
  const totalPages = Math.ceil(totalTrips / pageSize);
  const [currentPage, setCurrentPage] = useState(0);

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
      onPageChange(currentPage + 1);
    }
  };

  const startIndex = Math.max(0, currentPage - 2);
  const endIndex = Math.min(totalPages, currentPage + 3);

  return (
    <div className="flex relative justify-center py-6">
      <div className="flex gap-2 items-center justify-center">
        {currentPage > 0 && (
          <div
            className="cursor-pointer bg-blue-dark border-2 border-white hover:border-orange rounded-xl text-white  w-10 h-10 text-xs flex items-center justify-center"
            onClick={handlePrev}
          >
            <span className="translate-y-[1px] ">
              <Svg type="AngleLeft" color="#ebb858" width={24} height={24} />
            </span>
          </div>
        )}
        {Array.from({ length: endIndex - startIndex }, (_, index) => {
          const page = startIndex + index;
          return (
            <div
              className={`cursor-pointer bg-blue-dark border-2 hover:bg-orange border-white hover:border-orange rounded-xl text-white  w-8 h-8 text-xs flex items-center justify-center  select-none`}
              key={page}
              onClick={() => {
                setCurrentPage(page);
                onPageChange(page);
              }}
            >
              <span className="translate-y-[1px]">{page + 1}</span>
            </div>
          );
        })}
        {currentPage < totalPages - 1 && (
          <div
            className="cursor-pointer bg-blue-dark border-2 border-white hover:border-orange rounded-xl text-white  w-10 h-10 text-xs flex items-center justify-center"
            onClick={handleNext}
          >
            <span className="translate-y-[1px]">
              <Svg type="AngleRight" color="#ebb858" width={24} height={24} />
            </span>
          </div>
        )}
      </div>
      <div className="absolute top-1/2 text-xs right-0 text-right text-gray-light transform -translate-x-1/2 -translate-y-1/2 select-none">
        {totalTrips > 0 ? `Página ${currentPage + 1} de ${totalPages}` : ''}
      </div>
    </div>
  );
}

Pagination.propTypes = {
  pageSize: PropTypes.number.isRequired,
  totalTrips: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
