import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { v4 as uuidv4 } from "uuid";

export default function DiscreteSliderMarks({ low, high, mean, price }) {
  let marks;
  let meanMark;
  let currentMark;
  let createMarks;

  if (isNaN(low + mean + high + price)) {
    return <div className='no_data'>No data to display</div>;
  }
  if (price >= low) {
    createMarks = (price, low, mean, high) => {
      currentMark = parseFloat(((price - low) / (high - low)) * 100);
      meanMark = parseFloat(((mean - low) / (high - low)) * 100);
      marks = [
        {
          value: 0,
          label: `Low ${parseFloat(low.toFixed(1))}`,
        },
        {
          value: meanMark,
          label: `Mean ${parseFloat(mean.toFixed(1))}`,
        },
        {
          value: 100,
          label: `${parseFloat(high.toFixed(1))} High`,
        },
        {
          value: currentMark,
          label: `Current ${parseFloat(price.toFixed(1))}`,
        },
      ];
      return marks;
    };
    marks = createMarks(price, low, mean, high);
    return (
      <Box sx={{ width: "100%" }}>
        <Slider
          sx={{
            fontFamily: "Quicksand",
            width: "100%",
            color: "#ced7df",
            " &": {
              marginTop: "1.5rem",
            },
            "& .MuiSlider-thumb": {
              position: "relative",
              color: "whitesmoke",

              top: "1.3rem",
              borderRadius: "0",
              width: "1.5rem",
              height: "27px",
              clipPath: "polygon(62% 0%,67% 0%,67% 100%,62% 100%)",
            },
            "& .MuiSlider-track": {
              height: "4px",
              color: "#FF6384",
              borderRadius: "0",
              opacity: "1",
            },
            "& .MuiSlider-rail": {
              height: "4px",
              color: "#4BC096",
              opacity: "1",
              borderRadius: "0px",
            },
            "& .MuiSlider-markLabel": {
              fontFamily: "Quicksand",
              color: "#ced7df",
              fontSize: "1.7rem",
            },
            "& .MuiSlider-markLabel[data-index='0'], .MuiSlider-markLabel[data-index='2']":
              {
                top: "23px",
              },

            "& .MuiSlider-markLabel[data-index='1'] ": {
              color: "whitesmoke",
              top: "-10px",
            },
            "& .MuiSlider-markLabel[data-index='3']": {
              color: "whitesmoke",
              top: "45px",
            },
            "& .MuiSlider-mark": {
              opacity: 1,
              color: "white",
              width: "0.7rem",
              height: "0.7rem",
              borderRadius: "0.7rem",
            },
            "& .MuiSlider-mark[data-index='3']": {},
          }}
          size='small'
          aria-label='Custom marks'
          defaultValue={currentMark}
          valueLabelDisplay='auto'
          marks={marks}
          key={uuidv4()}
          disabled
        />
      </Box>
    );
  }
  if (price < low) {
    createMarks = (price, low, mean, high) => {
      currentMark = parseFloat(((low - price) / (high - price)) * 100);

      meanMark = parseFloat(((mean - price) / (high - price)) * 100);

      marks = [
        {
          value: 0,
          label: `Current ${parseFloat(price.toFixed(1))}`,
        },

        {
          value: currentMark,
          label: `Low ${parseFloat(low.toFixed(1))}`,
        },
        {
          value: meanMark,
          label: `Mean ${parseFloat(mean.toFixed(1))}`,
        },
        {
          value: 100,
          label: `${parseFloat(high.toFixed(1))} High`,
        },
      ];
      return marks;
    };
  }
  marks = createMarks(price, low, mean, high);
  return (
    <Box sx={{ width: "100%" }}>
      <Slider
        sx={{
          fontFamily: "Quicksand",
          width: "100%",
          color: "#ced7df",
          " &": {
            marginTop: "1.5rem",
          },
          "& .MuiSlider-thumb": {
            position: "relative",
            color: "whitesmoke",

            top: "1.3rem",
            borderRadius: "0",
            width: "1.5rem",
            height: "27px",
            clipPath: "polygon(62% 0%,67% 0%,67% 100%,62% 100%)",
          },
          "& .MuiSlider-track": {
            height: "4px",
            color: "#ced7df",
            borderRadius: "0",
            opacity: "0.65",
          },
          "& .MuiSlider-rail": {
            height: "4px",
            color: "#4BC096",
            opacity: "1",
            borderRadius: "0px",
          },
          "& .MuiSlider-markLabel": {
            fontFamily: "Quicksand",
            color: "#ced7df",
            fontSize: "1.7rem",
          },
          "& .MuiSlider-markLabel[data-index='0'], .MuiSlider-markLabel[data-index='3']":
            {
              top: "23px",
            },

          "& .MuiSlider-markLabel[data-index='1'] ": {
            color: "#ced7df",
            top: "45px",
          },
          "& .MuiSlider-markLabel[data-index='2']": {
            color: "whitesmoke",
            top: "-10px",
          },
          "& .MuiSlider-mark": {
            opacity: 1,
            color: "white",
            width: "0.7rem",
            height: "0.7rem",
            borderRadius: "0.7rem",
          },
          "& .MuiSlider-mark[data-index='3']": {},
        }}
        size='small'
        aria-label='Custom marks'
        defaultValue={currentMark}
        valueLabelDisplay='auto'
        marks={marks}
        key={uuidv4()}
        disabled
      />
    </Box>
  );
}
