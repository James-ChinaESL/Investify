import React from "react";
import { useFiftyContext } from "../model.js/FiftyContent";
import "./Fifty.scss";
import Row from "../components/Row";

export default function Fifty() {
  const { fiftyStocks } = useFiftyContext();
  console.log(fiftyStocks);

  return (
    <div className='fifty-container'>
      {fiftyStocks.map((company) => {
        return <Row {...company}></Row>;
      })}
    </div>
  );
}
