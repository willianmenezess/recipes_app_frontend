import { useState, useCallback } from 'react';
import propTypes from 'prop-types';

function useFetch() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async (url) => {
    try {
      setIsLoading(true);
      const data = await fetch(url);
      const sucess = await data.json();
      return sucess;
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { fetchData, error, isLoading };
}

useFetch.propTypes = {
  url: propTypes.string.isRequired,
};

export default useFetch;
