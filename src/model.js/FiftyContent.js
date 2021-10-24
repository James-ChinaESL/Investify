import React, { useState, useContext, useEffect } from "react";
import { options } from "./fetchOptions";
import axios from "axios";
import { formatData } from "../utils.js/formatData";
import { res } from "./responseData";
const FiftyContext = React.createContext();

export const FiftyProvider = ({ children }) => {
  const [fiftyStocks, setFiftyStocks] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  const fetchData = async (options) => {
    setIsloading(true);
    /////////fetching starts
    // const res = await axios.get(
    //   "https://yh-finance.p.rapidapi.com/market/v2/get-quotes",
    //   options
    // );
    // console.log(res);

    /////////fetching ends
    const filteredData = res.data.quoteResponse.result.map((stock) => {
      const stockInfo = {
        shortName: stock.shortName,
        regularMarketPrice: stock.regularMarketPrice,
        currency: stock.currency,
        fiftyTwoWeekLow: stock.fiftyTwoWeekLow,
        fiftyTwoWeekHigh: stock.fiftyTwoWeekHigh,
        fiftyTwoWeekHighChangePercent: stock.fiftyTwoWeekHighChangePercent,
        fiftyTwoWeekLowChangePercent: stock.fiftyTwoWeekLowChangePercent,
        fiftyTwoWeekLowChangePercent: stock.fiftyTwoWeekLowChangePercent,
        symbol: stock.symbol,
        marketCap: stock.marketCap,
        regularMarketChangePercent: stock.regularMarketChangePercent,
        targetPriceMean: stock.targetPriceMean,
      };

      return stockInfo;
    });

    setFiftyStocks(formatData(filteredData));
    setIsloading(false);
  };

  useEffect(() => {
    fetchData(options);
  }, []);
  return (
    <FiftyContext.Provider value={{ fiftyStocks, isLoading }}>
      {children}
    </FiftyContext.Provider>
  );
};
export const useFiftyContext = () => {
  return useContext(FiftyContext);
};
