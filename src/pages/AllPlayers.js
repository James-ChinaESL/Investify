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

const AllPlayers = () => {
  const { allUsers } = useUserContext();
  const { todayTotalChangeUSD, todayTotalChangePercent, investSince } =
    useCalculationsContext();
  const [todayUnit, setTodayUnit] = useState("%");
  const [returnUnit, setReturnUnit] = useState("%");
  console.log("allUsers rendered");

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
              <th>Account Value, $</th>
              <th className='return group'>
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
              <th className='today group'>
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
              <th>Cash, %</th>
              <th>Investing since</th>
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
                    <td className='account_value'>
                      {usdNoPlus(user.accountValue)}
                    </td>

                    <td className={`${defineClass(user.accountValue - 10000)}`}>
                      {returnUnit === "%"
                        ? percent((user.accountValue - 10000) / 100)
                        : usdPlus(user.accountValue - 10000)}
                    </td>

                    <td className={`${defineClass(todayTotalChangeUSD(user))}`}>
                      {todayUnit === "%"
                        ? percent(todayTotalChangePercent(user))
                        : usdPlus(todayTotalChangeUSD(user))}
                    </td>

                    <td>
                      {percentNoPlus((user.cash / user.accountValue) * 100)}
                    </td>
                    <td>{investSince(user)}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  & {
    padding: 0rem 4rem;
    font-family: var(--ff-primary);
    font-size: 2rem;
  }

  .table_container {
    /* padding: 0; */
  }
  table {
    font-size: 1.8rem;
    letter-spacing: 1px;
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
    }

    td {
      text-align: center;
      padding-top: 1rem;
      padding-bottom: 1rem;

      &.account_value {
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
  }
`;

export default AllPlayers;
