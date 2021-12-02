import React from "react";
import Button from "@mui/material/Button";

const MiniButton = ({ content, value, setValue, small }) => {
  let sx = {
    boxSizing: "border-box",
    padding: "1px 2px 0",
    minWidth: "2rem",
    maxWidth: "2rem",
    fontSize: "1.5rem",
    lineHeigth: 0,
    maxHeight: "2rem",
    borderWidth: "1px",
    // "&.first"
    "&.MuiButton-contained": {
      backgroundColor: "#1970ab",
      minWidth: "1.9rem",
    },
    "&.MuiButton-outlined": {
      borderColor: "transparent",
      color: "#fafafa",
      "&:hover": {
        borderColor: "#1970ab",

        borderWidth: "2px",
      },
    },
    "&.MuiButton-root:first-of-type": {
      marginRight: "2px",
    },
  };
  if (small) {
    sx = {
      ...sx,
      padding: "4px 3px",
      minWidth: "1.8rem",
      maxWidth: "1.8rem",
      fontSize: "1.4rem",
      minHeight: "1.8rem",
      maxHeight: "1.8rem",
      borderWidth: "px",

      "&.MuiButton-contained": {
        backgroundColor: "#1970ab",
        minWidth: "1.8rem",
      },

      "&.MuiButton-root:first-of-type": {
        marginRight: "2px",
        marginLeft: "5px",
      },
    };
  }

  return (
    <Button
      variant={`${value === content ? "contained" : "outlined"}`}
      size='small'
      sx={sx}
      onClick={setValue}
    >
      {content}
    </Button>
  );
};

export default MiniButton;
