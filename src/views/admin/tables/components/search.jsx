import React, { useContext, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { FrameContext } from '../context/frameContext';
import SearchModal from './searchModel';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchedFrameData, setSearchedFrameData] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/frames/search?search=${searchQuery}`);
      if (res.ok) {
        const data = await res.json();
        if (data.error) {
          setSearchedFrameData([]);
          setError(data.error);
          setIsModalOpen(true); // Open the modal even if there's an error
        } else {
          setSearchedFrameData(data);
          setError("");
          setIsModalOpen(true);
        }
      } else {
        setSearchedFrameData([]);
        setError("Frame not found.");
        setIsModalOpen(true); // Open the modal even if there's an error
      }
    } catch (error) {
      console.error(error);
      setError("Error occurred.");
      setIsModalOpen(true); // Open the modal even if there's an error
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
          className="flex-shrink flex-grow leading-normal tracking-wide w-px flex-1 border bg-gray-100 border-none border-l-0 rounded px-3 relative focus:outline-none  "
          style={{ height: "50px", width: "500px" }}
                    placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="flex-shrink flex-grow leading-normal tracking-wide w-px flex-1 border bg-blueSecondary border-none border-l-0 rounded px-3 relative focus:outline-none  text-white "
          style={{ height: "50px", width: "90px" }}
 type="submit">Search</button>
      </form>

      {isModalOpen && (
        <SearchModal
        searchedFrameData={searchedFrameData}
        handleClose={handleCloseModal}
        error={error} // Pass the error state

        />
      )}
     
</div>
      )}
export default Search;
