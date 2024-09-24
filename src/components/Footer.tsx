import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { SignInIcon } from "./CustomIcons";
import { IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/GitHub";

const navItems = ["利用規約", "プライバシーポリシー", "お問合せ"];

function Footer() {
  return (
    <AppBar position="sticky">
      <Container sx={{ Bottom: 0, padding: 5 }}>
        <Box>
          <Box sx={{ display: { sm: "block" } }} justifyContent={"center"}>
            {navItems.map((item) => (
              <Button color="inherit" key={item} sx={{ textAlign: "white" }}>
                {item}
              </Button>
            ))}
          </Box>

          <SignInIcon />

          <Typography>
            ©since 2024 懺悔の館
            <IconButton color="inherit" size="large" href="https://github.com/NarumiNaito/confess-front" aria-label="LinkedIn" sx={{ alignSelf: "center" }}>
              <FacebookIcon />
            </IconButton>
          </Typography>
        </Box>
      </Container>
    </AppBar>
  );
}
export default Footer;
