// ChartContext.js

import React, { createContext, useState } from 'react';

// Create the context
export const ChartContext = createContext();

// Create the provider component
export const ChartProvider = ({ children }) => {
  const [chartData, setChartData] = useState([]);

  const updateChartData = (newData) => {
    setChartData(newData);
  };

  return (
    <ChartContext.Provider value={{ chartData, updateChartData }}>
      {children}
    </ChartContext.Provider>
  );
};
