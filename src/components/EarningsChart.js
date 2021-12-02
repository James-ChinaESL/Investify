import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import Button from "@mui/material/Button";
import styled from "styled-components";

export const EarningsChart = ({ currency, yearly, quarterly }) => {
  const [intervals, setIntervals] = useState(yearly);

  if (!(currency && yearly && quarterly)) {
    return (
      <Wrapper>
        <div className='no_data'>No data to display</div>
      </Wrapper>
    );
  }

  currency = currency === "USD" ? "$" : currency;
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
    maintainAspectRatio: false,
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
      <div className='buttons' style={{ position: "relative", left: "2rem" }}>
        <Button
          variant={`${intervals === yearly ? "contained" : "outlined"}`}
          size='small'
          onClick={() => setIntervals(yearly)}
          sx={{
            marginRight: "0.5rem",
          }}
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
const Wrapper = styled.div`
  & {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
    font-size: 2rem;
  }
  .buttons {
    button:first-of-type {
      margin-right: 0.5rem;
    }
  }
  .no_data {
    margin-left: 5rem;
  }
`;
