import React, { useContext, useState } from "react";
import { popularStocks } from "../utils/fetchOptions";
import { useUserContext } from "../contexts/userContext";

const StocksContext = React.createContext();
export const StocksContextProvider = ({ children }) => {
  //   const { watchlist } = useUserContext();

  const [content, setContent] = useState({
    type: "popularStocks",
    list: popularStocks,
  });
  const [popularStocksData, setPopularStocksData] = useState(null);
  const [watchlistStocksData, setWatchlistStocksData] = useState(null);
  const [dayGainersData, setDayGainersData] = useState(null);
  const [dayLosersData, setDayLosersData] = useState(null);
  const [techGrowthData, setTechGrowthData] = useState(null);
  const [undervaluedGrowthData, setUndervaluedGrowthData] = useState(null);
  const [undervaluedLargeCapData, setUndervaluedLargeCapData] = useState(null);

  const groupsContext = {
    popularStocks: [popularStocksData, setPopularStocksData],
    watchlistStocks: [watchlistStocksData, setWatchlistStocksData],
    dayGainers: [dayGainersData, setDayGainersData],
    dayLosers: [dayLosersData, setDayLosersData],
    techGrowth: [techGrowthData, setTechGrowthData],
    undervaluedGrowth: [undervaluedGrowthData, setUndervaluedGrowthData],
    undervaluedLargeCap: [undervaluedLargeCapData, setUndervaluedLargeCapData],
  };
  return (
    <StocksContext.Provider
      value={{
        content,
        setContent,
        groupsContext,
      }}
    >
      {children}
    </StocksContext.Provider>
  );
};
export const useStocksContext = () => {
  return useContext(StocksContext);
};
