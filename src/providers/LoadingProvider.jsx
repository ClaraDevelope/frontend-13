import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { createContext } from 'react'


const LoadingContext = createContext();

export const useLoading = () => {
  const context = useContext(LoadingContext);
  
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }

  return context;
};

const LoadingProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoading = () => {
    // console.log('Showing loading...');
    setIsLoading(true);
  };
  const hideLoading = () => setIsLoading(false);

  return (
    <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}

export default LoadingProvider
