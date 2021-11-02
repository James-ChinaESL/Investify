export const filterApiInfo = (res) => {
  return res.data.quoteResponse.result.map((stock) => {
    const filteredStockInfo = {
      shortName: stock.shortName,
      regularMarketPrice: stock.regularMarketPrice,
      fiftyTwoWeekLow: stock.fiftyTwoWeekLow,
      fiftyTwoWeekHigh: stock.fiftyTwoWeekHigh,
      symbol: stock.symbol,
      marketCap: stock.marketCap,
      regularMarketChangePercent: stock.regularMarketChangePercent,
    };

    return filteredStockInfo;
  });
};
