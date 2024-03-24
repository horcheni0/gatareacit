import React, { useContext, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { FrameContext } from './context/frameContext';
import SearchModal from './components/searchModel';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredFrameData, setFilteredFrameData] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/frames/search?search=${searchQuery}`);
      if (res.status === 404) {
        setFilteredFrameData([]);
        setError('Frame not found.');
      } else {
        const data = await res.json();
        setFilteredFrameData(data);
        setError('');
        setIsModalOpen(true); // Open the modal
      }
    } catch (error) {
      console.error(error);
      setError('Error occurred.');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          className="flex-shrink flex-grow leading-normal tracking-wide w-px flex-1 border border-none border-l-0 rounded rounded-l-none px-3 relative focus:outline-none text-xxs text-gray-500 font-thin"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {isModalOpen && (
        <SearchModal
          filteredFrameData={filteredFrameData}
          handleClose={handleCloseModal}
        />
      )}
     
</div>
      )}
export default Search;
