import { Box, Container } from "@mui/material";
import Header from "../../../components/header/Header";
import MyCommentContent from "../../../components/myPage/comment/MyCommentContent";
import { useLocation, useParams } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { SiteMarkIcon } from "../../../components/CustomIcons";
import { IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/GitHub";
import { Link } from "react-router-dom";
import Footer from "../../../components/footer/Footer";

function MyComment() {
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
        <Container maxWidth="lg" component="main" sx={{ display: "flex", flexDirection: "column", my: 7, gap: 4 }}>
          <MyCommentContent {...location} />
        </Container>
        <Box component="footer" sx={{ mt: "auto", width: "100%" }}>
          <Footer />
        </Box>
      </Box>
    </>
  );
}
export default MyComment;
