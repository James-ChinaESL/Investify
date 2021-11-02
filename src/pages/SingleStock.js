import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import TradingViewChart from "../components/TradingViewChart";
import { GroupedBar, EarningsChart } from "../components/EarningsChart";
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
import { allData } from "../model.js/stock";

const SingleStock = () => {
  const { ticker } = useParams();
  const [data, setData] = useState({});
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(true);
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
        console.log(allData);

        console.log(formatSingleCompany(allData));

        setData(formatSingleCompany(allData));
        setLoading(false);
      })
    );
    ////////////////////////
    // console.log(formatSingleCompany(allData));

    // setData(formatSingleCompany(allData));
    // setLoading(false);
    //////////////////////
  };
  const quantityChangeHandler = (e) => {
    setQuantity(parseInt(e.target.value));
  };
  const quantityFocusHandler = (e) => {
    if (quantity === 0) setQuantity("");
  };
  const quantityBlurHandler = (e) => {
    if (e.target.value === "") setQuantity(0);
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
                  <p className='industry label'>{data.industry}</p>
                </div>
              </div>

              <div className='market_cap-label'>
                <div className='cap number'>{data.marketCap}</div>
                <div className='label'>Market Cap</div>
              </div>
              <div className='pe-label'>
                <div className='pe number'>{data.pe > 0 ? data.pe : "<0"}</div>
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
            <div className='trade-holdings'>
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
                    onChange={quantityChangeHandler}
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
                  <span className='number'>5%&nbsp;</span> of account value
                </p>
                <div className='buy_group group'>
                  <div className='buy_max max number'>
                    max:&nbsp;<span className='number'>137</span>
                  </div>
                  <Button
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
                    max:&nbsp;<span className='number'>0</span>
                  </div>
                  <Button
                    size='large'
                    variant='contained'
                    className='btn btn_sell'
                    color='error'
                  >
                    Sell
                  </Button>
                </div>
              </div>
              <div className='holdings'>
                <h2 className='title'>My Holdings</h2>
                <div className='left field'>Quantity</div>
                <div className='right number field'>12</div>
                <div className='left field'>Average</div>
                <div className='right number field'>$137.81</div>
                <div className='left field'>Value</div>
                <div className='right number field'>$1878.81</div>
                <div className='left field'>Return, $</div>
                <div className='right number field'>$110.80</div>
                <div className='left field'>Return, %</div>
                <div className='right number field'>15%</div>
              </div>
              <div className='details'>
                <h2>Details:</h2>
                <ul>
                  <li>Country: {`${data.country}`}</li>
                  <li>Industry: {`${data.industry}`}</li>
                  <li>Market Cap: {`${data.marketCap} $M`}</li>
                  <li>Return on assets: {`${data.roa.toFixed(0)}%`}</li>
                  <li>Retrun on equity: {`${data.roe.toFixed(0)}%`}</li>
                  <li>Debt to equity: {`${data.debtToEquity?.toFixed(0)}%`}</li>
                </ul>
              </div>
            </div>
            <div className='analytics-earnings'>
              <div className='earnings'>
                <EarningsChart
                  currency={data.earningsCurrency}
                  yearly={data.earningsYearly}
                  quarterly={data.earningsQuarterly}
                />
              </div>
              <div className='analytics'>
                <h2>Analysts 12-Month Price Target</h2>
                <div className='rating-recomendation'>
                  <div className='rating'>{data.recommendationMean}</div>
                  <div className='recommendation'>
                    {`${data.recommendationKey} (${data.numberOfAnalyses} analyses)`}
                  </div>
                </div>
                <TargetSlider
                  low={data.targetLowPrice}
                  high={data.targetHighPrice}
                  mean={data.targetMeanPrice}
                  price={data.currentPrice}
                ></TargetSlider>
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
    column-gap: 2rem;
    .chart,
    .trade,
    .holdings,
    .details,
    .main_info {
      background-color: var(--clr-row);
      border-radius: 1.5rem;
      box-shadow: 1px 1px 3px black;
      padding: 0.4rem 1rem;

      &:hover {
        background-color: var(--clr-row-hover);
      }
    }
    .number {
      font-family: var(--ff-numbers);
    }
    .chart-description {
      .chart {
        min-width: 35rem;
        height: 35rem;
        margin-bottom: 2rem;
      }
      .description {
        margin-top: 3rem;
        height: 30rem;
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
        .market_cap-label,
        .name-industry,
        .pe-label {
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
        .cap,
        .pe {
          font-size: 2.3rem;
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

      .trade-holdings {
        margin-top: 2rem;
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
          grid-template-rows: 4.7rem 4rem 7rem;
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

              flex-direction: column;
              cursor: pointer;
              line-height: 0;
              .increase {
                height: 50%;
                border-bottom: 1px solid var(--fc-disabled);
              }

              .set {
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
          }
        }
        .details {
          li {
            list-style: none;
            text-align: left;
          }
        }
      }
      .analytics-earnings {
        margin-right: 3rem;
        h2 {
          font-size: 2rem;
        }
        margin-top: 2rem;
        display: grid;
        column-gap: 2rem;
        grid-template-columns: 3fr 4fr;
        .earnings {
          width: 30rem;
        }
      }
    }
  }
`;
