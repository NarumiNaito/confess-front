import Box from "@mui/material/Box";
import { CircularProgress, Typography } from "@mui/material";
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
    </>
  );
}
