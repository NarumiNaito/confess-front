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
import { useAuthContext } from "../../router/useAuthContext";
import { useForm, SubmitHandler } from "react-hook-form";
import { axios } from "../../api/Axios";
import { InputsLogin } from "../../types/Types";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

function AuthHeader() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElItem, setAnchorElItem] = React.useState<null | HTMLElement>(null);

  const { login } = useAuthContext();
  const { handleSubmit } = useForm({
    defaultValues: {
      email: "welcome@guest.com",
      password: "welcome4649",
    },
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<InputsLogin> = async (data) => {
    const requestUser = {
      email: data.email,
      password: data.password,
    };

    await axios.get(`sanctum/csrf-cookie`).then((response) => {
      axios.post(`api/login`, requestUser).then((res) => {
        navigate("/myPage");
        login();
      });
    });
  };

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
            sx={{
              fontFamily: "YuMincho",
              mr: 2,
              display: { xs: "none", md: "flex" },
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
              {navItems.map((item, i) => (
                <MenuItem onClick={handleCloseItemMenu}>
                  <Button key={i} onClick={() => navigate(item.path)} sx={{ color: "#fff", textAlign: "center" }} startIcon={item.icon}>
                    {item.name}
                  </Button>
                </MenuItem>
              ))}
              <Button type="button" onClick={handleSubmit(onSubmit)} sx={{ color: "#fff", textAlign: "center" }} startIcon={<PeopleAltIcon />}>
                ゲストログイン
              </Button>
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", lg: "flex" } }}>
            {pages.map((page, i) => (
              <Button key={i} onClick={() => navigate(page.path)} sx={{ color: "#fff" }} startIcon={page.icon}>
                {page.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: { xs: "none", lg: "flex" } }}>
            {navItems.map((item, i) => (
              <Button key={i} onClick={() => navigate(item.path)} sx={{ color: "#fff" }} startIcon={item.icon}>
                {item.name}
              </Button>
            ))}
            <Button type="button" onClick={handleSubmit(onSubmit)} sx={{ color: "#fff" }} startIcon={<PeopleAltIcon />}>
              ゲストログイン
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default AuthHeader;
