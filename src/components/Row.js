import React from "react";
import styled from "styled-components";
function Row({
  shortName,
  currency,
  fiftyTwoWeekHigh,
  fiftyTwoWeekHighChangePercent,
  fiftyTwoWeekLow,
  fiftyTwoWeekLowChangePercent,
  marketCap,
  regularMarketPrice,
  symbol,
  i,
}) {
  return (
    <Wrapper>
      <div className='table__row'>
        <div className='rank'>{i}</div>
        <div className='main_info'>
          <div className='image-container'>
            <img
              className='company-logo'
              src={`./logos/${symbol}.png`}
              alt={`${shortName}_logo`}
            />
          </div>
          <div className='name-container'>
            <div className='name'> {shortName}</div>
            <div className='ticker'>{symbol}</div>
          </div>
        </div>
        <div className='cap-container'>{}</div>
        <div className='price'></div>
        <div className='high-low'></div>
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  .table__row {
    /* width: 100vw; */
    display: flex;
    justify-content: space-between;
    background-color: #2b2d3e;
    .main_info {
      .rank {
      }
      display: flex;
      .image-container {
        .company-logo {
          margin-top: 5px;
          height: 32px;
          width: 32px;
        }
      }
      .name {
      }
      .ticker {
      }
    }

    .cap-container {
    }
  }
`;
export default Row;
