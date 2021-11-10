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
// export const
const user_reducer = (state, action) => {
  if (action.type === GET_USER_DATA) {
    return { ...state, ...action.payload };
  }

  if (action.type === BUY_STOCK) {
    const { symbol, quantity, price } = action.payload;
    const foundStock = state.holdings.find((stock) => stock.symbol === symbol);
    if (foundStock) {
      foundStock.average = parseFloat(
        (
          (foundStock.quantity * foundStock.average + quantity * price) /
          (foundStock.quantity + quantity)
        ).toFixed(2)
      );
      foundStock.quantity += quantity;

      return {
        ...state,
        holdings: state.holdings.map((stock) => {
          if (stock.symbol === symbol) return foundStock;
          return stock;
        }),
        cash: parseFloat((state.cash - quantity * price).toFixed(2)),
      };
    } else {
      return {
        ...state,
        holdings: [...state.holdings, { symbol, quantity, average: price }],
        cash: parseFloat((state.cash - quantity * price).toFixed(2)),
      };
    }
  }

  if (action.type === SELL_STOCK) {
    const { symbol, quantity, price } = action.payload;
    const foundStock = state.holdings.find((stock) => stock.symbol === symbol);
    foundStock.quantity -= quantity;
    if (foundStock.quantity === 0) {
      return {
        ...state,
        holdings: state.holdings.filter((stock) => stock.symbol !== symbol),
        cash: parseFloat((state.cash + quantity * price).toFixed(2)),
      };
    }

    return {
      ...state,
      holdings: state.holdings.map((stock) => {
        if (stock.symbol === symbol) return foundStock;
        return stock;
      }),
      cash: parseFloat((state.cash + quantity * price).toFixed(2)),
    };
  }

  if (action.type === GET_ALL_USERS) {
    return {
      ...state,
      allUsers: action.payload,
    };
  }

  if (action.type === GET_ALL_PRICES) {
    return {
      ...state,
      allPrices: action.payload,
    };
  }
  if (action.type === SET_ACCOUNT_VALUES) {
    return {
      ...state,
      allUsers: state.allUsers.map((user) => {
        return {
          ...user,
          accountValue:
            user.cash +
            user.holdings.reduce((acc, stock) => {
              return (acc =
                acc +
                stock.quantity *
                  state.allPrices.find(
                    (company) => company.symbol === stock.symbol
                  ).price);
            }, 0),
        };
      }),
    };
  }
};
export default user_reducer;
