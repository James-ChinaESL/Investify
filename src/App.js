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
import PrivateRoute from "./pages/PrivateRoute";

const App = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      <Router>
        {isAuthenticated && <Navbar />}
        {/* <Navbar /> */}

        <Switch>
          <Route exact path='/'>
            {isAuthenticated ? <Stocks /> : <LandingPage />}
          </Route>
          <PrivateRoute path='/company/:ticker'>
            <SingleStock />
          </PrivateRoute>
          <PrivateRoute path='/portfolio/:name'>
            <Portfolio />
          </PrivateRoute>
          <PrivateRoute path='/watchlist'>
            <Watchlist />
          </PrivateRoute>
          <PrivateRoute path='/allplayers'>
            <AllPlayers />
          </PrivateRoute>
        </Switch>
      </Router>
    </>
  );
};
export default App;
