import * as React from "react";
import { Theme } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Button, Typography } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useNavigate } from "react-router-dom";

const item: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  px: 5,
};

const number = {
  fontSize: 24,
  fontFamily: "default",
  color: "info.main",
  fontWeight: "medium",
};

function ProductHowItWorks() {
  const navigate = useNavigate();
  return (
    <Box component="section" sx={{ display: "flex", bgcolor: "rgba(255, 255, 255, 0.12)", overflow: "hidden" }}>
      <Container
        sx={{
          mt: 10,
          mb: 10,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div>
          <Grid container spacing={5} mb={10}>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>5.Bookmark</Box>
                <BookmarkIcon sx={{ my: 4 }} />
                <Typography variant="h5" align="center">
                  気になった懺悔に対しBookmarkをつけることができます
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>6.通知</Box>
                <NotificationsIcon sx={{ my: 4 }} />
                <Typography variant="h5" align="center">
                  貴方の投稿に対し赦す及びコメントがついたらベルで件数を表示し通知一覧から内容を確認できます。
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>7.ゲストログイン</Box>
                <PeopleAltIcon sx={{ my: 4 }} />
                <Typography variant="h5" align="center">
                  会員登録不要でゲストログインから懺悔することができます。
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </div>
        <Typography color="error" variant="h5" mt={2} mb={6} sx={{ fontStyle: "italic", fontFamily: "cursive" }}>
          Ask, and you will receive, that your joy may be full.
        </Typography>
        <Button onClick={() => navigate("/register")} color="error" size="large" variant="contained" component="a" startIcon={<PersonAddIcon />}>
          新規登録
        </Button>
      </Container>
    </Box>
  );
}

export default ProductHowItWorks;
