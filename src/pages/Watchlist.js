import React from "react";
import { useUserContext } from "../contexts/userContext";

const Watchlist = () => {
  const { buyStock } = useUserContext();

  return (
    <div>
      <h1>Watchlist</h1>
      <button onClick={buyStock}>buy</button>
    </div>
  );
};

export default Watchlist;
