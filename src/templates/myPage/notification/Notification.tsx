import { Box } from "@mui/material";
import Header from "../../../components/header/Header";
import NotificationContent from "../../../components/myPage/notification/NotificationContent";
import Footer from "../../../components/footer/Footer";

function Notification() {
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
        <NotificationContent />
        <Box component="footer" sx={{ mt: "auto", width: "100%" }}>
          <Footer />
        </Box>
      </Box>
    </>
  );
}
export default Notification;
