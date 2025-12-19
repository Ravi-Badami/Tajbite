import { useEffect, useState } from "react";
import { SEARCH_API_D } from "./constants";

const useSearchApi = (input) => {
  const [search, setSearch] = useState();

  useEffect(() => {
    const fetchData = async () => {
      // Mock search suggestions data
      const mockSuggestions = {
        statusCode: 0,
        data: {
          suggestions: [
            { text: "pizza", type: "RESTAURANT" },
            { text: "burger", type: "DISH" },
            { text: "chicken", type: "DISH" },
            { text: "pasta", type: "DISH" },
            { text: "kfc", type: "RESTAURANT" },
            { text: "dominos", type: "RESTAURANT" },
          ].filter(
            (suggestion) =>
              input &&
              suggestion.text.toLowerCase().includes(input.toLowerCase()),
          ),
        },
      };
      setSearch(mockSuggestions);
    };
    const timer = setTimeout(() => {
      if (input === undefined) return;
      fetchData();
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  // console.log("suggestions", search);
  if (search) return { search };
};
export default useSearchApi;
