import { Box, Container } from "@mui/material";
import Header from "../../components/auth/Header";
import Footer from "../../components/Footer";
import Content from "../../components/home/Content";

function Home() {
  return (
    <>
      <Box>
        <Header />
      </Box>
      <Container maxWidth="lg" component="main" sx={{ display: "flex", flexDirection: "column", my: 7, gap: 4 }}>
        <Content />
      </Container>
      <Box component="footer" sx={{ mt: "auto", width: "100%" }}>
        <Footer />
      </Box>
    </>
  );
}
export default Home;
