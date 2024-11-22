import { Box } from "@mui/material";
import Header from "../../components/header/AuthHeader";
import Footer from "../../components/footer/AuthFooter";
import ProductHero from "../../components/home/top/ProductHero";
import ProductHowItWorks from "../../components/home/top/ProductHowItWork";
import ProductCategories from "../../components/home/top/ProductCategories";
import ProductHowItWork from "../../components/home/top/ProductHowItWorks";
import ProductCTA from "../../components/home/top/ProductCTA";
import { motion } from "framer-motion";

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
        <motion.div
          initial={{ opacity: 0 }}
          transition={{ duration: 2 }}
          whileInView={{
            opacity: 1,
          }}
        >
          <ProductHowItWork />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          transition={{ duration: 2 }}
          whileInView={{
            opacity: 1,
          }}
        >
          <ProductCategories />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          transition={{ duration: 2 }}
          whileInView={{
            opacity: 1,
          }}
        >
          <ProductHowItWorks />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          transition={{ duration: 2 }}
          whileInView={{
            opacity: 1,
          }}
        >
          <ProductCTA />
        </motion.div>
        <Box component="footer" sx={{ mt: "auto", width: "100%" }}>
          <Footer />
        </Box>
      </Box>
    </>
  );
}
export default Home;
