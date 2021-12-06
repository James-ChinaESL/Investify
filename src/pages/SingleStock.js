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
import { server } from "../utils/fetchOptions";

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
    const finhubApi = `${urlCompanyProfile}${symbol}&token=${finhubApiKey}`;
    const mboumApi = `${urlMboum}`;
    const getFinhubData = axios.get(finhubApi);
    const getTradierData = axios(
      optionsTradier(symbol.replace(/(\.|-)/g, "/"))
    );
    const getMboumData = axios.get(mboumApi, optionsMboum(symbol));
    axios
      .all([getFinhubData, getMboumData, getTradierData])
      .then(
        axios.spread((...allData) => {
          if (allData.find((res) => res.status !== 200)) {
            throw new Error(`Something went wrong!`);
          }
          setData(formatSingleCompany(allData));
          setLoading(false);
        })
      )
      .catch((err) => {
        alert(err);
        console.log(err);
      });
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
      <h1 className='name-on-top'>{data.name}</h1>

      <div className='chart-container'>
        <TradingViewChart ticker={symbol} />
      </div>

      <div className='main-info card'>
        <div className='logo-name-industry'>
          <div className='logo-container'>
            <img
              ref={logo}
              src={`${server}/logos/${symbol}.webp`}
              alt='logo'
              className='logo'
            />
          </div>

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
          className='watchlist-btn'
          size='large'
          variant='contained'
          startIcon={isInWatchList ? <StarIcon /> : <StarOutlineIcon />}
          onClick={watchlistHander}
        >
          <div className='btn-text'>
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
        <h2>Description</h2>
        <p className='description_content force-overflow'>{data.description}</p>
      </article>

      <div className='analytics card'>
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

      <div className='earnings card'>
        <h2>Revenue/Earnings</h2>
        <div className='earnings-chart-container'>
          <EarningsChart
            currency={data.earningsCurrency}
            yearly={data.earningsYearly}
            quarterly={data.earningsQuarterly}
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default SingleStock;
const Wrapper = styled.main`
  & {
    padding: 0;
  }
  .name-on-top {
    display: none;
  }
  & {
    display: grid;
    grid-template-columns:
      3.5fr minmax(10rem, 1fr) minmax(10rem, 1fr) minmax(10.5rem, 1fr)
      minmax(10.5rem, 1fr) repeat(2, 1fr);
    grid-template-rows: min-content 30rem 33rem;
    grid-gap: 1.5rem 1.5rem;
    padding: 1rem 3rem 2rem;
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
    font-family: var(--ff-secondary);
    margin-top: 1.3rem;
    font-size: 2rem;
    grid-column: 1/3;
    font-weight: bolder;
    letter-spacing: 2px;
    text-align: center;
  }

  .number {
    font-family: var(--ff-numbers);
    letter-spacing: 1px;
  }
  .chart-container {
    .chart {
      padding: 0 0 0 1rem;

      height: 100%;
    }
    grid-row: 1/3;
  }

  .main-info {
    font-family: var(--ff-secondary);
    padding: 0.8rem 2rem;
    grid-column: 2/8;

    display: flex;
    justify-content: space-between;
    .logo-name-industry {
      h1 {
        margin: 0;
      }
      display: flex;

      .logo {
        height: 5rem;
        margin-right: 1rem;
      }
      .name {
        letter-spacing: 1px;
        font-size: 2.2rem;
        max-width: 22rem;
      }
    }
    .info {
      font-size: 2rem;
    }
    .label {
      font-size: 1.4rem;
      margin-bottom: 0.2rem;
    }
    .country,
    .cap,
    .name-industry,
    .pe {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .watchlist-btn {
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
    }
  }

  .field {
    font-family: var(--ff-secondary);
    background-color: var(--clr-secondary);
    border-radius: 15px;
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    &.number {
      font-family: var(--ff-numbers);
    }
  }
  .trade,
  .holdings,
  .ratios {
    padding: 0rem 1.6rem 1.5rem;
  }
  .trade {
    padding: 0rem 1.2rem 1.5rem;

    grid-column: 2/4;
    display: grid;
    grid-template-columns: 1fr 1fr;
    /* grid-template-rows: 3rem 4rem 6rem 6rem; */
    grid-row-gap: 1rem;

    align-content: space-between;
    column-gap: 1rem;
    .price-amount-container {
      /* height: 6rem; */
      grid-column: 1/3;
      display: grid;
      grid-template-columns: 1fr minmax(35%, 11rem);
      justify-content: space-between;
      grid-column-gap: 1rem;
      .amount-container {
        /* max-width: 12rem; */
        justify-self: end;
        display: flex;
        justify-content: space-around;
        background-color: var(--clr-secondary);
        border-radius: 15px;
        .quantity {
          &::-webkit-inner-spin-button {
            -webkit-appearance: none;
          }
          padding: 0;
          /* height: 3rem; */
          color: var(--clr-primary);
          font-size: 2.3rem;
          text-align: center;
          width: 60%;
          border: none;
          border-top-left-radius: 15px;
          border-bottom-left-radius: 15px;
          outline: none;
          font-weight: bold;
          &:focus {
            outline: 2px solid var(--clr-tertiary);
          }
        }
        .set-quantity {
          width: 40%;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          /* line-height: 0; */
          .increase {
            /* height: 50%; */
            border-bottom: 1px solid var(--fc-disabled);
            text-align: center;
          }
          .decrease {
            text-align: center;
          }

          .set {
            position: relative;
            top: 0.3rem;
            cursor: pointer;
            font-size: 20px;
            font-weight: bold;
            line-height: 0;
            padding-right: 2px;
          }
        }
      }
    }

    .total-percent-wrapper {
      /* height: 4rem; */
      margin-top: 1rem;
      grid-column: 1/3;
      grid-row: 3/4;
      align-self: end;
      .total-cost {
        height: 45px;
        letter-spacing: 2px;
        font-weight: bolder;
      }

      p {
        color: var(--fc-disabled);
        font-size: 1.5rem;
        text-align: center;
      }
    }
    /* } */
    .buy-group,
    .sell-group {
      grid-row: 4/5;
    }
    .group {
      align-self: end;
      .max {
        text-align: center;
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
  .left,
  .right {
    font-size: 1.6rem;
  }
  .left {
    justify-content: start;
  }
  .holdings {
    grid-column: 4/6;
    display: grid;
    grid-template-columns: minmax(9.2rem, 2fr) 1fr;
    grid-template-rows: repeat(min-content, 6);
    column-gap: 1rem;
    row-gap: 1rem;

    .positive {
      color: #afa;
      letter-spacing: 1px;
      text-shadow: var(--text-shadow);
    }
    .negative {
      letter-spacing: 1px;
      color: #fa5555;
      text-shadow: var(--text-shadow);
    }
  }
  .ratios {
    grid-column: 6/8;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(1fr, 5);
    column-gap: 1rem;
    row-gap: 1rem;
  }

  .description {
    overflow-y: scroll;
    grid-row: 3/4;
    padding: 0rem 1rem;

    .description_content {
      padding: 1.8rem 1rem;
      text-align: justify;
      &::first-letter {
        font-family: "Dancing Script", cursive;
        font-style: italic;
        font-size: 3rem;
        line-height: 0px;
      }
      font-size: 1.7rem;
    }
    &.scrollbar::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);

      border: 2px solid var(--fc-disabled);
      border-radius: 10px;
    }

    &.scrollbar::-webkit-scrollbar {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);

      width: 10px;
      border-radius: 10px;
    }

    &.scrollbar::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: var(--fc-disabled);
    }
  }

  .analytics {
    grid-column: 2/5;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0rem 3rem;

    .rating-recommendation {
      display: flex;

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
        letter-spacing: 1.5px;
        font-weight: bolder;
        font-size: 2rem;
        font-family: var(--ff-tertiary);
      }
      .number_analyses {
        font-family: var(--ff-numbers);
      }
    }
    .targets {
      h2 {
        margin: 2rem 2rem 3rem -2.5rem;
      }
      .target_slider {
        margin: 0 0 2.3rem 3rem;
        width: 80%;
      }
    }
  }
  .earnings {
    h2 {
      margin-bottom: 1rem;
    }
    grid-column: 5/8;
    /* margin-right: ; */
    /* height: 30rem; */
    .earnings-chart-container {
      height: 25rem;
    }
  }

  @media (max-width: 1100px) {
    .trade,
    .holdings,
    .ratios {
      padding: 0rem 1rem 1rem;
    }
    .main-info .pe {
      display: none;
    }
  }
  @media (max-width: 930px) {
    .main-info .pe {
      display: flex;
    }
    .left,
    .right {
      font-size: 1.8rem;
    }

    & {
      /* padding: 0 max(2rem, 5vw); */
      padding: 0 4rem;
      @media (max-width: 620px) {
        padding: 0 2rem;
        grid-gap: 1rem 1rem;
      }
      grid-template-columns: 4fr 3fr;

      grid-template-rows: 7rem 30rem 30rem 30rem min-content;
    }
    .card {
      padding: 0.5rem 2rem 1.5rem;
    }
    .trade,
    .holdings,
    .ratios {
      grid-column-gap: 10%;
    }
    .chart-container {
      grid-area: 2/1/3/2;
    }
    .main-info {
      grid-area: 1/1/2/3;
      padding: 0.8rem 2rem;
      @media (max-width: 700px) {
        .pe {
          display: none;
        }
      }
      @media (max-width: 600px) {
        .country {
          display: none;
        }
      }
    }
    .trade {
      grid-area: 2/2/3/3;

      .price-amount-container {
        grid-column-gap: 10%;
      }
    }
    .holdings {
      grid-area: 3/2/4/3;
    }
    .ratios {
      grid-area: 4/2/5/3;
    }
    .analytics {
      padding-bottom: 0;
      grid-area: 3/1/4/2;
      .rating-recommendation {
        /* margin-left: 3rem; */
        align-self: center;
      }

      .targets {
        margin-left: 0rem;
        align-self: center;

        width: 85%;
      }
    }
    .earnings {
      width: 50vw;
      grid-area: 4/1/5/2;
      .earnings-chart-container {
        height: 21.5rem;
      }
    }
    .description {
      p.description_content.force-overflow {
        font-size: 2rem;
      }
      grid-area: 5/1/6/3;
      overflow: visible;
    }
  }

  @media (max-width: 520px) {
    h1.name-on-top {
      display: block;
    }
    & {
      padding: 0 4rem;
      grid-template-columns: 1fr;
      grid-template-rows: min-content;
      grid-row-gap: 1rem;
      @media (max-width: 450px) {
        padding: 0 2rem;
      }
      @media (max-width: 350px) {
        padding: 0 1.5rem;
      }
    }
    .name-on-top {
      grid-row: 1/2;
      text-align: center;
    }
    .main-info {
      grid-row: 2/3;
      grid-column: 1/2;
      .name-industry {
        display: none;
      }
      .pe {
        display: flex;
        @media (max-width: 400px) {
          & {
            display: none;
          }
        }
      }
    }
    .chart-container {
      grid-row: 3/4;
      grid-column: 1/2;
      height: 30rem;
    }

    .trade {
      padding: 0 6rem 2rem;
      @media (max-width: 450px) {
        padding: 0 3rem 2rem;
      }
      grid-row: 4/5;
      grid-column: 1/2;
      height: 30rem;
    }
    .holdings {
      padding: 0 3rem 2rem;
      height: 30rem;

      grid-row: 5/6;
      grid-column: 1/2;
    }
    .ratios {
      padding: 0 3rem 2rem;
      height: 30rem;

      grid-row: 6/7;
      grid-column: 1/2;
    }
    .analytics {
      grid-row: 7/8;
      grid-column: 1/2;
      height: 32rem;
      .rating-recommendation {
        margin-left: 0rem;
        align-self: start;
      }
      .targets {
        margin-left: -2rem;
      }
    }
    .earnings {
      grid-row: 8/9;
      grid-column: 1/2;
      width: 100%;
      .earnings-chart-container {
        margin: 0 auto;
        width: 75vw;
      }
      height: 30rem;
    }
    .description {
      padding: 0 1rem;
      grid-row: 9/10;
      grid-column: 1/2;
    }
  }
  @media (min-width: 930px) {
    .earnings,
    .analytics,
    .description {
      margin-top: 0.5rem;
    }
  }
  @media (min-width: 1440px) {
    & {
      grid-gap: 2rem 2rem;
      padding: 1rem 5vw 3rem;
    }
  }
  @media (min-width: 1720px) {
    & {
      grid-gap: 2rem 2rem;
      padding: 1rem 10rem 3rem;
    }
  }
  @media (min-width: 621px) and (max-width: 1050px) and (max-resolution: 96dpi) {
    .main-info .pe {
      display: flex;
    }
    .left,
    .right {
      font-size: 1.8rem;
    }

    & {
      padding: 0 max(2rem, 5vw);
      @media (max-width: 620px) {
        padding: 0 2rem;
        grid-gap: 1rem 1rem;
      }
      grid-template-columns: 4fr 3fr;

      grid-template-rows: 7rem 30rem 30rem 30rem min-content;
    }
    .card {
      padding: 0.5rem 2rem 1.5rem;
    }
    .trade,
    .holdings,
    .ratios {
      grid-column-gap: 10%;
    }
    .chart-container {
      grid-area: 2/1/3/2;
    }
    .main-info {
      grid-area: 1/1/2/3;
      padding: 0.8rem 2rem;
      @media (max-width: 700px) {
        .pe {
          display: none;
        }
      }
      @media (max-width: 600px) {
        .country {
          display: none;
        }
      }
    }
    .trade {
      grid-area: 2/2/3/3;

      .price-amount-container {
        grid-column-gap: 10%;
      }
    }
    .holdings {
      grid-area: 3/2/4/3;
    }
    .ratios {
      grid-area: 4/2/5/3;
    }
    .analytics {
      padding-bottom: 0;
      grid-area: 3/1/4/2;
      .rating-recommendation {
        /* margin-left: 3rem; */
        align-self: center;
      }

      .targets {
        margin-left: 0rem;
        align-self: center;

        width: 85%;
      }
    }
    .earnings {
      width: 50vw;
      grid-area: 4/1/5/2;
      .earnings-chart-container {
        height: 21.5rem;
      }
    }
    .description {
      p.description_content.force-overflow {
        font-size: 2rem;
      }
      grid-area: 5/1/6/3;
      overflow: visible;
    }
  }
`;
