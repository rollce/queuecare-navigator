"use client";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: { main: "#1554c0" },
    secondary: { main: "#0d8a73" },
    background: { default: "#f5f8fc", paper: "#ffffff" },
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
  },
});

export function MuiThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
