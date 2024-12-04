import { Box } from "@mui/material";
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import Content from "../../../components/myPage/post/Content";

function MyPage() {
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
        <Content />
        <Box component="footer" sx={{ mt: "auto", width: "100%" }}>
          <Footer />
        </Box>
      </Box>
    </>
  );
}
export default MyPage;
