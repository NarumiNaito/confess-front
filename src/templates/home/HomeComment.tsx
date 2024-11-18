import { Box, Container } from "@mui/material";
import Header from "../../components/header/AuthHeader";
import HomeCommentContent from "../../components/home/HomeCommentContent";
import { useLocation } from "react-router-dom";
import AuthFooter from "../../components/footer/AuthFooter";

function HomeComment() {
  const location = useLocation();

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
          <HomeCommentContent {...location} />
        </Container>
        <Box component="footer" sx={{ mt: "auto", width: "100%" }}>
          <AuthFooter />
        </Box>
      </Box>
    </>
  );
}
export default HomeComment;
