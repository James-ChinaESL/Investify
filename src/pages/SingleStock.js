import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TradingViewChart from "../components/TradingViewChart";
import { EarningsChart } from "../components/EarningsChart";
import {
  urlCompanyProfile,
  finhubApiKey,
  urlMboum,
  optionsMboum,
} from "../utils/fetchOptions.js";
import { formatSingleCompany } from "../utils/formatSingleCompany";
import styled from "styled-components";
import Button from "@mui/material/Button";
import TargetSlider from "../components/TargetSlider";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { HiPlusSm, HiMinusSm } from "react-icons/hi";
import { useUserContext } from "../contexts/userContext";
import Message from "../components/Message";

const SingleStock = () => {
  const { buyStock, cash, holdings, accountValue, sellStock } =
    useUserContext();

  const { ticker } = useParams();
  const [data, setData] = useState({});
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({
    active: false,
    status: "",
    content: "",
  });

  const { quantity: myQuantity, average: myAverage } =
    holdings.length > 0
      ? holdings.find((stock) => stock.symbol === ticker) || {
          quantity: 0,
          average: 0,
        }
      : { quantity: 0, average: 0 };
  const purchasedValue = parseFloat((myQuantity * myAverage).toFixed(2));

  const currentValue = parseFloat((myQuantity * data.currentPrice).toFixed(2));

  const returnInDollars = purchasedValue
    ? parseFloat((currentValue - purchasedValue).toFixed(2))
    : 0;

  const returnProcent =
    parseFloat(((returnInDollars / purchasedValue) * 100).toFixed(2)) || 0;

  const showMessage = (status, content) => {
    setMessage({
      active: true,
      status,
      content,
    });
    setTimeout(() => {
      setMessage({
        active: false,
        status,
        content,
      });
    }, 2500);
  };

  //   const res = await axios.get(urlYahoo, optionsYahoo(list));
  const fetchData = async () => {
    setLoading(true);
    /////////////////
    const finhubApi = `${urlCompanyProfile}${ticker}&token=${finhubApiKey}`;
    const mboumApi = `${urlMboum}`;
    const getFinhubData = axios.get(finhubApi);

    const getMboumData = axios.get(mboumApi, optionsMboum(ticker));
    axios.all([getFinhubData, getMboumData]).then(
      axios.spread((...allData) => {
        setData(formatSingleCompany(allData));
        setLoading(false);
      })
    );
    /////////////////////////////////////
    // setData(formatSingleCompany(allData));
    // setLoading(false);
    //////////////////////
  };
  const quantityInputHandler = (e) => {
    setQuantity(parseInt(e.target.value));
  };
  const quantityFocusHandler = (e) => {
    if (quantity === 0) setQuantity("");
  };
  const quantityBlurHandler = (e) => {
    if (e.target.value === "") setQuantity(0);
    // setQuantity(0);
  };
  const buyHandler = () => {
    if (quantity === 0) {
      showMessage("warning", "Please set quantity of stocks");
      return;
    }
    if (quantity * data.currentPrice > cash) {
      showMessage("error", "Not enough cash!");
      return;
    }
    buyStock(ticker, quantity, data.currentPrice);
    showMessage("success", "Successfully bought!");
  };
  const sellHandler = () => {
    if (myQuantity === 0) {
      showMessage("error", `You don't have ${ticker} stocks!`);
      return;
    }
    if (quantity > myQuantity) {
      showMessage("error", `You don't have  enough ${ticker} stocks!`);
      return;
    }
    if (quantity === 0) {
      showMessage("warning", "Please set quantity of stocks");
      return;
    }
    sellStock(ticker, quantity, data.currentPrice);
    setQuantity(0);
  };
  const increase = () => {
    setQuantity((prev) => prev + 1);
  };
  const decrease = () => {
    if (quantity === 0) return;

    setQuantity((prev) => {
      return prev - 1;
    });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    !loading && (
      <Wrapper>
        <Message {...message} />
        <div className='main-container'>
          <section className='chart-description'>
            <TradingViewChart ticker={ticker} />
            <article className='description scrollbar' id='style-8'>
              <img
                src={`../../logos/${ticker}.png`}
                className='logo'
                alt='logo'
              />
              <p className='description_content force-overflow'>
                {data.description}
              </p>
            </article>
          </section>
          <section className='main'>
            <div className='main_info'>
              <div className='logo-name-industry'>
                <img
                  src={`../../logos/${ticker}.png`}
                  alt='logo'
                  className='logo'
                />
                <div className='name-industry'>
                  <h1 className='name'>{data.name.slice(0, 14)}</h1>
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
                <div className='info number'>
                  {data.pe > 0 ? data.pe : "<0"}
                </div>
                <div className='label'>P/E</div>
              </div>
              <Button
                className='watchlist_btn'
                size='large'
                variant='contained'
                startIcon={<StarOutlineIcon />}
              >
                <div className='btn_text'>
                  <span>Add to&nbsp;</span>
                  <span>watchlist</span>
                </div>
              </Button>
            </div>
            <div className='trade-holdings-ratios'>
              <div className='trade'>
                <h2>Trade</h2>
                {/* <div className='price-amount'> */}
                <div className='price number field'>{`$${data.currentPrice}`}</div>

                <div className='amount-container'>
                  <input
                    className='quantity number'
                    type='number'
                    min='0'
                    name='quantity'
                    value={quantity}
                    onChange={quantityInputHandler}
                    onFocus={quantityFocusHandler}
                    onBlur={quantityBlurHandler}
                  />
                  <div className='set-quantity'>
                    <div className='increase' onClick={increase}>
                      <HiPlusSm className='set' />
                    </div>
                    <div className='decrease' onClick={decrease}>
                      <HiMinusSm className='set' />
                    </div>
                  </div>
                </div>
                <div className='total_cost number field'>
                  {quantity
                    ? `$${(data.currentPrice * quantity).toFixed(2)}`
                    : "$0"}
                </div>
                {/* </div> */}

                <p>
                  <span className='number'>{`${(
                    ((data.currentPrice * quantity) / accountValue()) *
                    100
                  ).toFixed(2)}% `}</span>{" "}
                  of account value
                </p>
                <div className='buy_group group'>
                  <div className='buy_max max number'>
                    max:&nbsp;
                    <span className='number'>
                      {parseInt(cash / data.currentPrice)}
                    </span>
                  </div>
                  <Button
                    onClick={buyHandler}
                    size='large'
                    variant='contained'
                    className=' btn btn_buy'
                    color='success'
                  >
                    Buy
                  </Button>
                </div>

                <div className='sell_group group'>
                  <div className='sell_max max number'>
                    max:&nbsp;
                    <span className='number'>{myQuantity}</span>
                  </div>
                  <Button
                    size='large'
                    variant='contained'
                    className='btn btn_sell'
                    color='error'
                    onClick={sellHandler}
                  >
                    Sell
                  </Button>
                </div>
              </div>
              <div className='holdings'>
                <h2 className='title'>My Holdings</h2>
                <div className='left field'>Quantity</div>
                <div className='right number field'>{myQuantity}</div>
                <div className='left field'>Average</div>
                <div className='right number field'>${myAverage}</div>
                <div className='left field'>Value</div>
                <div className='right number field'>
                  ${(myQuantity * myAverage).toFixed(2)}
                </div>
                <div className='left field'>Return, $</div>
                <divf
                  className={`right number field ${
                    returnInDollars > 0
                      ? "positive"
                      : returnInDollars < 0
                      ? "negative"
                      : null
                  }`}
                >
                  {returnInDollars > 0
                    ? `+${returnInDollars}`
                    : returnInDollars}
                  $
                </divf>
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
                  {returnProcent > 0 ? `+${returnProcent}` : returnProcent}%
                </div>
              </div>
              <div className='ratios'>
                <h2>Ratios</h2>
                <div className='field left'>P/E</div>
                <div className='field right number'> {`${data.pe}`}</div>
                <div className='field left'>EPS</div>
                <div className='field right number'> {`$${data.eps}`}</div>
                <div className='field left'>ROA</div>
                <div className='field right number'>{`${data.roa.toFixed(
                  0
                )}%`}</div>
                <div className='field left'>ROE</div>
                <div className='field right number'>{`${data.roe.toFixed(
                  0
                )}%`}</div>
                <div className='field left'>D/E</div>

                <div className='field right number'>
                  {`${data.debtToEquity?.toFixed(0)}%`}
                </div>
              </div>
            </div>
            <div className='analytics-earnings'>
              <div className='analytics'>
                <h2>Recommendation</h2>
                <div className='rating-recommendation'>
                  <div className='rating number'>{data.recommendationMean}</div>
                  <div>
                    <div className='recommendation'>
                      {`${data.recommendationKey}`}
                    </div>
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

                <EarningsChart
                  currency={data.earningsCurrency}
                  yearly={data.earningsYearly}
                  quarterly={data.earningsQuarterly}
                />
              </div>
            </div>
          </section>
        </div>
      </Wrapper>
    )
  );
};

export default SingleStock;
const Wrapper = styled.main`
  .main-container {
    margin: 2rem;
    display: grid;
    grid-template-columns: 3fr 5fr;
    column-gap: 1rem;
    .chart,
    .trade,
    .holdings,
    .ratios,
    .main_info {
      background: var(--card-gradient);
      border-radius: 1.5rem;
      box-shadow: 1px 1px 3px black;
      padding: 0.4rem 1rem;
    }
    .number {
      font-family: var(--ff-numbers);
      letter-spacing: 1px;
    }
    .chart-description {
      .chart {
        min-width: 32rem;
        height: 34.6rem;
        margin-bottom: 2rem;
      }
      .description {
        margin-top: 2rem;
        height: 28rem;
        overflow-y: scroll;

        .logo {
          float: left;
          margin-right: 2rem;
          shape-outside: circle(50% at 50% 50%);
        }
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
        background-color: var(--clr-row);
      }
    }
    .main {
      .main_info {
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

      .trade-holdings-ratios {
        margin-top: 1rem;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        column-gap: 1rem;
        justify-content: space-between;
        text-align: center;
        h2 {
          margin-top: 1rem;
          font-size: 2rem;
          grid-column: 1/3;
          font-weight: bolder;
          letter-spacing: 2px;
        }
        .field {
          background-color: var(--clr-field);
          border-radius: 15px;
          padding: 0.5rem 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
        }

        .trade {
          padding: 0rem 1rem 1rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 4.7rem 5rem 7rem;
          column-gap: 1rem;

          .price {
            /* width: 12rem; */
          }
          .amount-container {
            display: flex;
            justify-content: space-around;
            background-color: var(--clr-field);
            border-radius: 15px;
            .quantity {
              &::-webkit-inner-spin-button {
                -webkit-appearance: none;
              }
              padding: 0;
              color: var(--clr-row);
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

          .btn {
            font-size: 1.5rem;
            width: 100%;
          }
        }
        .holdings {
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
      }
      .analytics-earnings {
        display: grid;
        column-gap: 1rem;
        grid-template-columns: 50% 50%;
        margin-right: 3rem;
        margin-top: 2rem;

        h2 {
          font-size: 2rem;
          font-family: "Raleway";
          font-weight: bolder;
          letter-spacing: 2px;
          margin: 1rem 2rem;
        }

        .analytics {
          padding: 0rem 3rem;
          .rating-recommendation {
            margin: 2rem 0 0;
            display: flex;
            justify-content: start;
            align-items: center;
            .rating {
              background-color: green;
              border-radius: 15px;
              padding: 1rem 2rem;
              font-size: 2.3rem;
              letter-spacing: 2px;
              font-weight: bolder;
              margin: 0 2rem;
            }
            .recommendation {
              letter-spacing: 1px;
              font-weight: bolder;
              font-size: 2.3rem;
              font-family: var(--ff-tertiary);
              text-decoration: underline;
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
          margin-right: -1rem;
          height: 22rem;
        }
      }
    }
  }
`;
