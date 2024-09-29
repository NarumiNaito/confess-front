import React from "react";
import { createTheme, CssBaseline, Stack, ThemeProvider } from "@mui/material";
import Router from "./router/Router";
import styled from "@emotion/styled";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const BackgroundImage = styled(Stack)(({ theme }) => ({
  zIndex: -1,
  inset: 0,
  textAlign: "center",
  backgroundRepeat: "no-repeat",
  backgroundImage: "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
}));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <BackgroundImage>
          <CssBaseline enableColorScheme />
          <Router />
        </BackgroundImage>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
