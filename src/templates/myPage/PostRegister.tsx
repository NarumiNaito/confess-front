import { Box, Container } from "@mui/material";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import PostForm from "../../components/myPage/PostForm";

function PostRegister() {
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
          <PostForm />
        </Container>
        <Box component="footer" sx={{ mt: "auto", width: "100%" }}>
          <Footer />
        </Box>
      </Box>
    </>
  );
}
export default PostRegister;
