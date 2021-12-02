import React, { useState } from "react";
import styled from "styled-components";
import Table from "../components/Table";
import { popularStocks } from "../utils/fetchOptions";
import SelectGroup from "../components/SelectGroup";

const Stocks = () => {
  const [content, setContent] = useState({ list: popularStocks });

  return (
    <Wrapper>
      <div className='select-container'>
        <SelectGroup setContent={setContent} content={content} />
      </div>
      <div className='grid'>
        <div className='buttons_container'>
          <button
            className={`btn ${content.list ? "active" : null}`}
            onClick={() => setContent({ list: popularStocks })}
          >
            Popular Stocks
          </button>
          <button
            className={`btn ${content.type === "dayGainers" ? "active" : null}`}
            onClick={() => setContent({ type: "dayGainers" })}
          >
            Day Gainers
          </button>
          <button
            className={`btn ${content.type === "dayLosers" ? "active" : null}`}
            onClick={() => setContent({ type: "dayLosers" })}
          >
            Day Losers
          </button>
          <button
            className={`btn ${content.type === "techGrowth" ? "active" : null}`}
            onClick={() => setContent({ type: "techGrowth" })}
          >
            Technology & Growth
          </button>
          <button
            className={`btn ${
              content.type === "undervaluedGrowth" ? "active" : null
            }`}
            onClick={() => setContent({ type: "undervaluedGrowth" })}
          >
            Undervalued & Growth
          </button>
          <button
            className={`btn ${
              content.type === "undervaluedLargeCap" ? "active" : null
            }`}
            onClick={() => setContent({ type: "undervaluedLargeCap" })}
          >
            Undervalued & LargeCap
          </button>
        </div>
        <Table {...content} />
      </div>
    </Wrapper>
  );
};

export default Stocks;
const Wrapper = styled.div`
  .select-container {
    display: none;
  }
  .grid {
    padding: 0 max(12rem, 2vw);
    display: grid;
    justify-content: center;

    .buttons_container {
      /* padding: 0 3rem; */
      display: grid;
      justify-content: center;
      /* grid-template-columns: repeat(6, max-content); */
      grid-template-columns: repeat(6, minmax(min-content, 1fr));
      grid-column-gap: min(3rem, 2vw);
      width: 100%;
      /* max-width: 120rem; */
    }
    .btn {
      border: 2px solid var(--clr-tertiary);
      letter-spacing: 1px;
      /* &:not(:last-child) {
      margin-right: 2rem;
    } */
      &.active {
        background-color: var(--clr-tertiary);
      }
      &:hover {
        background-color: var(--clr-tertiary);
        color: var(--clr-primary);
      }
    }
  }
  @media (max-width: 720px) {
    & .grid div.buttons_container {
      display: none;
    }
    & div.select-container {
      width: 280px;
      background-color: var(--clr-tertiary);
      margin: 0 auto;

      color: var(--clr-primary);
      border-radius: 5px;
      display: block;
      .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon,
      .css-bpeome-MuiSvgIcon-root-MuiSelect-icon {
        width: 4rem;
        height: 4rem;
        top: -1px;
      }
    }
  }
`;
