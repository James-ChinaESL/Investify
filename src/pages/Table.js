import React, { useEffect, useState } from "react";
import { options } from "../utils.js/fetchOptions";
import { formatData } from "../utils.js/formatData";
import styled from "styled-components";
import HeaderForTable from "../components/HeaderForTable";
import Row from "../components/Row";
import { filterApiInfo } from "../utils.js/filterApiInfo";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { res } from "../model.js/responseData";

export default function Table({ list, formatBy }) {
  const [tableStocks, setTableStocks] = useState([]);
  const [isLoading, setIsloading] = useState();
  const [sortedBy, setSortedBy] = useState();
  const fetchData = async () => {
    setIsloading(true);
    ///////fetching starts
    // const res = await axios.get(
    //   "https://yh-finance.p.rapidapi.com/market/v2/get-quotes",
    //   options(list)
    // );
    ///////fetching ends

    const filteredData = filterApiInfo(res);
    const formatedData = formatData(filteredData);
    setTableStocks(formatedData);
    // setIsloading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sortByName = () => {
    setIsloading(true);
    if (sortedBy === "nameDes") {
      const sorted = tableStocks.sort((a, b) =>
        a.shortName < b.shortName ? 1 : -1
      );
      setTableStocks(sorted);
      setIsloading(false);
      setSortedBy("nameAsc");
    } else {
      const sorted = tableStocks.sort((a, b) =>
        a.shortName > b.shortName ? 1 : -1
      );
      setTableStocks(sorted);
      setIsloading(false);
      setSortedBy("nameDes");
    }
  };

  const sortByCap = () => {
    setIsloading(true);
    if (sortedBy === "capDes") {
      const sorted = tableStocks.sort(
        (a, b) => b.marketCaptoSort - a.marketCaptoSort
      );
      setTableStocks(sorted);
      setIsloading(false);
      setSortedBy("capAsc");
    } else {
      const sorted = tableStocks.sort(
        (a, b) => a.marketCaptoSort - b.marketCaptoSort
      );
      setTableStocks(sorted);
      setIsloading(false);
      setSortedBy("capDes");
    }
  };
  // const sortByMarketCap = () => {
  //   console.log("sortByMarketCap");

  // setTableStocks(sorted);

  const sortByPrice = (stocks) => {};
  const sortByToday = (stocks) => {};
  const sortByYearRange = (stocks) => {};

  return (
    <Wrapper>
      <HeaderForTable
        sortByName={sortByName}
        sortByCap={sortByCap}
        // sortByPrice={sortByPrice}
        // sortByToday={sortByToday}
        // sortByYearRange={sortByYearRange}
      />
      <div className='table'>
        {tableStocks.map((company, i) => {
          return <Row {...company} rank={i + 1} key={uuidv4()}></Row>;
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
