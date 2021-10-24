import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { borderRadius } from "@mui/system";

export default function DiscreteSliderMarks({ low, high, price }) {
  let marks;
  let currentMark;
  const createMarks = (low, high, price) => {
    currentMark = parseInt(((price - low) / (high - low)) * 100);
    marks = [
      {
        value: 0,
        label: `$${parseInt(low)}`,
      },
      {
        value: currentMark,
        label: `$${parseInt(price)}`,
      },
      {
        value: 100,
        label: `$${parseInt(high)}`,
      },
    ];

    return marks;
  };
  marks = createMarks(low, high, price);
  return (
    <Box sx={{ width: "100%" }}>
      <Slider
        sx={{
          width: "100%",
          color: "white",
          " &": {
            marginTop: "1.5rem",
          },
          "& .MuiSlider-thumb": {
            color: "var(--clr-green)",
            borderRadius: "0",
            width: "1rem",
            height: "2rem",
            clipPath: "polygon(0% 100% ,50% 55%, 100% 100%)",
          },
          "& .MuiSlider-track": {
            height: "3px",

            color: "white",
            borderRadius: "0",
            opacity: "1",
          },
          "& .MuiSlider-rail": {
            color: "whitesmoke",
            opacity: "0.7",
            borderRadius: "0px",
          },
          "& .MuiSlider-markLabel": {
            color: "whitesmoke",
            fontSize: "1.5rem",
          },

          "& .MuiSlider-markLabel[data-index='1']": {
            color: "var(--clr-white)",
            // color: "var(--clr-green)",
          },
          "& .MuiSlider-markLabel[data-index='0']": {
            top: "-30%",
            // color: "var(--clr-red)",
          },
          "& .MuiSlider-markLabel[data-index='2']": {
            top: "-30%",
            // color: "var(--clr-green)",
          },
          "& .MuiSlider-mark": {
            color: "whitesmoke",
            width: "2px",
            height: "6px",
            borderRadius: "0px",
          },

          "& .MuiSlider-markActive[data-index='1']": {
            color: "whitesmoke",
            width: "1px",
            height: "3px",
            borderRadius: "0px",
          },
        }}
        size='small'
        aria-label='Custom marks'
        defaultValue={currentMark}
        valueLabelDisplay='auto'
        marks={marks}
        disabled
      />
    </Box>
  );
}
