export const filterApiInfo = (res) => {
  return res.data.quoteResponse.result.map((stock) => {
    const filteredStockInfo = {
      shortName: stock.shortName,
      regularMarketPrice: stock.regularMarketPrice,
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

    return filteredStockInfo;
  });
};
