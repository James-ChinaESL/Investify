// export const server = process.env.REACT_APP_BACKEND_URL;
export const server = "https://investify-mern.herokuapp.com";

export const popularStocks =
  "AAPL,MSFT,BKNG, GOOG,AMZN,FB,BRK-B,TSLA,NVDA,V,BABA,JNJ,WMT,MA,NSRGY,DIS,ADBE,PYPL,NFLX,NKE,CSCO,KO,PEP,INTC,RYDAF,SHOP,MCD,TMUS,AMD,SONY,SBUX,IBM,OGZPY,SBRCY,ABNB,UBER,DELL,ZM,TWTR,ADDDF,HMC,SPOT,HPQ,MDB,U,EA,YNDX,CAJ,PINS,SNAP";

export const popularStocksDescription = "Famous companies we face every day";

// const rakutenApiKey = process.env.REACT_APP_RAKUTENAPIKEY;
const rakutenApiKey = "35cc738db3msh25f443125aaf5dbp1ebccfjsn179ace9139a5";

export const finhubApiKey = process.env.REACT_APP_FINHUBAPIKEY;
const tradiersKey = process.env.REACT_APP_TRADIERSKEY;

export const urlSymbolLookup = "https://finnhub.io/api/v1/search?q=";
export const urlCompanyProfile =
  "https://finnhub.io/api/v1/stock/profile2?symbol=";

export const urlMboum = "https://mboum-finance.p.rapidapi.com/mo/module/";

export const urlYahoo =
  "https://yh-finance.p.rapidapi.com/market/v2/get-quotes";
export const optionsYahoo = (list) => {
  return {
    params: { region: "US", symbols: list },
    headers: {
      "x-rapidapi-key": rakutenApiKey,
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
      Authorization: `Bearer ${tradiersKey}`,
      Accept: "application/json",
    },
  };
};
export const optionsMboum = (symbol) => {
  return {
    params: { symbol, module: "asset-profile,financial-data,earnings" },
    headers: {
      "x-rapidapi-host": "mboum-finance.p.rapidapi.com",
      "x-rapidapi-key": rakutenApiKey,
    },
  };
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

export const specialStocksOptions = {
  params: { start: "0" },
  headers: {
    "x-rapidapi-key": rakutenApiKey,
    "x-rapidapi-host": "mboum-finance.p.rapidapi.com",
  },
};

export const calendarOptions = {
  method: "GET",
  url: "https://sandbox.tradier.com/v1/markets/calendar?",
  headers: {
    Authorization: `Bearer ${tradiersKey}`,
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
      Authorization: `Bearer ${tradiersKey}`,
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
    Authorization: `Bearer ${tradiersKey}`,
    Accept: "application/json",
  },
};
