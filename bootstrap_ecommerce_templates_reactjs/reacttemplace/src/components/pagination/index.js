import React from "react";
import PropTypes from "prop-types";

Pagination.defaultProps = {
  onPageChange: null,
};

function Pagination(props) {
  const { pagination, onPageChange } = props;
  const { offset, pageSize, pageNumber } = pagination;
  const totalPages = Math.ceil(pageNumber / offset);

  function handlePageChange(newPage) {
    if (onPageChange) {
      onPageChange(newPage);
    }
  }

  return (
    <div>
      <button
        disabled={pageSize <= 1}
        onClick={() => handlePageChange(pageSize - 1)}
      >
        Prev
      </button>

      <button
        disabled={pageSize >= totalPages}
        onClick={() => handlePageChange(pageSize + 1)}
      >
        Next
      </button>
    </div>
  );
}

Pagination.propTypes = {
  pagination: PropTypes.object.isRequired,
  onPageChange: PropTypes.func,
};

export default Pagination;
