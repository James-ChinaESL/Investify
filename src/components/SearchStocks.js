import styled from "styled-components";
import React, { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";
import { finhubApiKey, urlSymbolLookup as url } from "../utils/fetchOptions";
import LinearProgress from "@mui/material/LinearProgress";

import Box from "@mui/material/Box";

const SearchStocks = React.memo(() => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const searchValue = useRef("");

  const fetchStocks = useCallback(async () => {
    if (!searchTerm) return;
    setLoading(true);
    try {
      const res = await axios.get(`${url}${searchTerm}&token=${finhubApiKey}`);
      if (res) setResults(res.data.result.slice(0, 3));
    } catch (error) {
      alert(error);
      console.log(error);
    }
    setLoading(false);
  }, [searchTerm]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const search = () => {
    if (searchValue.current.value === "") {
      setResults([]);
    }
    setSearchTerm(searchValue.current.value);
  };

  const clearInput = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      searchValue.current.value = "";
      setSearchTerm("");
      setResults([]);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => fetchStocks(searchTerm), 500);
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);
  return (
    <Wrapper>
      <div className='search-container' onBlur={clearInput}>
        <div className='input-container' onSubmit={handleSubmit}>
          <input
            name='input stock to search'
            type='text'
            ref={searchValue}
            onChange={search}
            placeholder='Search stocks'
            className='search-field'
          />
          <div className='magnifier'>
            <img src='http://localhost:5000/logos/search.png' alt='search' />
          </div>
        </div>
        {loading && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress color='inherit' />
          </Box>
        )}
        {/* {searchTerm && results && ( */}
        <div
          className={`results ${searchTerm && results.length > 0 && "show"}`}
        >
          {results.map((result, i) => {
            return (
              <div className='result' key={i}>
                <a href={`/company/${result.symbol}`}>
                  <p className='name'>
                    {result.description.toLowerCase().slice(0, 10)}
                  </p>
                  <p>{result.symbol}</p>
                </a>
              </div>
            );
          })}
        </div>
        {/* )} */}
      </div>
    </Wrapper>
  );
});

export default SearchStocks;

const Wrapper = styled.div`
  .search-container {
    width: min(25rem, 40vw);
  }

  .input-container {
    display: flex;
    flex-direction: row;
  }
  .search-field {
    width: 100%;
    padding: 10px 35px 10px 15px;
    border: none;
    border-bottom: 1px solid black;
    outline: none;
    font-family: inherit;
    text-transform: uppercase;
    &::placeholder {
      text-transform: none;
    }
  }

  .magnifier {
    margin-top: 0.5rem;
    background: transparent;
    border: none;
    outline: none;
    margin-left: -3.5rem;
  }

  .magnifier img {
    width: 25px;
    height: 25px;
    object-fit: cover;
  }
  .results {
    display: flex;
    background-color: white;
    flex-direction: column;
    height: 0px;
    transition: var(--transition);
    z-index: -1000;
  }
  .results.show {
    height: 10rem;
    z-index: 2;
    justify-content: space-evenly;
    a {
      padding: 0.3rem 2rem;
      display: flex;
      justify-content: space-between;
      font-size: 1.6rem;
      text-decoration: none;
      color: black;
      &:hover {
        text-decoration: underline;
      }
      .name {
        text-transform: capitalize;
      }
    }
  }
`;
