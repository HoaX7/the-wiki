import clsx from 'clsx';
import React from 'react';

interface PaginationProps {
  currentPage: number
  setPage: (page: number) => void;
  totalCount: number;
  perPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, setPage, totalCount, perPage }) => {
  const totalPages = Math.ceil(totalCount / perPage);
  const pageNumbersToShow = 5;

  const generatePageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(1, currentPage - Math.floor(pageNumbersToShow / 2));

    for (let i = startPage; i <= Math.min(totalPages, startPage + pageNumbersToShow - 1); i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div>
    <button onClick={() => setPage(1)} disabled={currentPage === 1}
      className='rounded-md p-1 bg-gray-200 disabled:opacity-50 mr-2'
    >
      &lt;&lt;
    </button>
      <button onClick={() => setPage(currentPage - 1)} disabled={currentPage === 1}
        className='p-1 rounded-md bg-gray-200 disabled:opacity-50'
      >
        Prev
      </button>

      {generatePageNumbers().map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => setPage(pageNumber)}
          disabled={pageNumber === currentPage}
          className={clsx('p-3', pageNumber === currentPage ? "underline" : "")}
        >
          {pageNumber}
        </button>
      ))}

      <button onClick={() => setPage(currentPage + 1)} disabled={currentPage === totalPages}
        className='rounded-md p-1 bg-gray-200 disabled:opacity-50'
      >
        Next
      </button>
    <button onClick={() => setPage(totalPages)} disabled={currentPage === totalPages}
      className='rounded-md p-1 bg-gray-200 disabled:opacity-50 ml-2'
    >
      &gt;&gt;
    </button>
    </div>
  );
};

export default Pagination;
