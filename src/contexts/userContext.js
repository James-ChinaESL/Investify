import React, {
  useContext,
  useEffect,
  useState,
  useReducer,
  useCallback,
} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { options } from "../utils/fetchOptions";
import {
  GET_USER_DATA,
  BUY_STOCK,
  SELL_STOCK,
  ADD_TO_WATCHLILST,
  DELETE_FROM_WATCHLIST,
  SET_ACCOUNT_VALUES,
  GET_ALL_USERS,
  GET_ALL_PRICES,
} from "../utils/actions";

import reducer from "../reducers/user_reducer";
const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
  const initialState = {
    holdings: [],
    watchlist: [],
    cash: 0,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const [needToSend, setNeedToSend] = useState(false);
  const [loading, setLoading] = useState(true);
  const { loginWithRedirect, logout, user: auth0User, error } = useAuth0();

  let server = "http://localhost:5000";
  const getUserData = async () => {
    if (!auth0User) return;
    const mongodbUser = await axios.get(
      `${server}/api/v1/users/${auth0User.email}`,
      options
    );
    dispatch({ type: GET_USER_DATA, payload: mongodbUser.data });
  };

  const sendUserData = async () => {
    axios.patch(`${server}/api/v1/users/${state.email}`, state);
  };

  const getAllUsers = async () => {
    const { data: allUsers } = await axios.get(
      `${server}/api/v1/users/`,
      options
    );
    dispatch({ type: GET_ALL_USERS, payload: allUsers });
  };

  const getPrices = async () => {
    if (!state.allUsers) return;

    const allSymbols = state.allUsers.reduce((acc, user) => {
      if (user.holdings.length === 0) return acc;
      user.holdings.forEach((stock) => {
        if (!acc.includes(stock.symbol)) {
          acc.push(stock.symbol);
        }
      });
      return acc;
    }, []);
    const { data: allPrices } = await axios.patch(
      `${server}/api/v1/prices`,
      allSymbols
    );
    dispatch({ type: GET_ALL_PRICES, payload: allPrices });
    dispatch({ type: SET_ACCOUNT_VALUES });
  };

  const buyStock = (symbol, quantity, price) => {
    dispatch({ type: BUY_STOCK, payload: { symbol, quantity, price } });
    setNeedToSend(true);
  };
  const sellStock = (symbol, quantity, price) => {
    dispatch({ type: SELL_STOCK, payload: { symbol, quantity, price } });
    setNeedToSend(true);
  };

  useEffect(() => {
    if (!needToSend) return;
    sendUserData();
    return () => {
      setNeedToSend(false);
    };
  }, [state]);

  useEffect(() => {
    getUserData();
    getAllUsers();
    getPrices();
    setLoading(false);
  }, [auth0User]);

  return (
    !loading && (
      <UserContext.Provider
        value={{
          ...state,
          loginWithRedirect,
          logout,
          error,
          buyStock,
          sellStock,
          sendUserData,
          getAllUsers,
        }}
      >
        {children}
      </UserContext.Provider>
    )
  );
};
// make sure use
export const useUserContext = () => {
  return useContext(UserContext);
};
