import { Box, Container } from "@mui/material";
import Header from "../../components/header/AuthHeader";
import Footer from "../../components/footer/AuthFooter";
import HomeDetailContent from "../../components/home/HomeDetailContent";

function HomeDetailUser() {
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
        <Container maxWidth="lg" component="main" sx={{ display: "flex", flexDirection: "column", my: 7, gap: 4 }}>
          <HomeDetailContent />
        </Container>
        <Box component="footer" sx={{ mt: "auto", width: "100%" }}>
          <Footer />
        </Box>
      </Box>
    </>
  );
}
export default HomeDetailUser;
