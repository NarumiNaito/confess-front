import * as React from "react";
import Box from "@mui/material/Box";
import { CircularProgress, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { createTheme, Stack, ThemeProvider } from "@mui/material";

const DisabledBackground = styled(Box)({
  width: "100%",
  height: "100%",
  position: "fixed",
  background: "#ccc",
  opacity: 0.5,
  zIndex: 1,
});

export default function Loading() {
  const CircularLoading = () => (
    <Box
      sx={{
        position: "fixed",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2,
      }}
    >
      <CircularProgress
        size={70}
        sx={{
          zIndex: 3,
        }}
      />
      <DisabledBackground />
    </Box>
  );

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

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <BackgroundImage>
          <CircularLoading />
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "120%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 3,
            }}
          >
            <Typography
              color="primary"
              component="h4"
              variant="h4"
              sx={{
                fontSize: "clamp(2rem, 10vw, 2.15rem)",
                fontWeight: "bold",
              }}
            >
              読み込み中
            </Typography>
          </Box>
        </BackgroundImage>
      </ThemeProvider>
    </>
  );
}
