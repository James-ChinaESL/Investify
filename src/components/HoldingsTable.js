import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { usdPlus, usdNoPlus, percent } from "../utils/formatNumbersForUI";
import { Link } from "react-router-dom";
import { useCalculationsContext } from "../contexts/calculationsContext";
import MiniButton from "./MiniButton";
import { defineClass } from "../utils/defineClass";
import { v4 as uuidv4 } from "uuid";
import { SortButtons } from "./SortButtons";

const HoldingsTable = ({ user }) => {
  const { currentPrice, userStockDayChangePercent, userStockDayChangeUSD } =
    useCalculationsContext();

  const [todayUnit, setTodayUnit] = useState("%");
  const [returnUnit, setReturnUnit] = useState("%");
  const [sortedBy, setSortedBy] = useState(null);

  const holdingsInfo = user.holdings.map((stock) => {
    const price = currentPrice(stock);
    const totalValue = price * stock.quantity;
    const dayChangePercent = userStockDayChangePercent(user, stock);
    const dayChangeUSD = userStockDayChangeUSD(user, stock);
    const returnUSD = price * stock.quantity - stock.quantity * stock.average;
    const returnPercent = (returnUSD / (stock.quantity * stock.average)) * 100;
    return {
      ...stock,
      price,
      totalValue,
      dayChangeUSD,
      dayChangePercent,
      returnUSD,
      returnPercent,
    };
  });

  const [holdings, setHoldings] = useState(holdingsInfo);

  const sort = (type, order) => {
    if (sortedBy === type + order) {
      console.log(holdingsInfo);

      setHoldings(holdingsInfo);
      setSortedBy("");
      return;
    }

    let sortedHoldings;
    switch (type) {
      case "symbol":
        sortedHoldings = [...holdingsInfo].sort((a, b) => {
          return a.symbol > b.symbol ? 1 : -1;
        });
        break;
      case "dayChangePercent":
        sortedHoldings = [...holdingsInfo].sort((a, b) => {
          return b.dayChangePercent - a.dayChangePercent;
        });
        break;

      case "dayChangeUSD":
        sortedHoldings = [...holdingsInfo].sort((a, b) => {
          return b.dayChangeUSD - a.dayChangeUSD;
        });
        break;

      case "returnUSD":
        sortedHoldings = [...holdingsInfo].sort((a, b) => {
          return b.returnUSD - a.returnUSD;
        });
        break;

      case "returnPercent":
        sortedHoldings = [...holdingsInfo].sort((a, b) => {
          return b.returnPercent - a.returnPercent;
        });
        break;

      case "totalValue":
        sortedHoldings = [...holdingsInfo].sort((a, b) => {
          return b.totalValue - a.totalValue;
        });
        break;
      default:
        break;
    }
    if (order === "Asc") {
      sortedHoldings.reverse();
    }
    setHoldings(sortedHoldings);
    setSortedBy(type + order);
  };
  useEffect(() => {}, [user]);
  return (
    <Wrapper>
      <table className='holdings-table'>
        <thead>
          <tr className='header'>
            <th className='symbol sort'>
              <SortButtons type='symbol' currentSort={sortedBy} sort={sort} />
              Symbol
            </th>
            <th className='price'>Price</th>
            <th className='today group sort'>
              {todayUnit === "%" ? (
                <SortButtons
                  type='dayChangePercent'
                  currentSort={sortedBy}
                  sort={sort}
                />
              ) : (
                <SortButtons
                  type='dayChangeUSD'
                  currentSort={sortedBy}
                  sort={sort}
                />
              )}
              <div className='label'>Today</div>

              <MiniButton
                content={"$"}
                value={todayUnit}
                setValue={() => setTodayUnit("$")}
              />
              <MiniButton
                content={"%"}
                value={todayUnit}
                setValue={() => setTodayUnit("%")}
              />
            </th>
            <th className='average'>Average</th>
            <th className='quantity'>QTY</th>

            <th className='total sort'>
              <SortButtons
                type='totalValue'
                currentSort={sortedBy}
                sort={sort}
              />
              Total Value
            </th>

            <th className='return group sort'>
              {returnUnit === "%" ? (
                <SortButtons
                  type='returnPercent'
                  currentSort={sortedBy}
                  sort={sort}
                />
              ) : (
                <SortButtons
                  type='returnUSD'
                  currentSort={sortedBy}
                  sort={sort}
                />
              )}
              <div className='label'>Return</div>
              <MiniButton
                content={"$"}
                value={returnUnit}
                setValue={() => setReturnUnit("$")}
              />
              <MiniButton
                content={"%"}
                value={returnUnit}
                setValue={() => setReturnUnit("%")}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {holdings &&
            holdings.map((stock) => {
              return (
                <tr className='row' key={uuidv4()}>
                  <td className='link symbol'>
                    <Link to={`/company/${stock.symbol}`}>{stock.symbol}</Link>
                  </td>
                  <td className='price'>{usdNoPlus(stock.price)}</td>
                  <td className={`today ${defineClass(stock.dayChangeUSD)}`}>
                    {todayUnit === "%"
                      ? percent(stock.dayChangePercent)
                      : usdPlus(stock.dayChangeUSD)}
                  </td>
                  <td className='average'>{usdNoPlus(stock.average)}</td>
                  <td className='quantity'>{stock.quantity}</td>
                  <td className='total'>{usdNoPlus(stock.totalValue)}</td>
                  <td className={`return ${defineClass(stock.returnUSD)}`}>
                    {returnUnit === "%"
                      ? percent(stock.returnPercent)
                      : usdPlus(stock.returnUSD)}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {holdings.length === 0 && (
        <h2 className='empty_label'>Holdings list is currently empty</h2>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  table {
    font-size: 1.8rem;
    letter-spacing: 1px;
    padding: 0;
    margin: 0;
    width: 100%;
    border-collapse: collapse;
    border-radius: 15px;
    .header {
      .label {
        /* margin-left: 2rem; */
        position: relative;
        margin-right: 0.5rem;
        display: inline-block;
      }
    }
    th {
      font-weight: normal;
      font-size: 2rem;
      padding-top: 1.5rem;
      padding-bottom: 1.5rem;

      &.sort {
        position: relative;
        top: -0.9rem;
      }
    }

    td {
      text-align: center;
      padding-top: 1rem;
      padding-bottom: 1rem;
      &.link {
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
        a {
          text-decoration: none;
          color: var(--clr-white);
          display: block;
          width: 100%;
        }
      }
    }
    tbody {
      tr:nth-child(odd) {
        background-color: #293c55;
      }
    }
  }
  .empty_label {
    text-align: center;
    letter-spacing: 2px;
  }
  @media (max-width: 750px) {
    .today {
      display: none;
    }
    .average {
      display: none;
    }
  }
  @media (max-width: 580px) {
    .total {
      display: none;
    }
  }
  @media (max-width: 400px) {
    .quantity {
      display: none;
    }
  }
`;
export default HoldingsTable;
