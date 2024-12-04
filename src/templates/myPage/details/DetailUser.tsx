import { Box, Container } from "@mui/material";
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import DetailContent from "../../../components/myPage/details/DetailContent";

function DetailUser() {
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
        <DetailContent />
        <Box component="footer" sx={{ mt: "auto", width: "100%" }}>
          <Footer />
        </Box>
      </Box>
    </>
  );
}
export default DetailUser;
