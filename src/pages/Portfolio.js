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
import { MainWithPadding } from "../utils/commonPadding";

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
    <>
      <Wrapper>
        <h1>My Portfolio</h1>
        <div className='grid'>
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
                    <span className='users'>
                      of {allUsers.length}{" "}
                      <span className='optional-word'>PLAYERS</span>
                    </span>
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
                className={`value  ${defineClass(
                  todayTotalChangePercent(user)
                )}`}
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
            <div className='big-donut'>
              <DonutChart data={donutData} />
            </div>
            <div className='small-donut'>
              <DonutChart data={donutData} small />
            </div>
          </div>
          <div className='table-container card'>
            <HoldingsTable user={user} />
          </div>
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled(MainWithPadding)`
  .grid {
    display: grid;
    grid-template-columns: 1fr max(420px, calc(50% - 2rem / 2));
    grid-template-rows: 40rem min-content;
    grid-gap: 2rem 2rem;
    grid-template-areas:
      "overview donut"
      "table table";
  }
  .card {
    padding: 1rem 2rem 2rem;

    .title {
      font-size: 2.5rem;
      text-align: center;
      padding: 1rem 0;
      margin-bottom: -1rem;
    }
  }

  .overview {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: min-content;
    gap: 2rem 2rem;
    .title {
      grid-column: 1/3;
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
          @media (max-width: 900px) and (min-width: 850px) {
            font-size: 1.1rem;
          }
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
    .small-donut {
      display: none;
    }
    .big-donut,
    .small-donut {
      padding-bottom: 1rem;
      overflow: hidden;
      margin: 0 auto;
      width: 99%;

      & > div {
        width: 100% !important;
        height: max(25vh, 35rem);
        padding-bottom: 1rem;
      }
    }
    padding: 1rem 0 1rem;
    h2 {
      margin-bottom: -1rem;
      z-index: 1000000;
    }
  }
  .table-container {
    grid-area: table;
    &.card {
      padding: 0 0 1rem;
    }
  }
  @media (max-width: 870px) {
    .grid {
      grid-template-columns: 1fr;
      grid-template-rows: 40rem 50rem repeat(1, min-content);
      grid-column-gap: 0;
      .overview {
        grid-area: 1/1/2/2;
        padding: 1rem 4rem 2rem;
        grid-column-gap: 6rem;
        .label {
          font-size: 1.4rem;
        }
        .field {
          text-align: center;
          .group {
            margin: 0 auto;
          }
        }
      }
      .donut {
        grid-area: 2/1/3/2;
        .big-donut {
          width: 99%;
          & > div {
            width: 100% !important;
            height: 45rem;
          }
        }
      }
      .table-container {
        grid-area: 3/1/4/2;
      }
    }
  }
  @media (max-width: 580px) {
    .grid {
      grid-template-rows: 45rem 30rem repeat(1, min-content);
    }
    .overview {
      padding: 1rem 1.5rem 2rem;
      grid-column-gap: 2rem;
      .total .value,
      .rank .value,
      .value {
        font-size: 2rem;
      }
      .label {
        font-size: 1.2rem;
      }
      .field {
        text-align: center;
        .group {
          margin: 0 auto;
        }
      }
      .optional-word {
        display: none;
      }
    }
    .donut {
      .big-donut {
        display: none;
      }
      .small-donut {
        display: block;
        & > div {
          width: 100% !important;
          height: 25rem;
          padding-bottom: 1rem;
        }
      }
    }
  }
`;
export default Portfolio;
