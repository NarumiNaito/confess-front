import React from "react";
import "./App.css";
import { createTheme, CssBaseline, Stack, ThemeProvider } from "@mui/material";
import Router from "./router/Router";
import styled from "@emotion/styled";

const themeDark = createTheme({
  palette: {
    mode: "dark",
  },
});

const Gradient = styled(Stack)(({ theme }) => ({
  zIndex: -1,
  inset: 0,
  backgroundRepeat: "no-repeat",
  backgroundImage: "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
}));

function App() {
  return (
    <ThemeProvider theme={themeDark}>
      <Gradient>
        <CssBaseline enableColorScheme />
        <div className="App">
          <Router />
        </div>
      </Gradient>
    </ThemeProvider>
  );
}

export default App;
