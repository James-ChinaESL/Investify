import React from "react";

function Row({
  shortName,
  currency,
  fiftyTwoWeekHigh,
  fiftyTwoWeekHighChangePercent,
  fiftyTwoWeekLow,
  fiftyTwoWeekLowChangePercent,
  marketCap,
  regularMarketPrice,
  symbol,
}) {
  return <div className='row'>{shortName}</div>;
}

export default Row;
