import * as React from "react";
import Box from "@mui/material/Box";
import GuestLoginForm from "../../components/auth/guest/GuestLoginForm";

export default function GuestLogin() {
  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <GuestLoginForm />
      </Box>
    </>
  );
}
