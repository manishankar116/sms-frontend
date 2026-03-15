import React, { createContext, useCallback, useEffect, useState } from 'react';

import { clearToken, getValidToken } from './authStorage';

export const DataContext = createContext();

const API_URLS = ['http://10.0.2.2:8080', 'http://localhost:8080'];

const fetchWithFallback = async (path, options) => {
  let lastError = null;

  for (const baseUrl of API_URLS) {
    try {
      const response = await fetch(`${baseUrl}${path}`, options);
      return response;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
};

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchChildOverview = useCallback(async () => {
    const token = await getValidToken();

    if (!token) {
      setData(null);
      return null;
    }

    setIsLoading(true);

    try {
      const response = await fetchWithFallback('/api/parent/1/child-overview', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 401) {
        await clearToken();
        setData(null);
        return null;
      }

      if (!response.ok) {
        throw new Error(`Failed with status ${response.status}`);
      }

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
