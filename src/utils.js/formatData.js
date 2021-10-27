export const formatStockData = (stocks) => {
  return stocks.map((stock) => {
    return {
      ...stock,
      shortName: formatName(stock),
      marketCap: formatMarketCap(stock),
      marketCaptoSort: stock.marketCap,
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
    case "JNJ":
      stockName = "Johnson";
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
  if (`${stock.marketCap}`.length >= 13) {
    return `${(stock.marketCap / 10 ** 12).toFixed(3)} T`;
  } else {
    return `${(stock.marketCap / 10 ** 9).toFixed(2)} B`;
  }
};
