import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { withTheme } from "styled-components";
// import { defaults } from "react-chartjs-2";

// defaults.global.defaultFontFamily = "Montserrat";
export const EarningsChart = ({ currency, yearly, quarterly }) => {
  currency = currency === "USD" ? "$" : currency;
  const [intervals, setIntervals] = useState(yearly);
  const units = intervals[0].revenue.raw > 10 ** 9 ? "B" : "M";

  const data = {
    labels: intervals.map((year) => year.date),
    datasets: [
      {
        label: `Revenue, ${currency}${units}`,
        data: intervals.map((year) => {
          if (units === "B") {
            return (year.revenue.raw / 10 ** 9).toFixed(2);
          } else {
            return (year.revenue.raw / 10 ** 6).toFixed(2);
          }
        }),
        backgroundColor: "rgb(75, 192, 192)",
        stack: "Stack 0",
      },

      {
        label: `Earnings, ${currency}${units}`,
        data: intervals.map((year) => {
          if (units === "B") {
            return (year.earnings.raw / 10 ** 9).toFixed(2);
          } else {
            return (year.earnings.raw / 10 ** 6).toFixed(2);
          }
        }),
        backgroundColor: "rgb(255, 99, 132)",
        stack: "Stack 1",
      },
    ],
  };
  const options = {
    color: "#fafafa",
    plugins: {
      legend: {
        labels: {
          font: {
            size: 18,
            family: "Quicksand",
          },
        },
      },
    },

    scales: {
      y: {
        ticks: {
          color: "transparent",
          font: {
            size: 1,
          },
        },
      },
      x: {
        ticks: {
          beginAtZero: true,
          color: "white",
          font: {
            size: 18,
            family: "Quicksand",
          },
        },
      },
    },
  };
  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

// export const GroupedBar = () => (
//   <>
//   </>
// );
