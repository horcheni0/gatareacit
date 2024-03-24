import React, {useState,useEffect } from 'react';
import Card from "components/card";

const Number = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        fetchData(); // Fetch data initially
        const interval = setInterval(fetchData, 5000); // Fetch data every 5 seconds
        return () => {
          clearInterval(interval); // Clean up interval on component unmount
        };
      }, []);
    /*  const fetchData = () => {
        fetch('/api/total')
          .then((response) => response.json())
          .then((data) => {
            // Extract the total value from the first object in the array
            const total = data[0].total;
            setCount(total);
          })
          .catch((error) => {
            console.log('Error fetching data:', error);
          });
      };
      */
      const fetchData = () => {
        fetch('/api/total')
          .then((response) => response.json())
          .then((data) => {
            // Sort the data array in descending order based on the date and time
            data.sort((a, b) => new Date(b.date) - new Date(a.date));
            
            // Extract the total value from the first object in the sorted array
            const total = data[0].total;
            setCount(total);
          })
          .catch((error) => {
            console.log('Error fetching data:', error);
          });
      };
      
      
  return (
    <Card extra="pb-7 p-[20px]">
      <div className="h-[150px] w-full pt-1 flex flex-col items-center justify-center">
    <p className="font-medium text-4xl text-center">
    There {count === 1 ? "is" : "are"} 
    </p>
    <span className="font-black text-4xl text-indigo-600">
      {count}
    </span>
    <p className="font-medium text-4xl text-center">peoples in your booth</p>
  </div>
  </Card>
  )
}

export default Number