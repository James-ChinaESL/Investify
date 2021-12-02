import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Stocks from "./pages/Stocks";
import SingleStock from "./pages/SingleStock";
import Portfolio from "./pages/Portfolio";
import Watchlist from "./pages/Watchlist";
import AllPlayers from "./pages/AllPlayers";
import { useAuth0 } from "@auth0/auth0-react";
import LandingPage from "./pages/LandingPage";

const App = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <>
      <Router>
        {isAuthenticated && <Navbar />}

        <Switch>
          <Route exact path='/'>
            {isAuthenticated ? <Stocks /> : <LandingPage />}
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
          <Route path='/allplayers'>
            <AllPlayers />
          </Route>
        </Switch>
      </Router>
    </>
  );
};
export default App;
