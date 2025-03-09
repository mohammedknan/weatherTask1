import { useState, useEffect } from 'react';
import { fetchWeather12 } from '../api/comment';

const useResults1 = () => {
  const [results1, setResults1] = useState<any>(null);
  const [errorMessage1, setErrorMessage1] = useState<string>('');

  const searchApi1 = async (searchTerm: string) => { 
    try {
      const data = await fetchWeather12(searchTerm);
      setResults1(data);
      setErrorMessage1('');

    } catch (err) {
      setErrorMessage1('Something went wrong');
    }
  };

  useEffect(() => {
    searchApi1('amman');
  }, []);

  return {searchApi1, results1, errorMessage1};
};

export default useResults1;



