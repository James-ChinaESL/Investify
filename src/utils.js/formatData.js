const filteredDataItem = {
  shortName: "Apple Inc.",
  regularMarketPrice: 148.69,
  currency: "USD",
  fiftyTwoWeekLow: 107.32,
  fiftyTwoWeekHigh: 157.26,
  fiftyTwoWeekHighChangePercent: -0.054495692,
  fiftyTwoWeekLowChangePercent: 0.3854827,
  symbol: "AAPL",
  marketCap: 2457875513344,
  regularMarketChangePercent: -0.5284943,
};
const testArray = [
  {
    shortName: "Apple Inc.",
    regularMarketPrice: 148.69,
    currency: "USD",
    fiftyTwoWeekLow: 107.32,
    fiftyTwoWeekHigh: 157.26,
    fiftyTwoWeekHighChangePercent: -0.054495692,
    fiftyTwoWeekLowChangePercent: 0.3854827,
    symbol: "AAPL",
    marketCap: 2457875513344,
    regularMarketChangePercent: -0.5284943,
  },
  {
    shortName: "Microsoft Corporation",
    regularMarketPrice: 309.16,
    currency: "USD",
    fiftyTwoWeekLow: 199.62,
    fiftyTwoWeekHigh: 311.09,
    fiftyTwoWeekHighChangePercent: -0.006203969,
    fiftyTwoWeekLowChangePercent: 0.54874265,
    symbol: "MSFT",
    marketCap: 2321142251520,
    regularMarketChangePercent: -0.51486874,
  },
];

export const formatData = (stocks) => {
  return stocks.map((stock) => {
    return {
      ...stock,
      shortName: formatName(stock),
      marketCap: formatMarketCap(stock),
      regularMarketChangePercent: stock.regularMarketChangePercent.toFixed(2),
    };
  });
};

const formatName = (stock) => {
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
    case "EA":
      stockName = "Electronic Arts";
      break;

    case "DIS":
      stockName = "Walt Disney";
      break;
    case "JNJ":
      stockName = "Johnson & Johnson";
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
      stockName = " MongoDB";
      break;
    default:
      break;
  }
  return stockName;
};
const formatMarketCap = (stock) => {
  if (`${stock.marketCap}`.length >= 13) {
    return `${(stock.marketCap / 10 ** 12).toFixed(3)} T`;
  } else {
    return `${(stock.marketCap / 10 ** 9).toFixed(2)} B`;
  }
};
const testFormated = formatData(testArray);
console.log(testFormated);
console.log(testArray);
