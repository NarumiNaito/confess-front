import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { SiteMarkIcon } from "../CustomIcons";
import { IconButton, MenuItem, Toolbar, Typography } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";

const navItems = [
  { name: "ログイン", path: "/login" },
  { name: "新規登録", path: "/register" },
];
const pages = [
  { name: "みんなの懺悔", path: "/" },
  { name: "成就した懺悔", path: "/rank" },
];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const navigate = useNavigate();

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
            <Link to="/">
              <SiteMarkIcon />
            </Link>
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
            <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page, i) => (
                <MenuItem key={i} onClick={handleCloseNavMenu}>
                  <Button key={i} onClick={() => navigate(page.path)} sx={{ color: "#fff", textAlign: "center" }}>
                    {page.name}
                  </Button>
                </MenuItem>
              ))}
            </Menu>
            <Box sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
              <Link to="/">
                <SiteMarkIcon />
              </Link>
            </Box>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, i) => (
              <Button key={i} onClick={handleCloseNavMenu} sx={{ my: 2, display: "block" }}>
                <Button key={i} onClick={() => navigate(page.path)} sx={{ color: "#fff" }}>
                  {page.name}
                </Button>
              </Button>
            ))}
          </Box>
          <Box sx={{ display: { sm: "block" } }}>
            {navItems.map((item, i) => (
              <Button key={i} onClick={() => navigate(item.path)} sx={{ color: "#fff" }}>
                {item.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
