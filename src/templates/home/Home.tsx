import { Box, Container, createTheme, CssBaseline } from "@mui/material";
import Header from "../../components/auth/Header";
import Footer from "../../components/Footer";
import Categories from "../../components/home/Categories";
import Content from "../../components/home/Content";
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
      <Box>
        <Header />
      </Box>
      <Container maxWidth="lg" component="main" sx={{ display: "flex", flexDirection: "column", my: 10, gap: 4 }}>
        <Categories />
        <Content />
      </Container>

      <Box component="footer" sx={{ mt: "auto", width: "100%" }}>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
export default Home;
