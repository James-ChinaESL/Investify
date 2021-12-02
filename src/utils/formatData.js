export const formatDataList = (res) => {
  return res.data.quoteResponse.result.map((stock) => {
    return {
      symbol: stock.symbol,
      regularMarketPrice: stock.regularMarketPrice,
      fiftyTwoWeekHigh: stock.fiftyTwoWeekHigh,
      fiftyTwoWeekLow: stock.fiftyTwoWeekLow,
      shortName: formatName(stock),
      marketCap: formatMarketCap(stock),
      marketCaptoSort: stock.marketCap,
      regularMarketChangePercent: stock?.regularMarketChangePercent?.toFixed(2),
      priceRelativeToYear: priceRelativeToYear(stock),
    };
  });
};

export const formatDataDayMovers = (res) => {
  return res.data.quotes.map((stock) => {
    return {
      // ...stock,
      symbol: stock.symbol,
      regularMarketPrice: stock.regularMarketPrice,
      fiftyTwoWeekHigh: stock.fiftyTwoWeekHigh,
      fiftyTwoWeekLow: stock.fiftyTwoWeekLow,
      shortName: formatName(stock),
      marketCap: formatMarketCap(stock),
      marketCaptoSort: stock.marketCap,
      regularMarketChangePercent: stock?.regularMarketChangePercent?.toFixed(2),
      priceRelativeToYear: priceRelativeToYear(stock),
    };
  });
};

const formatName = (stock) => {
  if (!stock.shortName) {
    return;
  }
  let stockName = stock.shortName
    .slice(0, stock.shortName.indexOf(" "))
    .toLowerCase()
    .replace(/[A-z]/, stock.shortName[0].toUpperCase())
    .replace(",", "");

  switch (stock.symbol) {
    case "AMZN":
      stockName = "Amazon";
      break;

    case "RYDAF":
      stockName = "Shell";
      break;
    case "AMD":
      stockName = "AMD";
      break;

    case "DIS":
      stockName = "Disney";
      break;
    case "JNJ":
      stockName = "Johnson";
      break;
    case "IBM":
      stockName = "IBM";
      break;
    case "NVID":
      stockName = "NVIDIA";
      break;
    case "HPQ":
      stockName = "HP";
      break;
    case "MDB":
      stockName = "MongoDB";
      break;

    case "EA":
      stockName = "EA";
      break;
    default:
      break;
  }
  return stockName;
};
const formatMarketCap = (stock) => {
  if (!stock.marketCap) return;
  if (`${stock.marketCap}`.length >= 13) {
    return `${(stock.marketCap / 10 ** 12).toFixed(3)} T`;
  } else {
    return `${(stock.marketCap / 10 ** 9).toFixed(2)} B`;
  }
};

const priceRelativeToYear = (stock) => {
  return (
    (stock?.regularMarketPrice - stock?.fiftyTwoWeekLow) /
      (stock?.fiftyTwoWeekHigh - stock?.regularMarketPrice) || null
  );
};
