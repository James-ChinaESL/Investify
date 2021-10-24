import React from "react";
import styled from "styled-components";
import { FaSort } from "react-icons/fa";

function HeaderForTable() {
  return (
    <Wrapper>
      <div className='header-table'>
        <div className='rank'>Rank</div>
        <div className='join'>
          Name <FaSort className='sort' />
        </div>
        <div className='market-cap'>
          Market Cap <FaSort className='sort' />
        </div>
        <div className='price'>
          Price <FaSort className='sort' />
        </div>
        <div className='day-change'>
          Today <FaSort className='sort' />
        </div>
        <div className='price-slider'>
          52 weeks price range <FaSort className='sort' />
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .header-table {
    width: 95%;
    display: flex;
    margin: 10px auto 2px;
    justify-content: space-between;
    background-color: #2b2d3e;
    font-size: 1.8rem;
    font-family: Roboto + Mono;
    font-weight: 600;
    text-align: center;
    vertical-align: middle;
    line-height: 6.5rem;
    .sort {
      display: inline-block;
      cursor: pointer;
      vertical-align: middle;
      line-height: 6.5rem;
    }
    .rank {
      margin-left: 1.5rem;
      width: 2.1rem;
    }
    .join {
      width: 19.5rem;
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
      width: 7.5rem;
    }
    .price-slider {
      font-size: 1.8rem;
      width: 20rem;
      margin-right: 4.5rem;
    }
  }
`;

export default HeaderForTable;
