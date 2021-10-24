import React from "react";
import { useFiftyContext } from "../model.js/FiftyContent";
import Row from "../components/Row";
import styled from "styled-components";
import HeaderForTable from "../components/HeaderForTable";

export default function Table() {
  const { fiftyStocks } = useFiftyContext();
  let stocksToProps = fiftyStocks;

  return (
    <Wrapper>
      <HeaderForTable
      // sortByName={sortByName}
      // sortByCap={sortByCap}
      // sortByPrice={sortByPrice}
      // sortByToday={sortByToday}
      // sortByYearRange={sortByYearRange}
      />
      <div className='table'>
        {fiftyStocks.map((company, i) => {
          return <Row {...company} key={i + 1} i={i + 1}></Row>;
        })}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .table {
    font-size: 2rem;
    display: grid;
    grid-template-columns: 95%;
    grid-auto-rows: min-content;
    justify-content: center;
    gap: 2px;
    background-color: transparent;
  }
`;
