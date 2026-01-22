import { useEffect, useState } from "react";
import { BASE_URL, USE_BACKEND } from "../config/api";

const useSearchApi = (input) => {
  const [search, setSearch] = useState();

  useEffect(() => {
    const fetchData = async () => {
      if (!input || input.trim() === '') {
        // Return empty suggestions for empty input
        setSearch({
          search: {
            statusCode: 0,
            data: { suggestions: [] }
          }
        });
        return;
      }

      try {
        // Use real backend autocomplete
        const response = await fetch(`${BASE_URL}/api/dishes/autocomplete?q=${input}`);
        
        if (!response.ok) {
          console.warn('Autocomplete failed, using mock data');
          setSearch({ search: { statusCode: 0, data: { suggestions: [] } } });
          return;
        }
        
        const data = await response.json();
        
        // Validation to prevent "cannot read properties of undefined" later
        if (data && data.search) {
          setSearch(data);
        } else {
          // Fallback structure if response is malformed
          setSearch({ search: { statusCode: 0, data: { suggestions: [] } } });
        }
      } catch (error) {
        console.error('Error fetching autocomplete:', error);
        setSearch({ search: { statusCode: 0, data: { suggestions: [] } } });
      }
    };

    const timer = setTimeout(() => {
      if (input === undefined) return;
      fetchData();
    }, 200);
    
    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return search;
};
export default useSearchApi;

