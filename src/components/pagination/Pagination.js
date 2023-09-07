import React from "react";

const Pagination = ({ currentPage, setPage, total }) => {
  return (
    <div className="mx-auto m-2">
      <button
        className="m-1 p-1 w-20 rounded-md bg-sky-800"
        onClick={() =>
          setPage(currentPage - 1 < 0 ? currentPage : currentPage - 1)
        }
      >
        Previous
      </button>
      <button
        className="m-1 p-1 w-20 rounded-md bg-sky-800"
        onClick={() =>
          setPage(currentPage !== total ? currentPage + 1 : currentPage)
        }
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
