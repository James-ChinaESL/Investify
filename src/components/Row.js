import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import PriceSlider from "./PriceSlider";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { device } from "../utils/breakpoints";
import { server } from "../utils/fetchOptions";

const Row = ({
  shortName,
  fiftyTwoWeekHigh: high,
  fiftyTwoWeekLow: low,
  marketCap,
  regularMarketPrice: price,
  regularMarketChangePercent: change,
  symbol,
  rank,
}) => {
  const logo = useRef(null);

  useEffect(() => {
    logo.current.onerror = (e) => {
      e.target.src = `${server}/logos/default.png`;
      e.target.onerror = null;
    };
  }, []);

  return (
    <Wrapper>
      <div className='table__row'>
        <div className='rank'>{rank}</div>
        <div className='name-logo-group'>
          <div className='image-container'>
            <img
              ref={logo}
              className='company-logo'
              src={`${server}/logos/${symbol}.webp`}
              alt='logo'
            />
          </div>
          <Link className='name-link' to={`/company/${symbol}`}>
            <div className='name'> {shortName}</div>
            <div className='ticker'>{symbol}</div>
          </Link>
        </div>
        <div className='market-cap'>${marketCap}</div>
        <div className='price'>${price}</div>
        <div className={`day-change ${change > 0 ? "green" : "red"}`}>
          {change}%
        </div>
        <div className='price-slider'>
          <div className='slider-wrapper'>
            <PriceSlider low={low} high={high} price={price} key={uuidv4()} />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  .table__row {
    padding: 0 2.5rem 0 1.5rem;
    display: grid;
    align-items: center;
    grid-template-columns:
      minmax(5rem, 7rem) 17.5rem minmax(12rem, 1fr)
      minmax(8.2rem, 1fr)
      minmax(12rem, 1fr) minmax(28rem, 1fr);
    justify-content: center;
    background-color: var(--clr-primary);

    :hover {
      background-color: var(--clr-primary-hover);
    }
    .rank,
    .market-cap,
    .price,
    .day-change,
    .company-logo,
    .image-container {
      font-family: var(--ff-primary), sans-serif;
      vertical-align: middle;
      line-height: 6.5rem;
      text-align: center;
    }

    .name-logo-group {
      display: flex;
      margin-left: min(3rem, 2vw);
      .image-container {
        width: 4rem;
        height: 6.5rem;
        .company-logo {
          height: 4rem;
          width: 4rem;
        }
      }
      .name-link {
        width: 12rem;

        margin-left: 1.5rem;
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
          font-size: 1em;
          font-weight: 600;
          letter-spacing: 1px;
        }
        .ticker {
          font-size: 0.7em;
        }
      }
    }

    .day-change {
      &.red {
        color: #fa5555;
      }
      &.green {
        color: #afa;
      }
    }
    .slider-wrapper {
      padding: 0 3rem;
    }

    @media ${device.tabletL} {
      grid-template-columns:
        minmax(5rem, 7rem) minmax(17rem, max-content) minmax(12rem, 1fr)
        minmax(8.2rem, 1fr)
        minmax(12rem, 1fr) minmax(20rem, 1fr);
      @media (max-width: 700px) {
        padding: 0 2rem 0 3rem;
        width: 100vw;
        grid-template-columns:
          16rem minmax(8rem, 1fr)
          minmax(8.2rem, 1fr)
          minmax(8rem, 1fr);
        .rank {
          display: none;
        }
        .name-logo-group {
          margin-left: 1rem;
        }
        .price-slider {
          display: none;
        }
      }
      @media (max-width: 500px) {
        font-size: 1.8rem;
      }
      @media ${device.mobileL} {
        grid-template-columns:
          minmax(16rem, max-content)
          minmax(8.2rem, 1fr)
          minmax(8rem, 1fr);
        .name-logo-group {
          margin-left: 0.5rem;
        }
        .market-cap {
          display: none;
        }
      }
    }
  }
`;

export default Row;
