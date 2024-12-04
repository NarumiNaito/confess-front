import { Box, Container } from "@mui/material";
import Header from "../../../components/header/Header";
import { useLocation, useParams } from "react-router-dom";
import Footer from "../../../components/footer/Footer";
import MyFulfillmentContent from "../../../components/myPage/fulfillment/MyFulfillmentContent";

function MyFulfillment() {
  const location = useLocation();
  const params = useParams();

  console.log(params);
  console.log(location);

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
        <MyFulfillmentContent {...location} />
        <Box component="footer" sx={{ mt: "auto", width: "100%" }}>
          <Footer />
        </Box>
      </Box>
    </>
  );
}
export default MyFulfillment;
