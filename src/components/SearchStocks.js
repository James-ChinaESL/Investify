import styled from "styled-components";
import React, { useEffect, useRef } from "react";
import { useSearchContext } from "../contexts/searchContext";

const SearchStocks = () => {
  const { loading, setSearchTerm, searchTerm, results, fetchStocks } =
    useSearchContext();

  const searchValue = useRef("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const search = () => {
    setSearchTerm(searchValue.current.value);
  };
  console.log(results);

  useEffect(() => {
    const timeoutId = setTimeout(() => fetchStocks(searchTerm), 500);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);
  return (
    <Wrapper>
      <section className='section-search'>
        <form
          className='search-form'
          autocomplete='off'
          onSubmit={handleSubmit}
        >
          <div className='form-control'>
            <input
              type='text'
              name='name'
              id='name'
              ref={searchValue}
              onChange={search}
            />
          </div>
        </form>
        {results && (
          <div className='results'>
            {results.map((result, i) => {
              return (
                <div className='result'>
                  <a href={result.symbol} key={i}>
                    {`${result.description} - ${result.symbol}`}
                  </a>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </Wrapper>
  );
};

export default SearchStocks;

const Wrapper = styled.div`
  .section-search {
    height: 10vh;
    form {
    }
  }
  .results {
    display: flex;
    flex-direction: column;
    a {
      text-decoration: none;
      color: white;
    }
  }
`;
