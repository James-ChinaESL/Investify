import styled from "styled-components";
import React, { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";
import { finhubApiKey, urlSymbolLookup as url } from "../utils/fetchOptions";
import LinearProgress from "@mui/material/LinearProgress";

import Box from "@mui/material/Box";

const SearchStocks = () => {
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
      console.log(error);
    }
    setLoading(false);
  }, [searchTerm]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const search = () => {
    setSearchTerm(searchValue.current.value);
  };

  const clearInput = (e) => {
    // console.log(e);
    if (!e.currentTarget.contains(e.relatedTarget)) {
      searchValue.current.value = "";
      setSearchTerm("");
    }
  };
  const focus = (e) => {
    console.log(e);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => fetchStocks(searchTerm), 500);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);
  return (
    <Wrapper>
      <div className='search-container' onBlur={clearInput}>
        <form className='form' autoComplete='off' onSubmit={handleSubmit}>
          <input
            name='input stock to search'
            type='text'
            ref={searchValue}
            onFocus={focus}
            onChange={search}
            placeholder='Search'
            className='search-field'
          />
          <button type='submit' className='search-button'>
            <img src='search.png' />
          </button>
        </form>
        {loading && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress color='inherit' />
          </Box>
        )}
        {searchTerm && results && (
          <div className='results'>
            {results.map((result, i) => {
              return (
                <div className='result' key={i}>
                  <a href={`/company/${result.symbol}`}>
                    <p className='name'>{result.description.toLowerCase()}</p>
                    <p>{result.symbol}</p>
                  </a>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default SearchStocks;

const Wrapper = styled.section`
  & {
    display: flex;
    justify-content: end;
    margin-right: 3rem;
  }
  .search-container {
    width: 25rem;
  }

  .form {
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
  }

  .search-button {
    background: transparent;
    border: none;
    outline: none;
    margin-left: -33px;
  }

  .search-button img {
    width: 20px;
    height: 20px;
    object-fit: cover;
  }

  .results {
    display: flex;
    background-color: white;
    flex-direction: column;

    a {
      padding: 0.3rem 2rem;
      display: flex;
      justify-content: space-between;
      font-size: 1.2rem;
      text-decoration: none;
      color: black;
      &:hover {
        text-decoration: underline;
      }
      .name {
        text-transform: capitalize;
      }
      .symbol {
      }
    }
  }
`;
