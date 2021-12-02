export const popularStocks =
  "AAPL,MSFT,BKNG, GOOG,AMZN,FB,BRK-B,TSLA,NVDA,V,BABA,JNJ,WMT,MA,NSRGY,DIS,ADBE,PYPL,NFLX,NKE,CSCO,KO,PEP,INTC,RYDAF,SHOP,MCD,TMUS,AMD,SONY,SBUX,IBM,OGZPY,SBRCY,ABNB,UBER,DELL,ZM,TWTR,ADDDF,HMC,SPOT,HPQ,MDB,U,EA,YNDX,CAJ,PINS,SNAP";

export const popularStocksDescription = "Famous companies we face every day";

export const rapidApiKey = "faa3f13619mshc63ad9bee129027p1b67cejsn3ab2f74d41ee";
const dandeganovRakutenKey =
  "74664d1217mshb02ee77b1a720e6p1151afjsn52900272a7b1";
export const finhubApiKey = "c5ofrbaad3i9ao07nlbg";
export const urlSymbolLookup = "https://finnhub.io/api/v1/search?q=";
export const urlCompanyProfile =
  "https://finnhub.io/api/v1/stock/profile2?symbol=";

export const dmdeganoRakutenKey =
  "2367ce770fmsh40b295039b9491dp16de7ajsn3c24267be87a";
export const urlMboum = "https://mboum-finance.p.rapidapi.com/mo/module/";

export const urlYahoo =
  "https://yh-finance.p.rapidapi.com/market/v2/get-quotes";
export const optionsYahoo = (list) => {
  return {
    params: { region: "US", symbols: list },
    headers: {
      "x-rapidapi-key": dandeganovRakutenKey,
      "x-rapidapi-host": "yh-finance.p.rapidapi.com",
    },
  };
};
export const optionsTradier = (symbolsString) => {
  return {
    method: "GET",
    url: "https://sandbox.tradier.com/v1/markets/quotes",
    params: {
      symbols: symbolsString,
    },
    headers: {
      Authorization: "Bearer W13Ww2MP1RJw8PhJf9NspGc4RD5P",
      Accept: "application/json",
    },
  };
};
export const optionsMboum = (symbol) => {
  return {
    params: { symbol, module: "asset-profile,financial-data,earnings" },
    headers: {
      "x-rapidapi-host": "mboum-finance.p.rapidapi.com",
      "x-rapidapi-key": dmdeganoRakutenKey,
    },
  };
};

export const options = {
  headers: {
    "Content-Type": "application/json",
  },
};
export const urlDayLosers =
  "https://mboum-finance.p.rapidapi.com/co/collections/day_losers";

export const urlTechGrowth =
  "https://mboum-finance.p.rapidapi.com/co/collections/growth_technology_stocks";

export const urlDayGainers =
  "https://mboum-finance.p.rapidapi.com/co/collections/day_gainers";

export const urlUndervaluedLargeCap =
  "https://mboum-finance.p.rapidapi.com/co/collections/undervalued_large_caps";

export const urlUndervaluedGrowth =
  " https://mboum-finance.p.rapidapi.com/co/collections/undervalued_growth_stocks";

export const specilStocksOptions = {
  params: { start: "0" },
  headers: {
    "x-rapidapi-key": rapidApiKey,
    "x-rapidapi-host": "mboum-finance.p.rapidapi.com",
  },
};

export const calendarOptions = {
  method: "GET",
  url: "https://sandbox.tradier.com/v1/markets/calendar?",
  headers: {
    Authorization: "Bearer W13Ww2MP1RJw8PhJf9NspGc4RD5P",
    Accept: "application/json",
  },
};

export const calendarNextMonthOptions = (currentMonth, currentYear) => {
  const nextMonth = currentMonth + 1 < 12 ? currentMonth + 1 : 1;
  const year = nextMonth !== 1 ? currentYear : currentYear + 1;
  return {
    method: "GET",
    url: `https://sandbox.tradier.com/v1/markets/calendar?month=${nextMonth}&year=${year}`,
    headers: {
      Authorization: "Bearer W13Ww2MP1RJw8PhJf9NspGc4RD5P",
      Accept: "application/json",
    },
  };
};

export const clockOptions = {
  method: "GET",
  url: "https://sandbox.tradier.com/v1/markets/clock",
  qs: {
    delayed: "false",
  },
  headers: {
    Authorization: "Bearer W13Ww2MP1RJw8PhJf9NspGc4RD5P",
    Accept: "application/json",
  },
};
