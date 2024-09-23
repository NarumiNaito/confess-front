import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Badge } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { SignInIcon } from "../../components/Auth/CustomIcons";

const navItems = ["ログイン", "新規登録"];

function Header() {
  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Box display={"flex"} justifyContent={"space-between"}>
          <Box>
            <SignInIcon />
          </Box>
          <Box sx={{ marginTop: 1, display: { sm: "block" } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: "#fff" }}>
                {item}
              </Button>
            ))}
          </Box>
        </Box>
      </Container>
    </AppBar>
  );
}
export default Header;
