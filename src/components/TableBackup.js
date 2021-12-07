import React, { useEffect, useState } from "react";
import {
  popularStocks,
  optionsYahoo,
  urlYahoo,
  specialStocksOptions,
  urlDayLosers,
  urlDayGainers,
  urlTechGrowth,
  urlUndervaluedLargeCap,
  urlUndervaluedGrowth,
  popularStocksDescription,
} from "../utils/fetchOptions";
import { formatDataList, formatDataSpecialStocks } from "../utils/formatData";
import styled from "styled-components";
import Row from "./Row";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { SortButtons } from "./SortButtons";
import Spinner from "./Spinner";
import { device } from "../utils/breakpoints";
import { useStocksContext } from "../contexts/stocksContext";

export default function Table({ type, list }) {
  const { groupsContext } = useStocksContext();

  const [tableStocks, setTableStocks] = useState([]);
  const [isLoading, setIsloading] = useState();
  const [sortedBy, setSortedBy] = useState();
  const [description, setDescription] = useState("");
  const [initialOrder, setInitialOrder] = useState([]);

  const specialStocksUrls = {
    techGrowth: urlTechGrowth,
    undervaluedLargeCap: urlUndervaluedLargeCap,
    dayGainers: urlDayGainers,
    dayLosers: urlDayLosers,
    undervaluedGrowth: urlUndervaluedGrowth,
  };
  let formatedData;
  const fetchListData = async (list) => {
    let data;
    try {
      const res = await axios.get(urlYahoo, optionsYahoo(list));
      formatedData = formatDataList(res);
      if (list === popularStocks) {
        setDescription(popularStocksDescription);
      }
      // setPopularStocksData(formatedData);
    } catch (err) {
      alert(err);
      console.log(err);
    }
  };

  const fetchSpecialStocksData = async (type) => {
    try {
      const res = await axios.get(
        specialStocksUrls[type],
        specialStocksOptions
      );
      formatedData = formatDataSpecialStocks(res);
      setDescription(res.data.description.replace(".", ""));
    } catch (err) {
      alert(err);
      console.log(err);
    }
  };

  const fetchData = async () => {
    setIsloading(true);

    if (list) {
      if (list === popularStocks) {
        if (popularStocksData) {
          setTableStocks(popularStocksData);
        } else {
          // try {
          //   const res = await axios.get(urlYahoo, optionsYahoo(list));
          //   formatedData = formatDataList(res);
          //   if (list === popularStocks) {
          //     setDescription(popularStocksDescription);
          //   }
          //   setPopularStocksData(formatedData);
          // } catch (err) {
          //   alert(err);
          //   console.log(err);
          // }
        }
      } else {
      }
    }
    if (type) {
      // try {
      //   const res = await axios.get(specialStocks[type], specialStocksOptions);
      //   formatedData = formatDataSpecialStocks(res);
      //   setDescription(res.data.description.replace(".", ""));
      // } catch (err) {
      //   alert(err);
      //   console.log(err);
      // }
    }

    setTableStocks(formatedData);
    setInitialOrder(formatedData);
    setIsloading(false);
  };

  const sort = (type, order) => {
    if (type + order === sortedBy) {
      setTableStocks(initialOrder);
      setSortedBy("");
      return;
    }

    let sorted;
    switch (type) {
      case "name":
        sorted = [...tableStocks].sort((a, b) =>
          a.shortName > b.shortName ? 1 : -1
        );
        break;
      case "cap":
        sorted = [...tableStocks].sort(
          (a, b) => b.marketCaptoSort - a.marketCaptoSort
        );
        break;
      case "price":
        sorted = [...tableStocks].sort(
          (a, b) => b.regularMarketPrice - a.regularMarketPrice
        );
        break;
      case "todayChange":
        sorted = [...tableStocks].sort(
          (a, b) => b.regularMarketChangePercent - a.regularMarketChangePercent
        );
        break;
      case "yearRange":
        sorted = [...tableStocks].sort(
          (a, b) => b.priceRelativeToYear - a.priceRelativeToYear
        );
        break;
      default:
        break;
    }
    if (order === "Asc") {
      sorted.reverse();
    }
    setTableStocks(sorted);

    setSortedBy(type + order);
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, list]);
  return isLoading ? (
    <>
      <Spinner />
    </>
  ) : (
    <Wrapper>
      <div className='description'>
        <h1>{description}</h1>
      </div>
      {/* <h1 className='description'>"Famous companies we face every day"</h1> */}
      <div className='header-wrapper'>
        <div className='header-table'>
          <div className='rank'>Rank</div>
          <div className='name_logo'>
            <SortButtons type='name' currentSort={sortedBy} sort={sort} />
            Name
          </div>
          <div className='market-cap'>
            <SortButtons type='cap' currentSort={sortedBy} sort={sort} />
            <span>Market Cap</span>
          </div>
          <div className='price'>
            <SortButtons type='price' currentSort={sortedBy} sort={sort} />
            Price
          </div>
          <div className='day-change'>
            <SortButtons
              type='todayChange'
              currentSort={sortedBy}
              sort={sort}
            />
            Today
          </div>
          <div className='price-slider'>
            <SortButtons type='yearRange' currentSort={sortedBy} sort={sort} />
            52 weeks range
          </div>
        </div>
      </div>
      <div className='rows'>
        {tableStocks?.map((company, i) => {
          return <Row {...company} rank={i + 1} key={uuidv4()}></Row>;
        })}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .description {
    margin: 3rem 0 2rem;

    h1 {
      font-size: 2.2rem;
      padding: 0 2rem;
    }
  }
  .rows {
    margin-top: 2px;
    font-family: var(--ff-primary);
    font-size: 2rem;
    display: grid;
    grid-auto-rows: min-content;
    justify-content: center;
    gap: 2px;
  }
  .header-wrapper {
    display: grid;
    justify-content: center;
  }
  .header-table {
    padding: 0 2.5rem 0 1.5rem;
    display: grid;
    grid-template-columns:
      minmax(5rem, 7rem) 17.5rem minmax(12rem, 1fr)
      minmax(8.2rem, 1fr)
      minmax(12rem, 1fr) minmax(28rem, 1fr);
    background-color: var(--clr-primary);
    font-size: 1.8rem;
    letter-spacing: 1px;
    font-weight: 600;
    text-align: center;
    line-height: 6.5rem;
    text-transform: capitalize;
    .name-logo-group {
      width: 17.5rem;
    }
    @media ${device.tabletL} {
      grid-template-columns:
        minmax(5rem, 7rem) minmax(17rem, max-content) minmax(12rem, 1fr)
        minmax(8.2rem, 1fr)
        minmax(12rem, 1fr) minmax(20rem, 1fr);
      @media (max-width: 700px) {
        padding: 0 2rem 0 0rem;
        width: 100vw;
        grid-template-columns:
          19rem minmax(8rem, 1fr)
          minmax(8.2rem, 1fr)
          minmax(8rem, 1fr);
        .rank {
          display: none;
        }
        .name-logo-group {
          margin-left: 0rem;
        }
        .price-slider {
          display: none;
        }
        .market-cap {
          span {
            display: none;
          }
          &::after {
            content: "Cap";
            visibility: visible;
            display: inline-block;
          }
        }
      }
      @media ${device.mobileL} {
        grid-template-columns:
          minmax(16rem, max-content)
          minmax(8.2rem, 1fr)
          minmax(8rem, 1fr);
        font-size: 1.6rem;

        .market-cap {
          display: none;
        }

        .price,
        .day-change {
          margin-left: 2rem;
        }
      }
      /* display: none; */
    }

    .price-slider {
      font-size: 1.6rem;
    }

    .sort_icons {
      display: inline-block;
      cursor: pointer;
      position: relative;
      top: 0.7rem;
      right: 5px;

      svg {
        display: block;
        font-size: 1.8rem;
        &:first-of-type {
          margin-bottom: -0.8rem;
        }
      }
    }
  }
`;
