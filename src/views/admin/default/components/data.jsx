import React, { useEffect, useState } from 'react';
import Card from 'components/card';
import 'boxicons';

const Data = () => {
  const [emotions, setEmotions] = useState('');

  const getEmotions = async () => {
    try {
      const response = await fetch('/api/total/emotion');
      if (response.ok) {
        const data = await response.json();
        setEmotions({
          satisfiedCount: data.satisfied,
          dissatisfiedCount: data.dissatisfied
        });
      } else {
        throw new Error('Error: ' + response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  useEffect(() => {
    getEmotions(); // Initial data fetch

    const interval = setInterval(getEmotions, 5000); // Refresh data every 1 minute

    return () => {
      clearInterval(interval); // Clear the interval on component unmount
    };
  }, []);

  return (
    <Card extra="pb-7 p-[20px]">
    <div className="h-[150px] w-full pt-2 pb-0">
      <p className="text-4xl font-black text-indigo-600">Emotions</p>
      <div className="flex flex-col items-center md:flex-row md:justify-center md:space-x-8 md:space-y-0">
        <div className="flex flex-col items-center">
          <box-icon name="smile" color="#27d444" style={{ width: '150px', height: '90px' }}></box-icon>
          <p className="font-black mt-4">Satisfied: {emotions.satisfiedCount}</p>
        </div>
        <div className="flex flex-col items-center mt-8 md:mt-0">
          <box-icon name="sad" color="#e01016" style={{ width: '150px', height: '90px' }}></box-icon>
          <p className="font-black mt-4">Dissatisfied: {emotions.dissatisfiedCount}</p>
        </div>
      </div>
    </div>
  </Card>
  );
};

export default Data;
