import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { SignInIcon } from "../components/Auth/CustomIcons";

const navItems = ["利用規約", "プライバシーポリシー", "お問合せ"];

function Footer() {
  return (
    <AppBar position="sticky">
      <Container sx={{ Bottom: 0, padding: 5 }}>
        <Box>
          <Box sx={{ display: { sm: "block" } }} justifyContent={"center"}>
            {navItems.map((item) => (
              <Button key={item} sx={{ textAlign: "white" }}>
                {item}
              </Button>
            ))}
          </Box>
          <SignInIcon />
          <Typography>©since 2024 懺悔の館 </Typography>
        </Box>
      </Container>
    </AppBar>
  );
}
export default Footer;
