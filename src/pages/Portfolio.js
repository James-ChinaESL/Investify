import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { DonutChart } from "../components/DonutChart";
import HoldingsTable from "../components/HoldingsTable";
import { useParams } from "react-router-dom";
import { useUserContext } from "../contexts/userContext";

const Portfolio = () => {
  let { allUsers, allPrices } = useUserContext();
  const { name } = useParams();

  const [user, setUser] = useState();

  const { accountValue, cash, holdings, userName } = user ? user : {};
  console.log(user);

  useEffect(() => {
    if (!allUsers) return;
    if (
      !allUsers.find((user) => {
        return user.userName === name;
      })
    ) {
      return setUser(null);
    }
    // if (
    //   allUsers.find((user) => {
    //     return user?.userName === name;
    //   })?.accountValue === undefined
    // )
    //   return;
    setUser(
      allUsers.find((user) => {
        return user.userName === name;
      })
    );
  }, [allUsers]);

  // const donutData = holdings.map((stock) => {
  //   return {
  //     label: stock.symbol,
  //     value: stock.quantity * stock.average,
  //   };
  // });
  // donutData.unshift({
  //   label: "USD",
  //   value: cash,
  // });

  return (
    <Wrapper>
      <div className='overview card'>
        <h2 className='title'>Overview</h2>
        <div className='total field'>
          <div className='label '>account value</div>
          <div className='value'>$13,324.23</div>
        </div>
        <div className='rank field'>
          <div className='label'>Rank</div>
          <div className='value'>
            12
            <span className='users_amount'>
              &nbsp;of <span>34 players</span>
            </span>
          </div>
        </div>
        <div className='today_change field'>
          <div className='label'>today's change</div>
          <div className='value'>+$324.23 &nbsp;&nbsp; +4.53%</div>
        </div>
        <div className='current_return field'>
          <div className='label'>current return</div>
          <div className='value'>+$1324.23 &nbsp;&nbsp;+14.53% </div>
        </div>
        <div className='cash field'>
          <div className='label'>cash</div>
          <div className='value'>$4,456.81</div>
        </div>
        <div className='annual_return field'>
          <div className='label'>annual return</div>
          <div className='value'>+26,75%</div>
        </div>
        <div className='cash field'>
          <div className='label'>Player's name</div>
          <div className='value'>dmdeganov</div>
        </div>
        <div className='annual_return field'>
          <div className='label'>registered on</div>
          <div className='value'>21 March 2021</div>
        </div>
      </div>
      <div className='donut card'>
        <h2 className='title'>Shares of holdings</h2>

        {/* <DonutChart data={donutData} /> */}
      </div>
      <div className='table_container card'>
        <HoldingsTable />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  & {
    padding: 2rem 4rem;
    display: grid;
    grid-template-columns: calc(50% - 2rem / 2) max(470px, calc(50% - 2rem / 2));
    grid-template-rows: min-content min-content;
    grid-gap: 2rem 2rem;
    grid-template-areas:
      "overview donut"
      "table table";
    .table_container {
      grid-area: table;
    }
  }
  .card {
    padding: 1rem 2rem 2rem;
    font-family: var(--ff-big-numbers);
    background-color: var(--clr-row);
    border-radius: 15px;

    .title {
      font-size: 2.5rem;
      text-align: center;
      padding: 1rem 0;
    }
  }

  .overview {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: min-content;
    gap: 2rem 2rem;
    .title {
      grid-column: 1/3;
      margin-bottom: -1rem;
      font-size: 2.5rem;
      text-align: center;
    }
    .field {
      display: flex;
      flex-direction: column;
      justify-content: center;
      background-color: var(--clr-field);
      border-radius: 15px;
      letter-spacing: 1px;
    }
    .total,
    .rank {
      .value {
        font-size: 2.5rem;
      }
      .users_amount {
        margin-left: 2rem;
        font-size: 1.5rem;
        & span {
          text-decoration: underline;
          text-transform: uppercase;
          cursor: pointer;
        }
      }
    }
    .value {
      padding: 0.6rem 2rem;
    }
    .label {
      text-transform: uppercase;
      font-size: 1.2rem;
      padding: 0.5rem 2rem 0rem;
    }
    .value {
      font-size: 2.2rem;
    }
  }

  .donut {
    padding-bottom: 0;
    h2 {
    }
    /* max-height: 50vh; */
    /* overflow: hidden; */
    h2 + div {
      /* z-index: 1000; */
      width: 100% !important;
      height: 60vh !important;
    }
  }
`;
export default Portfolio;
