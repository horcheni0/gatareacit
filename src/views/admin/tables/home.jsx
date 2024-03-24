import React, { useContext, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { FrameContext } from './context/frameContext';
import SearchModal from './components/searchModel'
const Tables = () => {
  const { frameData, updateFrameData } = useContext(FrameContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(3);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFrameData, setFilteredFrameData] = useState([]);
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [snapshot, setSnapshot] = useState(null);
  const [snapshotUrl, setSnapshotUrl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleSnapshotsClick = (snapshot) => {
    // Set the snapshot URL when the button is clicked
    setSnapshotUrl(snapshot);
  };

  // Function to handle the "Get Snapshot" button click
  const handleSnapshotClick = (snapshotUrl) => {
    setSelectedFrame(snapshotUrl);
  };
  const exportToCsv = () => {
    if (!filteredFrameData) {
      return;
    }

    const rows = filteredFrameData.map((frame) => [
      frame._id,
      frame.location,
      frame.channel,
      frame.trigger,
      frame.eventType,
      frame.classification,
      frame.snapshots && frame.snapshots.join(';'),
    ]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      rows.map((row) => row.join(',')).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'frames.csv');
    document.body.appendChild(link);
    link.click();
  };

  useEffect(() => {
    async function getTotalPages() {
      const response = await fetch('/api/frames/pagination');
      const data = await response.json();
      setTotalPages(data.totalPages);
    }

    getTotalPages();
  }, []);

  useEffect(() => {
    async function getFrames() {
      const response = await fetch(
        `/api/frames/pagination?page=${currentPage}`
      );
      const data = await response.json();
      updateFrameData(data.frames);
    }

    getFrames();
  }, [currentPage, updateFrameData]);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredFrameData(frameData);
      return;
    }

    const filteredData = frameData.filter((frame) => {
      const { _id, location, channel, trigger, eventType, classification } =
        frame;

      const lowerCaseQuery = searchQuery.toLowerCase();

      return (
        _id.toLowerCase().includes(lowerCaseQuery) ||
        location.toLowerCase().includes(lowerCaseQuery) ||
        channel.toLowerCase().includes(lowerCaseQuery) ||
        trigger.toLowerCase().includes(lowerCaseQuery) ||
        eventType.toLowerCase().includes(lowerCaseQuery) ||
        classification.toLowerCase().includes(lowerCaseQuery)
      );
    });

    setFilteredFrameData(filteredData);
  }, [searchQuery, frameData]);

  const handlePreviousClick = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="-my-2 py-5 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
      <div className="align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-4 overflow-hidden bg-white px-12">
        <div className="flex justify-between">
          <div className="inline-flex border rounded w-7/12 px-2 lg:px-6 h-12 bg-transparent">
            <div className="flex flex-wrap items-stretch w-full h-full mb-6 relative">
              <div className="flex">
                <span className="flex items-center leading-normal bg-transparent rounded rounded-r-none border border-r-0 border-none lg:px-3 py-2 whitespace-no-wrap text-grey-dark text-sm">
                  <svg
                    width="18"
                    height="18"
                    className="w-4 lg:w-auto"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.11086 15.2217C12.0381 15.2217 15.2217 12.0381 15.2217 8.11086C15.2217 4.18364 12.0381 1 8.11086 1C4.18364 1 1 4.18364 1 8.11086C1 12.0381 4.18364 15.2217 8.11086 15.2217Z"
                      stroke="#455A64"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16.9993 16.9993L13.1328 13.1328"
                      stroke="#455A64"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
              <input
                type="text"
                className="flex-shrink flex-grow  leading-normal tracking-wide w-px flex-1 border border-none border-l-0 rounded rounded-l-none px-3 relative focus:outline-none text-xxs  text-gray-500 font-thin"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <button
            onClick={exportToCsv}
            className="inline-block bg-[#ffffff] text-[#5940ff] font-[bold] text-[15px] z-[1] overflow-hidden relative p-2.5 rounded-lg border-[2px] border-solid border-[#5940ff]"
          >
            Export to CSV
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#ffffff]">
            <tr>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-[#5940ff] tracking-wider">
                ID
              </th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-[#5940ff] tracking-wider">
                Location
              </th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-[#5940ff] tracking-wider">
                Channel
              </th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-[#5940ff] tracking-wider">
                Trigger
              </th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-[#5940ff] tracking-wider">
                Event Type
              </th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-[#5940ff] tracking-wider">
                Classification
              </th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-[#5940ff] tracking-wider">
                Event Time
              </th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-[#5940ff] tracking-wider">
                Snapshots
              </th>
            </tr>
          </thead>
          <tbody class="bg-white">
            {filteredFrameData.map((frame) => (
              <tr key={frame._id}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm leading-5">{frame._id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <div className="text-sm leading-5">{frame.location}</div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-sm leading-5">
                  {frame.channel}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-sm leading-5">
                  {frame.trigger}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-sm leading-5">
                  {frame.type}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-sm leading-5">
                  {frame.classification}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-sm leading-5">
                  {format(new Date(frame.date), 'yyyy:MM:dd HH:mm')}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-sm leading-5">
                {snapshotUrl ? (
        // Render the image if snapshotUrl is available
<img src={snapshotUrl} alt="Snapshot" width="200" height="100" />
      ) : (
        // Render the button if snapshotUrl is not available
        <button
          className="px-5 py-2 border-[#5940ff] border text-[#5940ff] rounded transition duration-300 hover:bg-[#5940ff] hover:text-white focus:outline-none"
          onClick={() => handleSnapshotsClick(frame.snapshot)}
        >
          Get Snapshot
        </button>
      )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div class="sm:flex-1 sm:flex sm:items-center sm:justify-between mt-4 work-sans">
          <div></div>
          <div>
            <nav class="relative z-0 inline-flex shadow-sm">
              <div>
                <button
                  onClick={handlePreviousClick}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
                  aria-label="Previous"
                >
                  <svg
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div>
                <span class="relative z-0 inline-flex shadow-sm">
                  <button
                    disabled
                    class="relative inline-flex items-center px-4 py-2 border border-gray-300  text-sm leading-5 font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
                  >
                    {currentPage}
                  </button>
                </span>
              </div>
              <div>
                <button
                  onClick={handleNextClick}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
                  aria-label="Next"
                >
                  <svg
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tables;