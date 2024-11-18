import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { SiteMarkIcon } from "../CustomIcons";
import { IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/GitHub";
import { Link } from "react-router-dom";
import { footerItems } from "../../data/NavItems";

function Footer() {
  return (
    <AppBar position="sticky">
      <Container sx={{ Bottom: 0, padding: 2, mt: 1 }}>
        <Box>
          <Box sx={{ display: { sm: "block" } }} justifyContent={"center"}>
            {footerItems.map((item) => (
              <Button color="inherit" key={item} sx={{ textAlign: "white" }}>
                {item}
              </Button>
            ))}
          </Box>
          <Link to="/myPage">
            <SiteMarkIcon />
          </Link>
          <Typography>
            ©since 2024 懺悔の館
            <IconButton color="inherit" size="large" href="https://github.com/NarumiNaito/confess-front" aria-label="LinkedIn" sx={{ alignSelf: "center" }}>
              <FacebookIcon />
            </IconButton>
          </Typography>
        </Box>
      </Container>
      <Box
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          zIndex: 1000,
        }}
      ></Box>
    </AppBar>
  );
}
export default Footer;
