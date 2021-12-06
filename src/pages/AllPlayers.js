import React, { useState } from "react";
import styled from "styled-components";
import { useUserContext } from "../contexts/userContext";
import {
  usdPlus,
  usdNoPlus,
  percent,
  percentNoPlus,
} from "../utils/formatNumbersForUI";
import { useCalculationsContext } from "../contexts/calculationsContext";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import MiniButton from "../components/MiniButton";
import { defineClass } from "../utils/defineClass";
import Spinner from "../components/Spinner";
import { MainWithPadding } from "../utils/commonPadding";

const AllPlayers = () => {
  const { allUsers } = useUserContext();
  const { todayTotalChangeUSD, todayTotalChangePercent, investSince } =
    useCalculationsContext();
  const [todayUnit, setTodayUnit] = useState("%");
  const [returnUnit, setReturnUnit] = useState("%");

  if (allUsers.length === 0) {
    return <Spinner />;
  }

  return (
    <Wrapper>
      <h1>All Players</h1>
      <div className='table_container card'>
        <table>
          <thead>
            <tr className='header'>
              <th>Rank</th>
              <th>Name</th>
              <th>
                Account <br className='break' />
                Value, $
              </th>
              <th className='return group'>
                <div className='label'>Return</div>
                <div className='minibuttons'>
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
                </div>
              </th>
              <th className='today group'>
                <div className='label'>Today</div>
                <div className='minibuttons'>
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
                </div>
              </th>
              <th className='cash'>Cash, %</th>
              <th className='reg-month'>
                Investing
                <br className='break' /> since
              </th>
            </tr>
          </thead>
          <tbody>
            {allUsers
              .sort((a, b) => {
                return b.accountValue - a.accountValue;
              })
              .map((user, i) => {
                return (
                  <tr key={uuidv4()}>
                    <td>{i + 1}</td>
                    <td className='link'>
                      <Link to={`/portfolio/${user.userName.toLowerCase()}`}>
                        {user.userName}
                      </Link>
                    </td>
                    <td className='account-value'>
                      {usdNoPlus(user.accountValue)}
                    </td>

                    <td
                      className={`return ${defineClass(
                        user.accountValue - 10000
                      )}`}
                    >
                      {returnUnit === "%"
                        ? percent((user.accountValue - 10000) / 100)
                        : usdPlus(user.accountValue - 10000)}
                    </td>

                    <td
                      className={`today ${defineClass(
                        todayTotalChangeUSD(user)
                      )}`}
                    >
                      {todayUnit === "%"
                        ? percent(todayTotalChangePercent(user))
                        : usdPlus(todayTotalChangeUSD(user))}
                    </td>

                    <td className='cash'>
                      {percentNoPlus((user.cash / user.accountValue) * 100)}
                    </td>
                    <td className='reg-month'>{investSince(user)}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled(MainWithPadding)`
  & {
    h1 {
      text-align: center;
      letter-spacing: 2px;
      margin-bottom: 2rem;
      font-size: 3.3rem;
    }

    /* padding: 0rem max(4rem, 5vw); */
    font-family: var(--ff-primary);
    font-size: 2rem;
    /* @media (max-width: 700px) {
      & {
        padding: 2rem;
      }
    } */
  }

  .minibuttons {
    display: inline-block;
  }
  .break {
    display: none;
  }
  table {
    font-size: 1.8rem;
    letter-spacing: 1px;
    width: 100%;
    border-collapse: collapse;
    border-radius: 15px;
    .header {
      padding: 0 2rem;

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
      &:first-child {
        padding-left: 1rem;
      }
      &:last-child {
        padding-right: 1rem;
      }
    }

    td {
      text-align: center;
      padding-top: 1rem;
      padding-bottom: 1rem;

      &.account-value {
        text-align: right;
        padding-right: 5%;
      }
      &.link {
        cursor: pointer;
        a {
          text-decoration: none;
          color: var(--clr-white);
        }
        &:hover {
          text-decoration: underline;
        }
        /* width: 7rem; */
      }
    }
    tbody {
      tr:nth-child(odd) {
        background-color: #293c55;
      }
    }
    @media (max-width: 850px) {
      th {
        .break {
          display: block;
        }
        .minibuttons {
          display: block;
        }
      }
    }
    @media (max-width: 600px) {
      .reg-month {
        display: none;
      }
      .cash {
        display: none;
      }
    }
    @media (max-width: 440px) {
      font-size: 1.5rem;
      th {
        font-size: 1.7rem;
      }
      .today {
        display: none;
      }
    }
  }
`;

export default AllPlayers;
