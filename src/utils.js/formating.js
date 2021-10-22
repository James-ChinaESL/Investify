export const formatName = (stockInfo) => {
  stockInfo.shortName = stockInfo.shortName
    .slice(0, stockInfo.shortName.indexOf(" "))
    .toLowerCase()
    .replace(/[A-z]/, stockInfo.shortName[0].toUpperCase())
    .replace(",", "");

  switch (stockInfo.symbol) {
    case "AMZN":
      stockInfo.shortName = "Amazon";
      break;

    case "RYDAF":
      stockInfo.shortName = "Shell";
      break;
    case "AMD":
      stockInfo.shortName = "AMD";
      break;
    case "EA":
      stockInfo.shortName = "Electronic Arts";
      break;

    case "DIS":
      stockInfo.shortName = "Walt Disney";
      break;
    case "JNJ":
      stockInfo.shortName = "Johnson & Johnson";
      break;
    case "IBM":
      stockInfo.shortName = "IBM";
      break;
    case "NVID":
      stockInfo.shortName = "NVIDIA";
      break;
    case "HPQ":
      stockInfo.shortName = "HP";
      break;
    case "MDB":
      stockInfo.shortName = " MongoDB";
      break;
    default:
      break;
  }
  return stockInfo.shortName;
};
