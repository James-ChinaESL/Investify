import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";
import axios from "axios";
const SearchContext = React.createContext();
const finhubApiKey = "c5ofrbaad3i9ao07nlbg";
const url = "https://finnhub.io/api/v1/search?q=";
// const url = https://finnhub.io/api/v1/search?q=${searchTerm}&token=${finhubApiKey}`;
const SearchProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const fetchStocks = useCallback(async () => {
    if (!searchTerm) return;
    setLoading(true);
    try {
      const res = await axios.get(`${url}${searchTerm}&token=${finhubApiKey}`);

      setResults(res.data.result.slice(0, 3));
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [searchTerm]);

  return (
    <SearchContext.Provider
      value={{ loading, setSearchTerm, searchTerm, results, fetchStocks }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  return useContext(SearchContext);
};

export { SearchProvider };
