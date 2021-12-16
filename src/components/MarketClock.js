import React, { useState, useEffect } from "react";
import { clockOptions } from "../utils/fetchOptions";
import { getNearestWorkDay } from "../utils/clockUtils";
import axios from "axios";
const MarketClock = React.memo(() => {
  const [status, setStatus] = useState("");
  const [timeTillNextState, setTimeTillNextState] = useState(null);

  const newYorkTime = new Date(
    new Intl.DateTimeFormat([], {
      timeZone: "America/New_York",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }).format(new Date())
  );

  const currentYear = newYorkTime.getFullYear();
  const currentMonth = newYorkTime.getMonth() + 1;
  const currentDay =
    newYorkTime.getDate() >= 10
      ? newYorkTime.getDate()
      : "0" + newYorkTime.getDate();

  const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;

  const currentHours = newYorkTime.getHours();
  const currentTime = `${currentHours}:${newYorkTime.getMinutes()}:${newYorkTime.getSeconds()} `;

  const getClockInfo = async () => {
    const {
      data: { clock },
    } = await axios(clockOptions);

    const state = clock.state;
    let timeTillChange;

    if (state && state !== "closed") {
      timeTillChange =
        Date.parse(`${currentDate} ${clock.next_change}`) -
        Date.parse(`${currentDate} ${currentTime}`);
    }
    if (state === "closed") {
      const nearestWorkDay = await getNearestWorkDay(
        currentYear,
        currentMonth,
        currentDay,
        currentHours
      );

      timeTillChange =
        Date.parse(`${nearestWorkDay} ${clock.next_change}`) -
        Date.parse(`${currentDate} ${currentTime}`);
    }

    setStatus(clock.state);
    setTimeTillNextState(timeTillChange);
  };

  useEffect(() => {
    getClockInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return timeTillNextState ? (
    <div style={{ color: status === "closed" ? "#eab217" : "#afa" }}>
      {`Market status: ${status}`}
      <CountDown status={status} timeTillNextState={timeTillNextState} />
    </div>
  ) : null;
});

const CountDown = ({ status, timeTillNextState }) => {
  const [timeLeft, setTimeLeft] = useState(timeTillNextState);
  const label =
    status === "closed"
      ? "Premaket opens in "
      : status === "premarket"
      ? "Market opens in "
      : status === "open"
      ? "Market closes in "
      : status === "postmarket"
      ? "Postmarket closes in "
      : null;
  const hours = Math.floor(timeLeft / (1000 * 60 * 60)) || "";

  let minutes = Math.floor((timeLeft / 1000 / 60) % 60);
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  useEffect(() => {
    const timer = setTimeout(
      () => setTimeLeft(timeLeft - 60 * 1000),
      60 * 1000
    );
    if (timeLeft < 0) {
      return clearTimeout(timer);
    }
  }, [timeLeft]);

  return (
    timeLeft > 0 && (
      <div>
        {label}
        {(hours && `${hours}h `) + (minutes && `${minutes}m`)}
      </div>
    )
  );
};

export default MarketClock;
