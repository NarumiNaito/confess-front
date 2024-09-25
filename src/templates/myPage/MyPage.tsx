import { Box } from "@mui/material";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function Home() {
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
      </Box>
      <Box component="footer" sx={{ mt: "auto", width: "100%" }}>
        <Footer />
      </Box>
    </>
  );
}
export default Home;
