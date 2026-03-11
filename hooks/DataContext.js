import React, { createContext, useCallback, useEffect, useState } from 'react';

import { getToken } from './authStorage';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchChildOverview = useCallback(async () => {
    const token = await getToken();

    if (!token) {
      setData(null);
      return null;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://10.0.2.2:8080/api/parent/1/child-overview', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();
      setData(json);
      return json;
    } catch (error) {
      console.log('Error fetching child overview', error);
      setData(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchChildOverview();
  }, [fetchChildOverview]);

  return <DataContext.Provider value={{ data, isLoading, fetchChildOverview }}>{children}</DataContext.Provider>;
};
