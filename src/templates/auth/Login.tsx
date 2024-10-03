import * as React from "react";
import Box from "@mui/material/Box";
import Header from "../../components/auth/Header";
import Footer from "../../components/Footer";
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
        <Header />
        <LoginForm />
        <Box component="footer" sx={{ mt: "auto", width: "100%" }}>
          <Footer />
        </Box>
      </Box>
    </>
  );
}
