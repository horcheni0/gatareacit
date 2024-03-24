import React, { createContext, useState } from 'react';
export const FrameContext = createContext();
export const FrameProvider = ({ children }) => {
  const [frameData, setFrameData] = useState([]);
  const updateFrameData = (newData) => {
    setFrameData(newData);
  };
  return (
    <FrameContext.Provider value={{ frameData, updateFrameData }}>
      {children}
    </FrameContext.Provider>
  );
};
