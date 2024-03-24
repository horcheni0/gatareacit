import React, { useEffect, useState } from 'react';
import Card from "components/card";

const Time = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card extra="pb-7 p-[20px]">
      <div className="h-[150px] w-full pt-2 pb-0">
        <p className='text-4xl font-black text-indigo-600'>Current Time</p>
        <p className='font-medium text-6xl text-center mt-5'>{currentTime}</p>
      </div>
    </Card>
  );
};

export default Time;
