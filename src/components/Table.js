import React, { useEffect, useState } from "react";
import { optionsYahoo, urlYahoo } from "../utils/fetchOptions";
import { formatData } from "../utils/formatData";
import styled from "styled-components";
import HeaderForTable from "./HeaderForTable";
import Row from "./Row";
import { filterApiInfo } from "../utils/filterApiInfo";
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
    // const res = await axios.get(urlYahoo, optionsYahoo(list));
    ///////fetching ends

    const filteredData = filterApiInfo(res);
    const formatedData = formatData(filteredData);
    setTableStocks(formatedData);
    setIsloading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sort = (type) => {
    let sorted;
    if (sortedBy === `${type}Des`) {
      switch (type) {
        case "name":
          sorted = tableStocks.sort((a, b) =>
            a.shortName < b.shortName ? 1 : -1
          );
          break;
        case "cap":
          sorted = tableStocks.sort(
            (a, b) => a.marketCaptoSort - b.marketCaptoSort
          );
          break;
        case "price":
          sorted = tableStocks.sort(
            (a, b) => a.regularMarketPrice - b.regularMarketPrice
          );
          break;
        case "todayChange":
          sorted = tableStocks.sort(
            (a, b) =>
              a.regularMarketChangePercent - b.regularMarketChangePercent
          );
          break;
        case "yearChange":
          sorted = tableStocks.sort(
            (a, b) => a.priceRelativeToYear - b.priceRelativeToYear
          );
          break;
        default:
          break;
      }

      setSortedBy(`${type}Asc`);
    } else {
      switch (type) {
        case "name":
          sorted = tableStocks.sort((a, b) =>
            a.shortName > b.shortName ? 1 : -1
          );
          break;
        case "cap":
          sorted = tableStocks.sort(
            (a, b) => b.marketCaptoSort - a.marketCaptoSort
          );
          break;
        case "price":
          sorted = tableStocks.sort(
            (a, b) => b.regularMarketPrice - a.regularMarketPrice
          );
          break;
        case "todayChange":
          sorted = tableStocks.sort(
            (a, b) =>
              b.regularMarketChangePercent - a.regularMarketChangePercent
          );
          break;
        case "yearChange":
          sorted = tableStocks.sort(
            (a, b) => b.priceRelativeToYear - a.priceRelativeToYear
          );
          break;
        default:
          break;
      }
      setSortedBy(`${type}Des`);
    }
    setTableStocks(sorted);
  };

  return (
    <Wrapper>
      <HeaderForTable
        sortByName={() => sort("name")}
        sortByCap={() => sort("cap")}
        sortByPrice={() => sort("price")}
        sortByToday={() => sort("todayChange")}
        sortByYear={() => sort("yearChange")}
      />
      <div className='table'>
        {tableStocks.map((company, i) => {
          return <Row {...company} rank={i + 1} key={uuidv4()}></Row>;
        })}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  .table {
    font-family: var(--ff-primary);
    font-size: 2rem;
    display: grid;
    grid-template-columns: 95%;
    grid-auto-rows: min-content;
    justify-content: center;
    gap: 2px;
    background-color: transparent;
  }
`;
