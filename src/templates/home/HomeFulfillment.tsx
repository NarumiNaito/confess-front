import { Box } from "@mui/material";
import Header from "../../components/header/AuthHeader";
import Footer from "../../components/footer/AuthFooter";
import FulfillmentContent from "../../components/home/HomeFulfillmentContent";

function HomeFulfillment() {
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
        <FulfillmentContent />
        <Box component="footer" sx={{ mt: "auto", width: "100%" }}>
          <Footer />
        </Box>
      </Box>
    </>
  );
}
export default HomeFulfillment;
