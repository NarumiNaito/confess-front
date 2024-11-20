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
import { navItems, pages } from "../../data/NavItems";

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElItem, setAnchorElItem] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenItemMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElItem(event.currentTarget);
  };

  const handleCloseItemMenu = () => {
    setAnchorElItem(null);
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

          <Box sx={{ flexGrow: 1, display: { xs: "flex", lg: "none" } }}>
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
              sx={{ display: { xs: "block", lg: "none" } }}
            >
              {pages.map((page, i) => (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Button key={i} onClick={() => navigate(page.path)} sx={{ color: "#fff", textAlign: "center" }} startIcon={page.icon}>
                    {page.name}
                  </Button>
                </MenuItem>
              ))}
            </Menu>
            <Box sx={{ display: { xs: "flex", md: "none" }, mr: 2 }}>
              <Link to="/">
                <SiteMarkIcon />
              </Link>
            </Box>
          </Box>

          <Box sx={{ display: { xs: "flex", lg: "none" } }}>
            <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenItemMenu} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElItem}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElItem)}
              onClose={handleCloseItemMenu}
              sx={{ display: { xs: "block", lg: "none" } }}
            >
              {navItems.map((page, i) => (
                <MenuItem onClick={handleCloseItemMenu}>
                  <Button key={i} onClick={() => navigate(page.path)} sx={{ color: "#fff", textAlign: "center" }} startIcon={page.icon}>
                    {page.name}
                  </Button>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", lg: "flex" } }}>
            {pages.map((page, i) => (
              // <Button onClick={handleCloseNavMenu} sx={{ my: 2, display: "block" }}>
              <Button key={i} onClick={() => navigate(page.path)} sx={{ color: "#fff" }} startIcon={page.icon}>
                {page.name}
              </Button>
              // </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", lg: "flex" } }}>
            {/* <Button onClick={handleCloseItemMenu} sx={{ my: 2, display: "block" }}> */}
            {navItems.map((item, i) => (
              <Button key={i} onClick={() => navigate(item.path)} sx={{ color: "#fff" }} startIcon={item.icon}>
                {item.name}
              </Button>
            ))}
            {/* </Button> */}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
