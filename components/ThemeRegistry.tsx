"use client";

import { PropsWithChildren } from "react";
import { CssBaseline } from "@mui/material";
import { StyledEngineProvider, ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0f172a",
      paper: "#111827"
    },
    primary: {
      main: "#6366f1"
    },
    secondary: {
      main: "#ec4899"
    }
  },
  typography: {
    fontFamily: [
      "'Inter'",
      "'Roboto'",
      "'Helvetica Neue'",
      "Arial",
      "sans-serif"
    ].join(",")
  }
});

export default function ThemeRegistry({ children }: PropsWithChildren) {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
