import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Table from "./components/Table";
import Navbar from "./components/Navbar";
import SearchStocks from "./components/SearchStocks";
import SingleStock from "./pages/SingleStock";
import HomePage from "./pages/HomePage";
import Portfolio from "./pages/Portfolio";
import Watchlist from "./pages/Watchlist";
import { useUserContext } from "./contexts/userContext";

const list =
  "AAPL,MSFT,BKNG, GOOG,AMZN,FB,BRK-B,TSLA,NVDA,V,BABA,JNJ,WMT,MA,NSRGY,DIS,ADBE,PYPL,NFLX,NKE,CSCO,KO,PEP,INTC,RYDAF,SHOP,MCD,TMUS,AMD,SONY,SBUX,IBM,OGZPY,SBRCY,ABNB,UBER,DELL,ZM,TWTR,ADDDF,HMC,SPOT,HPQ,MDB,U,EA,YNDX,CAJ,PINS,SNAP";

export default function App(props) {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/'>
          <HomePage />
        </Route>
        <Route path='/stocks'>
          <SearchStocks />
          <Table list={list} />
        </Route>
        <Route path='/company/:ticker'>
          <SingleStock />
        </Route>

        <Route path='/portfolio/:name'>
          <Portfolio />
        </Route>
        <Route path='/watchlist'>
          <Watchlist />
        </Route>
      </Switch>
    </Router>
  );
}
