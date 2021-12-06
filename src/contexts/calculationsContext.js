import React, { useContext } from "react";
import { useUserContext } from "../contexts/userContext";

const CalculationsContext = React.createContext();
export const CalculationsProvider = ({ children }) => {
  const { allPrices } = useUserContext();

  const currentPrice = (stock) => {
    return (
      allPrices.find((company) => company.symbol === stock.symbol).price ||
      allPrices.find((company) => company.symbol === stock.symbol).prevClose
    );
  };

  const stockDayChangeUSD = (stock) => {
    // company.prevClose
    const company = allPrices.find(
      (company) => company.symbol === stock.symbol
    );

    return currentPrice(company) - company.prevClose;
  };

  const userStockDayChangeUSD = (user, stock) => {
    const purchaseDates = user.holdings.find(
      (company) => company.symbol === stock.symbol
    )?.purchaseDates;

    if (!purchaseDates || purchaseDates.length === 0) {
      return;
    }

    const boughtTodayQuantity = purchaseDates.reduce((acc, purchase) => {
      if (Date.now() - purchase.timestamp < 16 * 60 * 60 * 1000) {
        return (acc += purchase.quantity);
      } else {
        return acc;
      }
    }, 0);

    const boughtTodayAverage =
      purchaseDates.reduce((acc, purchase) => {
        if (Date.now() - purchase.timestamp < 16 * 60 * 60 * 1000) {
          return (acc += purchase.quantity * purchase.price);
        } else {
          return acc;
        }
      }, 0) / boughtTodayQuantity;

    if (boughtTodayQuantity >= stock.quantity) {
      return (
        currentPrice(stock) * stock.quantity -
        boughtTodayAverage * stock.quantity
      );
    }

    if (boughtTodayQuantity < stock.quantity) {
      const returnFromTodayBuyings =
        currentPrice(stock) * boughtTodayQuantity -
          boughtTodayAverage * boughtTodayQuantity || 0;

      const returnFromOldBuyings =
        (stock.quantity - boughtTodayQuantity) * stockDayChangeUSD(stock);

      return returnFromTodayBuyings + returnFromOldBuyings;
    }
  };

  const userStockDayChangePercent = (user, stock) => {
    return (
      (userStockDayChangeUSD(user, stock) / (stock.average * stock.quantity)) *
      100
    );
  };

  const todayTotalChangeUSD = (user) => {
    return user?.holdings?.reduce((acc, stock) => {
      return (acc += userStockDayChangeUSD(user, stock));
    }, 0);
  };
  const todayTotalChangePercent = (user) => {
    return 100 / (user.accountValue / todayTotalChangeUSD(user) - 1);
  };
  const investSince = (user) => {
    return new Intl.DateTimeFormat("us-US", {
      year: "numeric",
      month: "short",
    }).format(user.regTimestamp);
  };
  return (
    <CalculationsContext.Provider
      value={{
        currentPrice,
        userStockDayChangePercent,
        userStockDayChangeUSD,
        todayTotalChangeUSD,
        todayTotalChangePercent,
        investSince,
      }}
    >
      {children}
    </CalculationsContext.Provider>
  );
};
export const useCalculationsContext = () => {
  return useContext(CalculationsContext);
};
