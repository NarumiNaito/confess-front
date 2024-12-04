import { Box } from "@mui/material";
import Header from "../../components/header/AuthHeader";
import Footer from "../../components/footer/AuthFooter";
import Content from "../../components/home/Content";

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
        <Content />
        <Box component="footer" sx={{ mt: "auto", width: "100%" }}>
          <Footer />
        </Box>
      </Box>
    </>
  );
}
export default Home;
