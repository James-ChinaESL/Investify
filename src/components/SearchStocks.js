import styled from "styled-components";
import React, { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";
import { finhubApiKey, urlSymbolLookup as url } from "../utils/fetchOptions";
import LinearProgress from "@mui/material/LinearProgress";
import { server } from "../utils/fetchOptions";

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
            <img src={`${server}/logos/search.png`} alt='search' />
          </div>
        </div>
        {loading && (
          <div className='progress'>
            <LinearProgress color='inherit' />
          </div>
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
    /* width: 22rem; */
    position: relative;
    left: 2.8rem;
    margin-right: 2.8rem;

    .progress {
      /* margin-left: -2.8rem; */

      width: 22.2rem;
    }
  }

  .input-container {
    /* width: 22rem; */

    display: flex;
    /* flex-direction: row; */
    justify-content: end;
  }
  .search-field {
    width: 16rem;
    height: 3.5rem;

    padding: 10px 35px 10px 15px;
    border: none;
    /* border-bottom: 1px solid black; */
    background-color: whitesmoke;
    outline: none;
    font-family: inherit;
    text-transform: uppercase;
    transition: var(--transition);
    &::placeholder {
      text-transform: none;
    }
    &:focus {
      width: 22rem;
      outline: 2px solid var(--clr-tertiary);
    }
  }

  .magnifier {
    float: right;
    /* margin-top: 1rem; */
    background: transparent;
    border: none;
    outline: none;
    position: absolute;
    right: 0.7rem;
    top: 0.5rem;
  }

  .magnifier img {
    width: 2.5rem;
    height: 2.5rem;
    object-fit: cover;
  }
  .results {
    opacity: 0;
    height: 0;
    display: flex;
    background-color: whitesmoke;
    flex-direction: column;
    transition: var(--transition);
    /* box-sizing: content-box; */
  }
  .results.show {
    /* top: -1.5px; */
    outline: 2px solid var(--clr-tertiary);
    height: 10rem;
    opacity: 1;
    z-index: 2;
    justify-content: space-between;
    a {
      padding: 0.3rem 2rem;
      display: flex;
      justify-content: space-between;
      font-size: 1.6rem;
      text-decoration: none;
      color: black;
      line-height: 2.5rem;
      &:hover {
        text-decoration: underline;
        text-decoration-color: var(--clr-primary);
        background-color: var(--clr-tertiary);
      }
      .name {
        text-transform: capitalize;
      }
    }
  }
`;
