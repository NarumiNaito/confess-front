import * as React from "react";
import Box from "@mui/material/Box";
import RegisterForm from "../../components/auth/register/RegisterForm";

export default function Register() {
  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <RegisterForm />
      </Box>
    </>
  );
}
