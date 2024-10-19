import { Box, Container } from "@mui/material";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Content from "../../components/comment/Content";
import { useLocation } from "react-router-dom";

function Comment() {
  const location = useLocation();
  console.log(location);
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
          <Content {...location} />
        </Container>
        <Box component="footer" sx={{ mt: "auto", width: "100%" }}>
          <Footer />
        </Box>
      </Box>
    </>
  );
}
export default Comment;
