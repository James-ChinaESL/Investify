import {
  BUY_STOCK,
  SELL_STOCK,
  EDIT_WATCHLILST,
  GET_INITIAL_DATA,
  EDIT_NAME,
} from "../utils/actions";
const user_reducer = (state, action) => {
  if (action.type === GET_INITIAL_DATA) {
    return {
      currentUser: {
        _id: action.payload.currentUser._id,
        userName: action.payload.currentUser.userName,
      },
      allPrices: action.payload.allPrices,
      allUsers: action.payload.allUsers.map((user) => {
        return {
          ...user,
          accountValue: parseFloat(
            (
              user.cash +
              user.holdings.reduce((acc, stock) => {
                return (acc =
                  acc +
                  stock.quantity *
                    action.payload.allPrices.find(
                      (company) => company.symbol === stock.symbol
                    ).price);
              }, 0)
            ).toFixed(2)
          ),
        };
      }),
    };
  }

  if (action.type === BUY_STOCK) {
    const { updatedUser, symbol, price } = action.payload;

    return {
      ...state,
      allUsers: state.allUsers.map((user) => {
        if (user._id === state.currentUser._id) {
          return {
            accountValue: user.accountValue,
            ...updatedUser,
          };
        } else {
          return user;
        }
      }),
      allPrices: state.allPrices.find((stock) => stock.symbol === symbol)
        ? state.allPrices.map((stock) => {
            if (stock.symbol === symbol) return { symbol, price };
            return stock;
          })
        : state.allPrices.concat({ symbol, price }),
    };
  }

  if (action.type === SELL_STOCK) {
    const { updatedUser } = action.payload;

    return {
      ...state,
      allUsers: state.allUsers.map((user) => {
        if (user._id === state.currentUser._id) {
          return {
            accountValue: user.accountValue,
            ...updatedUser,
          };
        } else {
          return user;
        }
      }),
    };
  }

  if (action.type === EDIT_NAME) {
    return {
      ...state,
      currentUser: { ...state.currentUser, userName: action.payload },
      allUsers: state.allUsers.map((user) => {
        if (user._id !== state.currentUser._id) {
          return user;
        }
        return { ...user, userName: action.payload };
      }),
    };
  }

  if (action.type === EDIT_WATCHLILST) {
    return {
      ...state,
      allUsers: state.allUsers.map((user) => {
        if (user._id === state.currentUser._id) {
          return {
            ...user,
            watchlist: action.payload,
          };
        }
        return user;
      }),
    };
  }
};
export default user_reducer;
