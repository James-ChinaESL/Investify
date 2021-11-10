import React from "react";
import styled from "styled-components";
import PriceSlider from "./PriceSlider";
import { v4 as uuidv4 } from "uuid";

function Row({
  shortName,
  fiftyTwoWeekHigh: high,
  fiftyTwoWeekLow: low,
  marketCap,
  regularMarketPrice: price,
  regularMarketChangePercent: change,
  symbol,
  rank,
}) {
  return (
    <Wrapper>
      <div className='table__row'>
        <div className='rank'>{rank}</div>
        <div className='join'>
          <div className='image-container'>
            <img
              className='company-logo'
              src={`./logos/${symbol}.png`}
              // src={`https://finnhub.io/api/logo?symbol=${symbol}`}
              alt='logo'
            />
          </div>
          <a className='name-link' href={`company/${symbol}`}>
            <div className='name'> {shortName}</div>
            <div className='ticker'>{symbol}</div>
          </a>
        </div>
        <div className='market-cap'>${marketCap}</div>
        <div className='price'>${price}</div>
        <div className={`day-change ${change > 0 ? "green" : "red"}`}>
          {change}%
        </div>
        <div className='price-slider'>
          <PriceSlider low={low} high={high} price={price} key={uuidv4()} />
        </div>
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  .table__row {
    display: flex;
    justify-content: space-around;
    background-color: var(--clr-row);
    :hover {
      background-color: var(--clr-row-hover);
    }
    .rank,
    .market-cap,
    .price,
    .day-change,
    .company-logo,
    .image-container {
      font-family: var(--ff-numbers), sans-serif;
      vertical-align: middle;
      line-height: 6.5rem;
      text-align: right;
    }
    .rank {
      margin-left: 1.5rem;
      width: 2.2rem;
    }
    .join {
      display: flex;
      .image-container {
        width: 4rem;
        height: 6.5rem;

        .company-logo {
          height: 4rem;
          width: 4rem;
        }
      }
      .name-link {
        margin-left: 2rem;
        width: 9.6rem;
        text-decoration: none;
        &,
        &:link,
        &:visited {
          color: var(--fc-primary);
        }
        &:hover {
          text-decoration: underline;
        }
        .name {
          margin-top: 1.5rem;
          font-size: 2rem;
          font-weight: 600;
          &:hover,
          .ticker {
          }
        }
        .ticker {
          font-size: 1.5rem;
        }
      }
    }
    .market-cap {
      width: 12rem;
      text-align: right;
      margin-left: 0rem;
    }
    .price {
      width: 8.2rem;
    }
    .day-change {
      width: 7.2rem;
      &.red {
        color: #fa5555;
      }
      &.green {
        color: #afa;
      }
    }
    .price-slider {
      width: 20rem;
      margin-right: 4.5rem;
    }

    @media (max-width: 880px) {
      .price-slider {
        width: 14rem;
      }
    }
  }
`;

export default Row;
