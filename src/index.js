import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { UserProvider } from "./contexts/userContext";

ReactDOM.render(
  <Auth0Provider
    domain='dev-5ifb3jpf.us.auth0.com'
    clientId='ymAaYtk0OdROTaRDmWJixAjSOZG5GMZ2'
    redirectUri={window.location.origin}
    // cacheLocation='localstorage'
  >
    <UserProvider>
      <App />
    </UserProvider>
  </Auth0Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
