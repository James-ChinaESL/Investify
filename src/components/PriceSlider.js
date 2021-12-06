import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { v4 as uuidv4 } from "uuid";

export default function DiscreteSliderMarks({ low, high, price }) {
  if (isNaN(low + price + high)) {
    return <div>no data to display</div>;
  }
  let marks;
  let currentMark;
  const createMarks = (low, high, price) => {
    currentMark = ((price - low) / (high - low)) * 100;
    marks = [
      {
        value: 0,
        label: `$${low.toFixed(1)}`,
      },
      {
        value: currentMark,
        label: `$${price.toFixed(1)}`,
      },
      {
        value: 100,
        label: `$${high.toFixed(1)}`,
      },
    ];

    return marks;
  };
  marks = createMarks(low, high, price);
  return (
    <Box sx={{ width: "100%" }} key={uuidv4()}>
      <Slider
        sx={{
          width: "100%",
          color: "whitesmoke",
          " &": {
            marginTop: "1.5rem",
          },
          "& .MuiSlider-thumb": {
            color: "#afa",
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
            color: "#fafafa",
            top: "42px",
            lineHeight: 0,
          },
          "& .MuiSlider-markLabel[data-index='0'], & .MuiSlider-markLabel[data-index='2']":
            {
              top: "3px",
              lineHeight: 0,
            },

          "& .MuiSlider-mark": {
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
