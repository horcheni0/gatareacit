import React, { useEffect, useState } from 'react';

const Booth = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const fetchVideoUrl = async () => {
      try {
        const response = await fetch('/api/camera');
        const data = await response.json();
        setVideoUrl(data.videoUrl);
      } catch (error) {
        console.log('Error fetching video URL:', error);
      }
    };

    fetchVideoUrl();
  }, []);

  const handlePlayClick = () => {
    setShowVideo(true);
  };

  return (
    <div className="video-container w-full h-[50vh] sm:h-[60vh] lg:h-[80vh] shadow-[0px_6px_16px_rgba(98,100,108,0.5)] mt-9 mb-10 rounded-2xl flex justify-center items-center">
      {showVideo ? (
        <iframe
          src={videoUrl}
          className="video-iframe w-full h-full ml-20"
          title="Camera Feed"
          allowFullScreen
        />
      ) : (
        <>
          <h1 className="font-semibold text-center text-4xl dark:text-gray-600">
            Camera view goes here
          </h1>
          <box-icon
            name="play-circle"
            animation="tada"
            color="#622aff"
            style={{ width: '200px', height: '150px' }}
            onClick={handlePlayClick}
          ></box-icon>
        </>
      )}
    </div>
  );
};

export default Booth;
