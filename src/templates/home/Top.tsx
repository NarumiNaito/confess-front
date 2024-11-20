import { Box } from "@mui/material";
import Header from "../../components/header/AuthHeader";
import Footer from "../../components/footer/AuthFooter";
import ProductHero from "../../components/home/top/ProductHero";
import ProductHowItWorks from "../../components/home/top/ProductHowItWork";
import ProductCategories from "../../components/home/top/ProductCategories";
import ProductHowItWork from "../../components/home/top/ProductHowItWorks";
import ProductCTA from "../../components/home/top/ProductCTA";

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
        <ProductHero />
        <ProductHowItWork />
        <ProductCategories />
        <ProductHowItWorks />
        <ProductCTA />
        <Box component="footer" sx={{ mt: "auto", width: "100%" }}>
          <Footer />
        </Box>
      </Box>
    </>
  );
}
export default Home;
