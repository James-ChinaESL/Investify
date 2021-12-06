import React, { useContext, useEffect, useReducer } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import {
  BUY_STOCK,
  SELL_STOCK,
  EDIT_WATCHLILST,
  GET_INITIAL_DATA,
  EDIT_NAME,
} from "../utils/actions";
import { optionsTradier } from "../utils/fetchOptions";
import reducer from "../reducers/user_reducer";
import { server } from "../utils/fetchOptions";

const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
  const initialState = {
    currentUser: { userName: "", _id: "" },
    allUsers: [],
    allPrices: [],
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user: auth0User } = useAuth0();

  const getInitialData = async () => {
    if (!auth0User) return;
    let allUsers;
    try {
      const res = await axios.get(`${server}/api/v1/users/`);
      allUsers = res.data;
    } catch (err) {
      console.log(err);
    }

    const allSymbolsString = allUsers
      .reduce((acc, user) => {
        if (user.holdings.length === 0) return acc;
        user.holdings.forEach((stock) => {
          if (!acc.includes(stock.symbol)) {
            acc.push(stock.symbol);
          }
        });
        return acc;
      }, [])
      .join(",");
    let allPrices;

    if (allSymbolsString.length === 0) {
      allPrices = [];
    } else {
      try {
        const allPricesRes = await axios(
          optionsTradier(allSymbolsString.replace(/(\.|-)/g, "/"))
        );

        if (Array.isArray(allPricesRes.data.quotes.quote)) {
          allPrices = allPricesRes.data.quotes.quote.map((stock) => {
            return {
              symbol: stock.symbol.replace("/", "-"),
              price: stock.ask,
              prevClose: stock.prevclose,
            };
          });
        } else {
          allPrices = [
            {
              symbol: allPricesRes.data.quotes.quote.symbol.replace("/", "-"),
              price: allPricesRes.data.quotes.quote.ask,
              prevClose: allPricesRes.data.quotes.quote.prevclose,
            },
          ];
        }
      } catch (err) {
        console.log(err);
      }
    }

    const currentUser = allUsers.find((user) => user.email === auth0User.email);

    dispatch({
      type: GET_INITIAL_DATA,
      payload: { allUsers, allPrices, currentUser },
    });
  };

  const buyStock = async (symbol, quantity, price) => {
    let res;
    try {
      res = await axios.patch(
        `${server}/api/v1/users/buy/${state.currentUser._id}`,
        {
          symbol,
          quantity,
          price,
        }
      );
    } catch (err) {
      console.log(err);
    }

    if (res.data === "wrong_price") return "wrong_price";

    const updatedUser = res.data;

    if (!updatedUser) {
      return null;
    }
    dispatch({ type: BUY_STOCK, payload: { updatedUser, symbol, price } });
    return "success";
  };

  const sellStock = async (symbol, quantity, price) => {
    let res;
    try {
      res = await axios.patch(
        `${server}/api/v1/users/sell/${state.currentUser._id}`,
        {
          symbol,
          quantity,
          price,
        }
      );
    } catch (err) {
      console.log(err);
    }
    if (res.data === "wrong_price") return "wrong_price";

    const updatedUser = res.data;

    if (!updatedUser) {
      return null;
    }

    dispatch({ type: SELL_STOCK, payload: { updatedUser } });
    return "success";
  };

  const editName = async (newName) => {
    let res;
    try {
      res = await axios.patch(
        `${server}/api/v1/users/editname/${state.currentUser._id}`,
        {
          newName,
        }
      );
    } catch (err) {
      res = null;
    }

    if (res) {
      dispatch({ type: EDIT_NAME, payload: newName });
      return true;
    } else {
      return false;
    }
  };

  const addToWatchlist = (symbol, watchlist) => {
    dispatch({ type: EDIT_WATCHLILST, payload: watchlist.concat(symbol) });
    axios.patch(
      `${server}/api/v1/users/editwatchlist/${state.currentUser._id}`,
      { symbol }
    );
  };

  const delFromWatchlist = (symbol, watchlist) => {
    dispatch({
      type: EDIT_WATCHLILST,
      payload: watchlist.filter((ticker) => ticker !== symbol),
    });
    axios.patch(
      `${server}/api/v1/users/editwatchlist/${state.currentUser._id}`,
      { symbol }
    );
  };

  useEffect(() => {
    getInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth0User]);

  return (
    <UserContext.Provider
      value={{
        ...state,
        buyStock,
        sellStock,
        editName,
        addToWatchlist,
        delFromWatchlist,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export const useUserContext = () => {
  return useContext(UserContext);
};
