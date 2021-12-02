import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TradingViewChart from "../components/TradingViewChart";
import { EarningsChart } from "../components/EarningsChart";
import {
  urlCompanyProfile,
  finhubApiKey,
  urlMboum,
  optionsMboum,
  optionsTradier,
} from "../utils/fetchOptions.js";

import { formatSingleCompany } from "../utils/formatSingleCompany";
import styled from "styled-components";
import Button from "@mui/material/Button";
import TargetSlider from "../components/TargetSlider";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";
import { useUserContext } from "../contexts/userContext";
import {
  usdPlus,
  usdNoPlus,
  percent,
  percentNoPlus,
} from "../utils/formatNumbersForUI";
import { numberWithCurrencySymbol } from "../utils/formatNumbersForUI";
import Spinner from "../components/Spinner";
import TradePanel from "../components/TradePanel";
import { allData } from "../utils/singleStockAllData";
let server = "http://localhost:5000";

const SingleStock = () => {
  let { ticker: tickerFromUrl } = useParams();
  const symbol = tickerFromUrl.toUpperCase();

  const { currentUser, allUsers, addToWatchlist, delFromWatchlist } =
    useUserContext();
  const { holdings, watchlist } =
    allUsers?.find((user) => user._id === currentUser._id) || {};
  const logo = useRef(null);
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!logo.current) return;
    logo.current.onerror = (e) => {
      e.target.src = `${server}/logos/default.png`;
      e.target.onerror = null;
    };
  });
  if (data === null) return <Spinner />;
  const { quantity: myQuantity, average: myAverage } =
    holdings?.length > 0
      ? holdings?.find((stock) => stock.symbol === symbol) || {
          quantity: 0,
          average: 0,
        }
      : { quantity: 0, average: 0 };
  const purchasedValue = myQuantity * myAverage;
  const currentValue = myQuantity * data.currentPrice;

  const returnInDollars = purchasedValue ? currentValue - purchasedValue : 0;

  const returnProcent = (returnInDollars / purchasedValue) * 100 || 0;

  function fetchData() {
    setLoading(true);
    /////////////////
    // const finhubApi = `${urlCompanyProfile}${symbol}&token=${finhubApiKey}`;
    // const mboumApi = `${urlMboum}`;

    // const getFinhubData = axios.get(finhubApi);
    // const getTradierData = axios(
    //   optionsTradier(symbol.replace(/(\.|-)/g, "/"))
    // );
    // const getMboumData = axios.get(mboumApi, optionsMboum(symbol));
    // axios
    //   .all([getFinhubData, getMboumData, getTradierData])
    //   .then(
    //     axios.spread((...allData) => {
    //       if (allData.find((res) => res.status !== 200)) {
    //         throw new Error(`Something went wrong!`);
    //       }
    //       console.log(allData);

    //       setData(formatSingleCompany(allData));
    //       setLoading(false);
    //       // console.log("fetching is over");
    //     })
    //   )
    //   .catch((err) => {
    //     alert(err);
    //     console.log(err);
    //   });
    /////////////////////
    setData(formatSingleCompany(allData));
    setLoading(false);
  }

  const isInWatchList = Boolean(watchlist?.find((stock) => stock === symbol));
  const watchlistHander = () => {
    if (isInWatchList) {
      delFromWatchlist(symbol, watchlist);
      return;
    }
    addToWatchlist(symbol, watchlist);
  };

  return loading ? (
    <Spinner />
  ) : (
    <Wrapper>
      <div className='chart-container'>
        <TradingViewChart ticker={symbol} />
      </div>

      <div className='main_info card'>
        <div className='logo-name-industry'>
          <img
            ref={logo}
            src={`${server}/logos/${symbol}.webp`}
            alt='logo'
            className='logo'
          />
          <div className='name-industry'>
            <h1 className='name'>{data.name}</h1>
            <p className='label'>{data.industry}</p>
          </div>
        </div>
        <div className='country'>
          <div className='info'>{data.country}</div>
          <div className='label'>Country</div>
        </div>
        <div className='cap'>
          <div className='info number'>{data.marketCap}</div>
          <div className='label'>Market Cap</div>
        </div>
        <div className='pe'>
          <div className='info number'>{data.pe}</div>
          <div className='label'>P/E</div>
        </div>
        <Button
          className='watchlist_btn'
          size='large'
          variant='contained'
          startIcon={isInWatchList ? <StarIcon /> : <StarOutlineIcon />}
          onClick={watchlistHander}
        >
          <div className='btn_text'>
            <span>Watchlist</span>
          </div>
        </Button>
      </div>

      <TradePanel
        symbol={symbol}
        currency={data.priceCurrency}
        myQuantity={myQuantity}
        currentPrice={data.currentPrice}
      />
      <div className='holdings card'>
        <h2 className='title'>My Holdings</h2>
        <div className='left field'>Quantity</div>
        <div className='right number field'>{myQuantity}</div>
        <div className='left field'>Average</div>
        <div className='right number field'>{usdNoPlus(myAverage)}</div>
        <div className='left field'>Value</div>
        <div className='right number field'>
          {usdNoPlus(myQuantity * myAverage)}
        </div>
        <div className='left field'>Return, $</div>
        <div
          className={`right number field ${
            returnInDollars > 0
              ? "positive"
              : returnInDollars < 0
              ? "negative"
              : null
          }`}
        >
          {usdPlus(returnInDollars)}
        </div>
        <div className='left field'>Return, %</div>
        <div
          className={`right number field ${
            returnProcent > 0
              ? "positive"
              : returnProcent < 0
              ? "negative"
              : null
          }`}
        >
          {percent(returnProcent)}
        </div>
      </div>
      <div className='ratios card'>
        <h2>Ratios</h2>
        <div className='field left'>P/E</div>
        <div className='field right number'> {data.pe}</div>
        <div className='field left'>EPS</div>
        <div className='field right number'>
          {numberWithCurrencySymbol(data.eps, data.priceCurrency)}
        </div>
        <div className='field left'>ROA</div>
        <div className='field right number'>{percentNoPlus(data.roa)}</div>
        <div className='field left'>ROE</div>
        <div className='field right number'>{percentNoPlus(data.roe)}</div>
        <div className='field left'>D/E</div>

        <div className='field right number'>
          {percentNoPlus(data.debtToEquity)}
        </div>
      </div>
      <article className='description scrollbar card' id='style-8'>
        <p className='description_content force-overflow'>{data.description}</p>
      </article>

      <div className='analytics'>
        <h2>Recommendation</h2>
        <div className='rating-recommendation'>
          <div
            className={`rating number ${data.recommendationKey
              .replace(" ", "")
              .toLowerCase()}`}
          >
            {data.recommendationMean}
          </div>
          <div>
            <div className='recommendation'>{`${data.recommendationKey}`}</div>
            <div className='number_analyses'>
              {`${data.numberOfAnalyses} analyses`}
            </div>
          </div>
        </div>
        <div className='targets'>
          <h2>Price Targets</h2>
          <div className='target_slider'>
            <TargetSlider
              low={data.targetLowPrice}
              high={data.targetHighPrice}
              mean={data.targetMeanPrice}
              price={data.currentPrice}
            ></TargetSlider>
          </div>
        </div>
      </div>

      <div className='earnings'>
        <h2>Revenue/Earnings</h2>

        {/* <EarningsChart
          currency={data.earningsCurrency}
          yearly={data.earningsYearly}
          quarterly={data.earningsQuarterly}
        /> */}
      </div>
    </Wrapper>
  );
};

export default SingleStock;
const Wrapper = styled.main`
  & {
    display: grid;
    grid-template-columns: 40% 20% 10% 10% 20%;
    grid-template-rows: 7rem 1fr 1fr;
    grid-gap: 1rem 2rem;
  }
  .progress_modal {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 1000;
  }
  h2 {
    margin-top: 1rem;
    font-size: 2rem;
    grid-column: 1/3;
    font-weight: bolder;
    letter-spacing: 2px;
  }

  .card {
    background: var(--clr-primary);
    border-radius: 1.5rem;
    box-shadow: 1px 1px 3px black;
    padding: 0.4rem 1rem;
  }
  .number {
    font-family: var(--ff-numbers);
    letter-spacing: 1px;
  }
  .chart-container {
    .chart {
      height: 100%;
    }
    grid-row: 1/3;
  }
  .description {
    margin-top: 2rem;
    height: 28rem;
    overflow-y: scroll;

    .description_content {
      padding: 1.8rem 1rem;
      text-align: justify;
      &::first-letter {
        font-family: "Dancing Script", cursive;
        font-style: italic;
        font-size: 3rem;
        line-height: 0px;
      }
    }
  }
  .scrollbar::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);

    border: 1px solid black;
    border-radius: 10px;
  }

  .scrollbar::-webkit-scrollbar {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);

    width: 10px;
    border-radius: 10px;
  }

  .scrollbar::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: var(--clr-primary);
  }
  .main_info {
    grid-column: 2/6;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: none;

    .label {
      font-size: 1.3rem;
    }
    .country,
    .cap,
    .name-industry,
    .pe {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin: 0.5rem 0 0.3rem;
    }
    .pe-label {
      @media (max-width: 920px) {
        & {
          display: none;
        }
      }
    }

    .logo-name-industry {
      display: flex;

      .logo {
        height: 6rem;
        margin-right: 1rem;
      }
      .name {
        font-size: 2.5rem;
        max-width: 22rem;
      }
    }
    .info {
      font-size: 2rem;
    }

    .watchlist_btn {
      align-self: center;
      font-size: 1.7rem;
      padding: 0.5rem 0.5rem;
      line-height: 1.5rem;
      text-transform: none;
      /* padding: 0.7rem 1rem; */
      .MuiSvgIcon-root {
        font-size: 2.7rem;
      }
      span {
        margin: 0;
      }
      @media (max-width: 1100px) {
        span {
          display: block;
        }
      }
    }
  }

  /* margin-top: 1rem;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        column-gap: 1rem;
        justify-content: space-between;
        text-align: center;
     */
  .field {
    background-color: var(--clr-secondary);
    border-radius: 15px;
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
  }

  .trade {
    grid-column: 2/3;
    padding: 0rem 1rem 1rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 4.7rem 5rem 7rem;
    column-gap: 1rem;

    .amount-container {
      display: flex;
      justify-content: space-around;
      background-color: var(--clr-secondary);
      border-radius: 15px;
      .quantity {
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
        }
        padding: 0;
        color: var(--clr-primary);
        font-size: 2.3rem;
        text-align: center;
        width: 50%;
        border: none;
        border-top-left-radius: 15px;
        border-bottom-left-radius: 15px;
        outline: none;
        /* border: 1px solid var(--clr-blue); */

        font-weight: bold;
      }
      .set-quantity {
        width: 50%;
        display: flex;
        flex-direction: column;
        /* justify-content: space-between; */
        cursor: pointer;
        line-height: 0;
        .increase {
          height: 50%;
          border-bottom: 1px solid var(--fc-disabled);
        }

        .set {
          position: relative;
          top: 0.3rem;
          text-align: center;
          cursor: pointer;
          font-size: 2rem;
          font-weight: bold;
          line-height: 0;
          padding-right: 2px;
        }
      }
    }
    .total_cost {
      margin-top: 2rem;
      grid-column: 1/3;
      letter-spacing: 2px;
      font-weight: bolder;
    }
    /* } */
    p {
      color: var(--fc-disabled);
      font-size: 1.3rem;
      grid-column: 1/3;
    }

    .max {
      margin-top: 1rem;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      color: var(--fc-disabled);
      padding-bottom: 1px;
      position: relative;
      top: 3px;
      z-index: 2;
      span {
        font-size: 1.5rem;
      }
    }
    .group {
      margin-bottom: 0.5rem;
    }
    .buy_max {
      background-color: #1b4905;
    }
    .sell_max {
      background-color: #940e0e;
    }

    .button {
      font-size: 1.5rem;
      width: 100%;
    }
  }
  .holdings {
    grid-column: 3/5;
    font-size: 1rem;
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: repeat(min-content, 6);
    column-gap: 1rem;
    row-gap: 1rem;
    padding: 0 1rem 1.5rem;
    .title {
      /* margin-bottom: -10px; */
    }
    .left {
      justify-content: start;
      font-size: 1.6rem;
    }
    .right {
      /* justify-content: end; */
      font-size: 1.6rem;
      &.positive {
        font-size: 1.7rem;

        color: #afa;
        letter-spacing: 1px;
        text-shadow: var(--text-shadow);
      }
      &.negative {
        font-size: 1.8rem;

        letter-spacing: 1px;
        color: #fa5555;
        text-shadow: var(--text-shadow);
      }
    }
  }
  .ratios {
    grid-column: 5/6;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(1fr, 5);
    column-gap: 1rem;
    row-gap: 1rem;
    padding: 0 1rem 1.5rem;
    .left {
      justify-content: start;
      font-size: 1.6rem;
    }
    .right {
      /* justify-content: end; */
      font-size: 1.6rem;
    }
    li {
      list-style: none;
      text-align: left;
    }
  }
  /* display: grid;
        column-gap: 1rem;
        grid-template-columns: 50% 50%;
        margin-right: 3rem;
        margin-top: 2rem; */
  /* 
        h2 {
          font-size: 2rem;
          font-family: "Raleway";
          font-weight: bolder;
          letter-spacing: 2px;
          margin: 1rem 2rem;
        } */

  .analytics {
    grid-column: 2/4;
    padding: 0rem 3rem;
    .rating-recommendation {
      margin: 2rem 0 0;
      display: flex;
      justify-content: start;
      align-items: center;
      .rating {
        border-radius: 15px;
        padding: 0.7rem 1.5rem;
        font-size: 2.7rem;
        letter-spacing: 2px;
        font-weight: bolder;
        margin: 0 2rem;
        &.strongbuy {
          background-color: #256506;
        }
        &.buy {
          background-color: #348f39;
        }
        &.hold {
          background-color: #f9cf11;
        }
        &.sell {
          background-color: #d32f2f;
        }
      }
      .recommendation {
        letter-spacing: 1px;
        font-weight: bolder;
        font-size: 2.3rem;
        font-family: var(--ff-tertiary);
      }
      .number_analyses {
        font-family: var(--ff-numbers);
      }
    }
    .targets {
      h2 {
        margin: 4rem 2rem 2rem;
      }
      .target_slider {
        margin-left: 1.5rem;
        width: 90%;
      }
    }
  }
  .earnings {
    grid-column: 4/6;
    margin-right: -1rem;
    height: 22rem;
  }
`;
