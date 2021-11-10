import axios from "axios";

export const rapidApiKey = "faa3f13619mshc63ad9bee129027p1b67cejsn3ab2f74d41ee";
export const finhubApiKey = "c5ofrbaad3i9ao07nlbg";
export const urlSymbolLookup = "https://finnhub.io/api/v1/search?q=";
export const urlCompanyProfile =
  "https://finnhub.io/api/v1/stock/profile2?symbol=";

export const mboumApiKey = "2367ce770fmsh40b295039b9491dp16de7ajsn3c24267be87a";
export const urlMboum = "https://mboum-finance.p.rapidapi.com/mo/module/";
export const urlYahoo =
  "https://yh-finance.p.rapidapi.com/market/v2/get-quotes";
export const optionsYahoo = (list) => {
  return {
    params: { region: "US", symbols: list },
    headers: {
      "x-rapidapi-key": rapidApiKey,
      "x-rapidapi-host": "yh-finance.p.rapidapi.com",
    },
  };
};

export const optionsMboum = (symbol) => {
  return {
    params: { symbol, module: "asset-profile,financial-data,earnings" },
    headers: {
      "x-rapidapi-host": "mboum-finance.p.rapidapi.com",
      "x-rapidapi-key": rapidApiKey,
    },
  };
};

export const options = {
  headers: {
    "Content-Type": "application/json",
  },
};
