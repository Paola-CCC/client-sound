import React from 'react';
import { Button } from '../../common/Index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight ,faChevronLeft } from "@fortawesome/free-solid-svg-icons";
const Pagination = ({ totalPages, currentPage, onPageChange }) => {


  return (
    <div className="pagination">
      <Button kind="primary" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        {/* Précédent */}
      <FontAwesomeIcon icon={faChevronLeft} />
      </Button>
      <span> 
        <span> page {currentPage} sur {totalPages} </span> 
      </span>
      <Button kind="primary" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        {/* Suivant */}
        <FontAwesomeIcon icon={faChevronRight} />
      </Button>
    </div>
  );
};

export default Pagination;

