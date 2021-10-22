import axios from "axios";

const fiftyList =
  "AAPL,MSFT,BKNG, GOOG,AMZN,FB,BRK-A,TSLA,NVDA,V,BABA,JNJ,WMT,MA,NSRGY,DIS,ADBE,PYPL,NFLX,NKE,CSCO,KO,PEP,INTC,RYDAF,SHOP,MCD,TMUS,AMD,SONY,SBUX,IBM,OGZPY,SBRCY,ABNB,UBER,DELL,ZM,TWTR,ADDDF,HMC,SPOT,HPQ,MDB,U,EA,YNDX,CAJ,PINS,SNAP";

export const options = {
  params: { region: "US", symbols: fiftyList },
  headers: {
    "x-rapidapi-key": "faa3f13619mshc63ad9bee129027p1b67cejsn3ab2f74d41ee",
    "x-rapidapi-host": "yh-finance.p.rapidapi.com",
  },
};
