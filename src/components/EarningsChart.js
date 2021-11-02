import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import Button from "@mui/material/Button";
// import { defaults } from "react-chartjs-2";

// defaults.global.defaultFontFamily = "Montserrat";
export const EarningsChart = ({ currency, yearly, quarterly }) => {
  currency = currency === "USD" ? "$" : currency;
  const [intervals, setIntervals] = useState(yearly);
  const units = intervals[0].revenue.raw > 10 ** 9 ? "B" : "M";

  const data = {
    labels: intervals.map((period) => period.date),
    datasets: [
      {
        label: `Revenue, ${currency}${units}`,
        data: intervals.map((period) => {
          if (units === "B") {
            return (period.revenue.raw / 10 ** 9).toFixed(2);
          } else {
            return (period.revenue.raw / 10 ** 6).toFixed(2);
          }
        }),
        backgroundColor: "#36A2EB",
        barThickness: "flex",
        stack: "Stack 0",
      },

      {
        label: `Earnings, ${currency}${units}`,
        data: intervals.map((period) => {
          if (units === "B") {
            return (period.earnings.raw / 10 ** 9).toFixed(2);
          } else {
            return (period.earnings.raw / 10 ** 6).toFixed(2);
          }
        }),
        backgroundColor: intervals.map((period) => {
          return period.earnings.raw > 0 ? "#4BC096" : "#FF6384";
        }),
        barThickness: "flex",

        stack: "Stack 1",
      },
    ],
  };
  const options = {
    color: "#fafafa",
    plugins: {
      legend: {
        display: false,
        align: "end",
        labels: {
          font: {
            size: 16,
            family: "Raleway",
          },
        },
      },
    },
    scales: {
      y: {
        display: false,
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
      x: {
        ticks: {
          color: "white",
          font: {
            size: 14,
            family: "Quicksand",
          },
          padding: 0,
        },
        grid: {
          display: false,
        },
        gridLines: {
          zeroLineColor: "white",
          drawBorder: false,
        },
      },
    },
  };
  return (
    <>
      <div
        className='buttons'
        // style={{ position: "relative", top: "2.8rem", left: "1rem" }}
      >
        <h2>Revenue/Earnings</h2>
        <Button
          variant={`${intervals === yearly ? "contained" : "outlined"}`}
          size='small'
          onClick={() => setIntervals(yearly)}
        >
          Yearly
        </Button>
        <Button
          variant={`${intervals === quarterly ? "contained" : "outlined"}`}
          size='small'
          onClick={() => setIntervals(quarterly)}
        >
          Quarterly
        </Button>
      </div>
      <Bar data={data} options={options} />
    </>
  );
};
