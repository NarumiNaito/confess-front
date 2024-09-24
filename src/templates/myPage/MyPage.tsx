import { Box, createTheme, CssBaseline } from "@mui/material";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { ThemeProvider } from "@emotion/react";

function Home() {
  const themeDark = createTheme({
    palette: {
      mode: "dark",
    },
  });
  return (
    <ThemeProvider theme={themeDark}>
      <CssBaseline enableColorScheme />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header />
      </Box>
      <Box component="footer" sx={{ mt: "auto", width: "100%" }}>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
export default Home;
