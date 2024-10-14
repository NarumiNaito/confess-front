import * as React from "react";
import Box from "@mui/material/Box";
import Header from "../../components/header/AuthHeader";
import Footer from "../../components/footer/Footer";
import LoginForm from "../../components/auth/login/LoginForm";

export default function Login() {
  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <LoginForm />
      </Box>
    </>
  );
}
