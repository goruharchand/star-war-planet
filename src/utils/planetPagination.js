function PlanetPagination({ onPageChange, hasPreviousPage, hasNextPage }) {
    const handlePrevious = () => {
      if (hasPreviousPage) {
        onPageChange('previous');
      }
    };
  
    const handleNext = () => {
      if (hasNextPage) {
        onPageChange('next');
      }
    };
  
    return (
      <div>
        <button disabled={!hasPreviousPage} onClick={handlePrevious}>
          Previous
        </button>
        <button disabled={!hasNextPage} onClick={handleNext}>
          Next
        </button>
      </div>
    );
  }
  
  export default PlanetPagination;
  