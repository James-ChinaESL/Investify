import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { v4 as uuidv4 } from "uuid";

export default function DiscreteSliderMarks({ low, high, mean, price }) {
  let marks;
  let meanMark;
  let currentMark;
  const createMarks = (low, high, price, mean) => {
    currentMark = parseInt(((price - low) / (high - low)) * 100);
    meanMark = parseInt(((mean - low) / (high - low)) * 100);
    marks = [
      {
        value: 0,
        label: `Low ${parseInt(low)}`,
      },
      {
        value: meanMark,
        label: `Average ${parseInt(mean)}`,
      },
      {
        value: 100,
        label: `${parseInt(high)} High`,
      },
      {
        value: currentMark,
        label: `Current ${parseInt(price)}`,
      },
    ];
    return marks;
  };
  marks = createMarks(low, high, price, mean);
  return (
    <Box sx={{ width: "100%" }}>
      <Slider
        sx={{
          fontFamily: "Quicksand",
          width: "100%",
          color: "white",
          " &": {
            marginTop: "1.5rem",
          },
          "& .MuiSlider-thumb": {
            position: "relative",
            color: "whitesmoke",

            top: "1.3rem",
            borderRadius: "0",
            width: "1.5rem",
            height: "2rem",
            clipPath: "polygon(57% 0%,62% 0%,62% 80%,57% 80%)",

            // clipPath: "polygon(0% 100% ,65% 50%, 100% 100%)",
          },
          "& .MuiSlider-track": {
            height: "2px",
            color: "whitesmoke",
            borderRadius: "0",
            opacity: "0.7",
          },
          "& .MuiSlider-rail": {
            height: "2px",
            color: "whitesmoke",
            opacity: "0.7",
            borderRadius: "0px",
          },
          "& .MuiSlider-markLabel": {
            color: "whitesmoke",
            fontSize: "1.2rem",
          },
          "& .MuiSlider-markLabel[data-index='0'], .MuiSlider-markLabel[data-index='2']":
            {
              top: "60%",
            },

          "& .MuiSlider-markLabel[data-index='1'] ": {
            top: "-30%",
          },
          "& .MuiSlider-markLabel[data-index='3']": {
            top: "120%",
          },
          "& .MuiSlider-mark": {
            color: "white",
            width: "5px",
            height: "5px",
            borderRadius: "5px",
          },
          "& .MuiSlider-mark[data-index='3']": {
            right: "10px",
          },
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
