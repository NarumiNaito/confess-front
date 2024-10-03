import * as React from "react";
import Box from "@mui/material/Box";
import { CircularProgress } from "@mui/material";
import styled from "@emotion/styled";

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

  return (
    <>
      <CircularLoading />
    </>
  );
}
