
import React, { useState } from "react";
import { format } from 'date-fns';


const SearchModal = ({handleClose, searchedFrameData, error }) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total number of pages
  const totalPages = Math.ceil(searchedFrameData.length / itemsPerPage);

  // Get the current page's data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchedFrameData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="fixed top-0 left-0 z-10 flex h-full w-full items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-lg font-bold mb-4">Search Results</h2>
        {error ? (
          <p>{error}</p>
        ) : (
          <>
        {currentItems.length > 0 ? (
          <ul>
            {currentItems.map((frame) => (
              <li
                key={frame._id}
                className=" rounded-2xl"
                style={{ display: "flex", flexDirection: "row" }}
              >
                <p style={{ marginRight: "1rem" }}>Frame ID: {frame._id}</p>
                <p style={{ marginRight: "1rem" }}>
                  Frame classification: {frame.classification}
                </p>
                <p style={{ marginRight: "1rem" }}>Frame Type: {frame.type}</p>
                <p style={{ marginRight: "1rem" }}>
                  Frame Trigger: {frame.trigger}
                </p>
                <p>Frame Date: {format(new Date(frame.date), 'yyyy:MM:dd HH:mm')}
</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found.</p>
          )}
          </>
        )}
  

        {searchedFrameData.length > itemsPerPage && (
          <div className="flex justify-center mt-4">
            <button
              className="bg-indigo-600 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="bg-indigo-600 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}

        <button
          className="bg-indigo-600 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SearchModal;
