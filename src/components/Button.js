import React from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import MuiButton from "@mui/material/Button";

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#2962ff",
      darker: "#1c44b2",
    },
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
});

export const Button = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <div className='btn-container'>
        <MuiButton size='large' color='primary' variant='contained'>
          {children}
        </MuiButton>
      </div>
    </ThemeProvider>
  );
};

export default Button;
