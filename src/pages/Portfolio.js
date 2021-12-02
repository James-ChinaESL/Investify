import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { DonutChart } from "../components/DonutChart";
import HoldingsTable from "../components/HoldingsTable";
import { useParams } from "react-router-dom";
import { useUserContext } from "../contexts/userContext";
import { useCalculationsContext } from "../contexts/calculationsContext";
import { Link } from "react-router-dom";
import { usdPlus, usdNoPlus, percent } from "../utils/formatNumbersForUI";
import MiniButton from "../components/MiniButton";
import { defineClass } from "../utils/defineClass";
import Spinner from "../components/Spinner";

const Portfolio = () => {
  const [todayUnit, setTodayUnit] = useState("%");
  const [returnUnit, setReturnUnit] = useState("%");
  const { allUsers, allPrices } = useUserContext();
  const {
    currentPrice,
    todayTotalChangeUSD,
    todayTotalChangePercent,
    investSince,
  } = useCalculationsContext();

  let { name } = useParams();
  name = name.toLowerCase();

  const [user, setUser] = useState();
  useEffect(() => {
    if (!allUsers) return;
    // if (!user?.userName === name) {
    setUser(
      allUsers.find((user) => {
        return user.userName.toLowerCase() === name;
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, allPrices]);
  if (!user) return <Spinner />;
  const rank =
    allUsers
      .sort((a, b) => {
        return b.accountValue - a.accountValue;
      })
      .findIndex((player) => {
        return player.userName === user.userName;
      }) + 1;
  const { accountValue, cash, holdings, userName, regTimestamp } = user;

  const totalReturnUSD = accountValue - 10000;

  const totalReturnPercent = parseFloat(
    ((totalReturnUSD / 10000) * 100).toFixed(2)
  );
  let investmentTerm = Date.now() - regTimestamp;
  const yearTerm = 31536000000;
  const monthTerm = 2592000000;
  investmentTerm = investmentTerm >= monthTerm ? investmentTerm : monthTerm;

  const annualReturn = (yearTerm * totalReturnPercent) / investmentTerm;
  // console.log(annualReturn);

  const donutData = holdings.map((stock) => {
    return {
      label: stock.symbol,
      value: stock.quantity * currentPrice(stock),
    };
  });
  donutData.unshift({
    label: "USD",
    value: cash,
  });
  return (
    <Wrapper>
      <div className='overview card'>
        <h2 className='title'>Overview</h2>
        <div className='total field'>
          <div className='label '>account value</div>
          <div className='value'>{usdNoPlus(accountValue)}</div>
        </div>
        <div className='rank field'>
          <div className='label'>Rank</div>
          <div className='value'>
            {rank}
            <span className='users_amount'>
              <Link to='/allplayers'>
                <span className='users'>of {allUsers.length} PLAYERS</span>
              </Link>
            </span>
          </div>
        </div>
        <div className='today_change field'>
          <div className='label group'>
            today
            <MiniButton
              content={"$"}
              value={todayUnit}
              setValue={() => setTodayUnit("$")}
              small
            />
            <MiniButton
              content={"%"}
              value={todayUnit}
              setValue={() => setTodayUnit("%")}
              small
            />
          </div>
          <div
            className={`value  ${defineClass(todayTotalChangePercent(user))}`}
          >
            {todayUnit === "%"
              ? percent(todayTotalChangePercent(user))
              : usdPlus(todayTotalChangeUSD(user))}
          </div>
        </div>
        <div className='current_return field'>
          <div className='label group'>
            Total Return
            <MiniButton
              content={"$"}
              value={returnUnit}
              setValue={() => setReturnUnit("$")}
              small
            />
            <MiniButton
              content={"%"}
              value={returnUnit}
              setValue={() => setReturnUnit("%")}
              small
            />
          </div>
          <div className={`value ${defineClass(totalReturnUSD)}`}>
            {returnUnit === "%"
              ? percent(totalReturnPercent)
              : usdPlus(totalReturnUSD)}
          </div>
        </div>
        <div className='cash field'>
          <div className='label'>cash</div>
          <div className='value'>{usdNoPlus(cash)}</div>
        </div>
        <div className='annual_return field'>
          <div className={`label `}>annual return</div>
          <div className={`value ${defineClass(annualReturn)}`}>
            {percent(annualReturn)}
          </div>
        </div>
        <div className='cash field'>
          <div className='label'>Player's name</div>
          <div className='value name'>{userName}</div>
        </div>
        <div className='annual_return field'>
          <div className='label'>Investing since</div>
          <div className='value'>{investSince(user)}</div>
        </div>
      </div>
      <div className='donut card'>
        <h2 className='title'>Shares of holdings</h2>

        <DonutChart data={donutData} />
      </div>
      <div className='table_container card'>
        <HoldingsTable user={user} />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  & {
    padding: 2rem 4rem;
    display: grid;
    grid-template-columns: calc(50% - 2rem / 2) max(470px, calc(50% - 2rem / 2));
    grid-template-rows: 40rem min-content;
    grid-gap: 2rem 2rem;
    grid-template-areas:
      "overview donut"
      "table table";
    .table_container {
      grid-area: table;
      &.card {
        padding: 0 0 1rem;
      }
    }
  }
  .card {
    padding: 1rem 2rem 2rem;
    font-family: var(--ff-primary);
    background-color: var(--clr-primary);
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
      background-color: var(--clr-secondary);
      border-radius: 15px;
      letter-spacing: 1px;
      .group {
        display: flex;
        align-items: center;
      }
    }
    .total,
    .rank {
      .value {
        font-size: 2.5rem;
      }
      .users_amount {
        margin-left: 2rem;
        font-size: 1.5rem;
        .users {
          color: #fafafa;
          text-transform: none;
        }
        & span {
          text-decoration: underline;
          text-transform: uppercase;
          cursor: pointer;
          color: #fafafa;
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
    width: max(100%, 500px);
    padding: 1rem 0 0;
    h2 {
      margin-bottom: -1rem;
      z-index: 1000000;
    }
    h2 + div {
      width: 100% !important;

      height: max(25vh, 35rem);
    }
    svg {
      border-radius: 0 0 15px 15px;
    }
  }
`;
export default Portfolio;
