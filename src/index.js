import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { UserProvider } from "./contexts/userContext";
import { CalculationsProvider } from "./contexts/calculationsContext";

ReactDOM.render(
  <Auth0Provider
    domain='dev-5ifb3jpf.us.auth0.com'
    clientId='ymAaYtk0OdROTaRDmWJixAjSOZG5GMZ2'
    redirectUri={window.location.origin}
    cacheLocation='localstorage'
  >
    <UserProvider>
      <CalculationsProvider>
        <App />
      </CalculationsProvider>
    </UserProvider>
  </Auth0Provider>,
  document.getElementById("root")
);
