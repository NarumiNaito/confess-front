import { Box, Container } from "@mui/material";
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import FulfillmentContent from "../../../components/myPage/fulfillment/FulfillmentContent";

function Fulfillment() {
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
          <FulfillmentContent />
        </Container>
        <Box component="footer" sx={{ mt: "auto", width: "100%" }}>
          <Footer />
        </Box>
      </Box>
    </>
  );
}
export default Fulfillment;
