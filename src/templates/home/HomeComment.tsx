import { Box } from "@mui/material";
import Header from "../../components/header/AuthHeader";
import HomeCommentContent from "../../components/home/HomeCommentContent";
import AuthFooter from "../../components/footer/AuthFooter";

function HomeComment() {
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
        <HomeCommentContent />
        <Box component="footer" sx={{ mt: "auto", width: "100%" }}>
          <AuthFooter />
        </Box>
      </Box>
    </>
  );
}
export default HomeComment;
