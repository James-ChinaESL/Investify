import React, { useState } from "react";
import { useUserContext } from "../contexts/userContext";
import { percentNoPlus } from "../utils/formatNumbersForUI";
import { numberWithCurrencySymbol } from "../utils/formatNumbersForUI";
import { HiPlusSm, HiMinusSm } from "react-icons/hi";
import Message from "../components/Message";
import Spinner from "../components/Spinner";
import Button from "@mui/material/Button";

const TradePanel = ({ symbol, currentPrice, currency, myQuantity }) => {
  const { buyStock, sellStock, currentUser, allUsers } = useUserContext();

  const { cash, accountValue } =
    allUsers?.find((user) => user._id === currentUser._id) || {};

  const [quantity, setQuantity] = useState(0);
  const [inProgress, setInProgress] = useState(false);
  const [message, setMessage] = useState({
    active: false,
    status: "",
    content: "",
  });

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

  const currencyChecker = () => {
    if (currency !== "USD") {
      showMessage(
        "warning",
        "Sorry, we support only stocks  traded in US dollar"
      );
    }
    return currency;
  };

  const quantityInputHandler = (e) => {
    if (currencyChecker() !== "USD") return;
    setQuantity(parseInt(e.target.value));
  };
  const quantityFocusHandler = () => {
    if (quantity === 0) setQuantity("");
  };
  const quantityBlurHandler = (e) => {
    if (e.target.value === "") setQuantity(0);
    // setQuantity(0);
  };
  const buyHandler = async () => {
    if (currencyChecker() !== "USD") return;
    if (quantity === 0) {
      showMessage("warning", "Please set quantity of stocks");
      return;
    }
    if (quantity * currentPrice > cash) {
      showMessage("error", "Not enough cash!");
      return;
    }
    setInProgress(true);
    let res;
    try {
      res = await buyStock(symbol, quantity, currentPrice);
    } catch (err) {
      console.log(err);
      return showMessage("error", "Something went wrong!");
    } finally {
      setInProgress(false);
    }

    if (res === "wrong_price") {
      return showMessage(
        "error",
        "The price has significantly changed, refresh the page"
      );
    }

    if (res === "success") {
      showMessage("success", "Successfully bought!");
    } else {
      showMessage("error", "Something went wrong!");
    }
    setQuantity(0);
  };

  const sellHandler = async () => {
    if (myQuantity === 0) {
      return showMessage("error", `You don't have ${symbol} stocks!`);
    }
    if (quantity > myQuantity) {
      return showMessage("error", `You don't have  enough ${symbol} stocks!`);
    }
    if (quantity === 0) {
      return showMessage("warning", "Please set quantity of stocks");
    }
    let res;
    try {
      setInProgress(true);
      res = await sellStock(symbol, quantity, currentPrice);
    } catch (err) {
      console.log(err);
      return showMessage("error", "Something went wrong!");
    } finally {
      setInProgress(false);
    }

    if (res === "success") {
      showMessage("success", "Successfully sold");
    } else {
      showMessage("error", "Something went wrong!");
    }

    setQuantity(0);
  };
  const increase = () => {
    if (currencyChecker() !== "USD") return;
    setQuantity((prev) => prev + 1);
  };
  const decrease = () => {
    if (quantity === 0) return;

    setQuantity((prev) => {
      return prev - 1;
    });
  };

  return (
    <>
      {inProgress ? (
        <div className='progress_modal'>
          <Spinner />
        </div>
      ) : null}
      <Message {...message} />
      <div className='trade card'>
        <h2>Trade</h2>
        <div className='price-amount-container'>
          <div className='price number field'>
            {numberWithCurrencySymbol(currentPrice, currency)}
          </div>

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
        </div>
        <div className='total-percent-wrapper'>
          <div className='total-cost number field'>
            {quantity
              ? numberWithCurrencySymbol(currentPrice * quantity, currency)
              : numberWithCurrencySymbol(0, currency)}
          </div>
          {/* </div> */}

          <p>
            <span className='number'>
              {percentNoPlus(((currentPrice * quantity) / accountValue) * 100)}
            </span>
            &nbsp; of account value
          </p>
        </div>
        <div className='buy_group group'>
          <div className='buy_max max number'>
            max:&nbsp;
            <span className='number'>{parseInt(cash / currentPrice)}</span>
          </div>
          <Button
            onClick={buyHandler}
            size='large'
            variant='contained'
            className=' button btn_buy'
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
            className='button btn_sell'
            color='error'
            onClick={sellHandler}
          >
            Sell
          </Button>
        </div>
      </div>
    </>
  );
};

export default TradePanel;
