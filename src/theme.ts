"use client";
import { createTheme } from "@mui/material";

const theme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: "var(--font-roboto)",
  },
});

export default theme;
