import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Badge } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { SiteMarkIcon } from "../CustomIcons";
import { axios } from "../../api/Axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../router/useAuthContext";
import { myPages } from "../../data/NavItems";

function Header() {
  const { logout } = useAuthContext();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [userName, setUserName] = React.useState<number>();
  const [image, setImage] = React.useState<any>();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (name: string) => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();

  const handlePost = () => {
    navigate("/myPage/post");
    setAnchorElUser(null);
  };

  const handleList = () => {
    navigate("/myPage/postList");
    setAnchorElUser(null);
  };

  const handleBookmarkList = () => {
    navigate("/myPage/bookmarkList");
    setAnchorElUser(null);
  };

  const handleAccount = () => {
    navigate("/myPage/profile");
    setAnchorElUser(null);
  };

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("api/user");
        console.log(res.data);
        if (res.data && res.data.length > 0) {
          setUserName(res.data[0].name);
          setImage(res.data[0].image);
        }
      } catch (error) {
        console.error("ユーザー情報の取得に失敗しました:", error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    axios.get(`sanctum/csrf-cookie`).then((response) => {
      axios
        .post(`api/user/logout`)
        .then((res) => {
          setAnchorElUser(null);
          logout();
          navigate("/login");
        })
        .catch((res) => {
          if (res.status === 422) {
            console.log(res);
            return;
          }
        });
    });
  };

  const settings = [
    { name: "懺悔する", path: "/post", clickEvent: handlePost },
    { name: "懺悔一覧", path: "/postList", clickEvent: handleList },
    { name: "ブックマーク一覧", path: "/bookmarkList", clickEvent: handleBookmarkList },
    { name: "アカウント編集", path: "profile", clickEvent: handleAccount },
    { name: "ログアウト", path: "/login", clickEvent: handleLogout },
  ];

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
            <Link to="/myPage">
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
              {myPages.map((page, i) => (
                <MenuItem key={i} onClick={handleCloseNavMenu}>
                  <Button onClick={() => navigate(page.path)} sx={{ textAlign: "center", color: "#fff" }} startIcon={page.icon}>
                    {page.name}
                  </Button>
                </MenuItem>
              ))}
            </Menu>
            <Box sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
              <Link to="/myPage">
                <SiteMarkIcon />
              </Link>
            </Box>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {myPages.map((page, i) => (
              <Button key={i} onClick={handleCloseNavMenu} sx={{ my: 2, m: 1, color: "#fff" }} startIcon={page.icon}>
                <Button onClick={() => navigate(page.path)} sx={{ color: "#fff" }}>
                  {page.name}
                </Button>
              </Button>
            ))}
          </Box>

          <Box paddingRight={1}>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Tooltip title="通知">
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </Tooltip>
            </IconButton>
          </Box>
          {/* <img src={image} alt="" /> */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="マイページ">
              <Button onClick={handleOpenUserMenu} sx={{ p: 0, color: "white", textTransform: "none" }} startIcon={<AccountCircle />}>
                {userName}
              </Button>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, i) => (
                <MenuItem key={i} onClick={() => setting.clickEvent()}>
                  <Typography sx={{ textAlign: "center" }}>{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
