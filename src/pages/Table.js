import React, { useEffect, useState } from "react";
import { options } from "../utils.js/fetchOptions";
import { formatData } from "../utils.js/formatData";
import styled from "styled-components";
import HeaderForTable from "../components/HeaderForTable";
import Row from "../components/Row";
import { filterApiInfo } from "../utils.js/filterApiInfo";
import { formatStockData } from "../utils.js/formatData";
import axios from "axios";

export default function Table({ list }) {
  const [tableStocks, setTableStocks] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const fetchData = async () => {
    setIsloading(true);
    /////////fetching starts
    const res = await axios.get(
      "https://yh-finance.p.rapidapi.com/market/v2/get-quotes",
      options(list)
    );
    const filteredData = filterApiInfo(res);
    const formatedData = formatStockData(filteredData);
    setTableStocks(formatedData);
  };

  useEffect(() => {
    fetchData(options);
  }, []);

  // const sortByNameDes = () => {
  //   console.log("sortByNameDes");
  //   const sorted = formatStockData(filteredData).sort((a, b) =>
  //     a.shortName > b.shortName ? 1 : -1
  //   );

  //   setTableStocks(sorted);
  // };
  // const sortByMarketCap = () => {
  //   console.log("sortByMarketCap");
  //   const sorted = formatStockData(filteredData).sort(
  //     (a, b) => b.marketCaptoSort - a.marketCaptoSort
  //   );

  // setTableStocks(sorted);

  const sortByPrice = (stocks) => {};
  const sortByToday = (stocks) => {};
  const sortByYearRange = (stocks) => {};

  return (
    <Wrapper>
      <HeaderForTable
      // sortByNameDes={sortByNameDes}
      // sortByCap={sortByCap}
      // sortByPrice={sortByPrice}
      // sortByToday={sortByToday}
      // sortByYearRange={sortByYearRange}
      />
      <div className='table'>
        {tableStocks.map((company, i) => {
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
