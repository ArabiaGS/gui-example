import React, { createContext, useContext, useState } from 'react';

// Create a context
export const SelectedItemsContext = createContext();

// Create a custom provider for the context
export const SelectedItemsProvider = ({ children }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleSelection = (SIM_ID) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(SIM_ID)) {
        return prevSelectedItems.filter((item) => item !== SIM_ID);
      } else {
        return [...prevSelectedItems, SIM_ID];
      }
    });
  };

  return (
    <SelectedItemsContext.Provider value={{ selectedItems, toggleSelection }}>
      {children}
    </SelectedItemsContext.Provider>
  );
};

// Custom hook to access the context
export const useSelectedItems = () => {
  return useContext(SelectedItemsContext);
};