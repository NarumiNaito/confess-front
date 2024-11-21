import { useNavigate } from "react-router-dom";
import PageImage from "../assets/Image404.png";
import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import Footer from "../components/footer/AuthFooter";
import { SiteMarkIcon } from "../components/CustomIcons";

function Page404() {
  const navigate = useNavigate();

  const clickBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <AppBar position="sticky">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1, mt: 1 }}>
                <Button onClick={clickBack}>
                  <SiteMarkIcon />
                </Button>
              </Box>
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 100,
                  letterSpacing: ".2rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                信じる者は救われる
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <Box sx={{ display: { xs: "flex", md: "none" }, mr: 1, mt: 1 }}>
                  <Button onClick={clickBack}>
                    <SiteMarkIcon />
                  </Button>
                </Box>
              </Box>
              <Box sx={{ display: { xs: "block", md: "block" }, ml: "auto" }}>
                <Button onClick={clickBack} style={{ color: "white", textDecoration: "none" }}>
                  戻る
                </Button>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          <img
            src={PageImage}
            alt="404 Not Found"
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </Box>
        <Box component="footer" sx={{ mt: "auto", width: "100%" }}>
          <Footer />
        </Box>
      </Box>
    </>
  );
}

export default Page404;
