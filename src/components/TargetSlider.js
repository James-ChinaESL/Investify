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
            height: "2rem",
            clipPath: "polygon(72% 0%,77% 0%,77% 100%,72% 100%)",

            // clipPath: "polygon(0% 100% ,65% 50%, 100% 100%)",
          },
          "& .MuiSlider-track": {
            height: "5px",
            color: "#FF6384",
            borderRadius: "0",
            opacity: "1",
          },
          "& .MuiSlider-rail": {
            height: "5px",
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
              top: "60%",
            },

          "& .MuiSlider-markLabel[data-index='1'] ": {
            color: "whitesmoke",
            top: "-90%",
          },
          "& .MuiSlider-markLabel[data-index='3']": {
            color: "whitesmoke",
            top: "140%",
          },
          "& .MuiSlider-mark": {
            opacity: 1,
            color: "white",
            width: "1rem",
            height: "1rem",
            borderRadius: "1rem",
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
