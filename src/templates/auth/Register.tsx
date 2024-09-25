import * as React from "react";
import Box from "@mui/material/Box";
import Header from "../../components/auth/Header";
import Footer from "../../components/Footer";
import { createTheme, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
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
        <Header />
        <RegisterForm />
        <Box component="footer" sx={{ mt: "auto", width: "100%" }}>
          <Footer />
        </Box>
      </Box>
    </>
  );
}
