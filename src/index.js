import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { FiftyProvider } from "./model.js/FiftyContent";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <FiftyProvider>
      <App />
    </FiftyProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
