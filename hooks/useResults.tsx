import { useState, useEffect } from 'react';
import { fetchWeather } from '../api/weather';
import { WeatherData } from '../types/type';

const useResults = () => {
  const [results, setResults] = useState<WeatherData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const searchApi = async (searchTerm: string): Promise<WeatherData | null> => {
    try {
      const data = await fetchWeather(searchTerm);
      setResults(data);
      setErrorMessage('');
      return data; 
    } catch (err) {
      setErrorMessage('Something went wrong');
      return null;
    }
  };

  useEffect(() => {
    searchApi('amman');
  }, []);

  return { searchApi, results, errorMessage };
};

export default useResults;
