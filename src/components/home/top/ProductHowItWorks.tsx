import * as React from "react";
import { Theme } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import CommentIcon from "@mui/icons-material/Comment";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";

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

function ProductHowItWork() {
  return (
    <Box component="section" sx={{ bgcolor: "rgba(255, 255, 255, 0.12)", display: "flex", overflow: "hidden" }}>
      <Container
        sx={{
          mt: 10,
          mb: 15,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography color="error" variant="h4" component="h2" sx={{ mb: 12, fontFamily: "cursive", fontStyle: "italic" }}>
          How it works
        </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>1.懺悔投稿</Box>
                <CreateIcon sx={{ my: 4 }} />
                <Typography variant="h5" align="center">
                  貴方の心の奥底にある後悔やわだかまり等、 匿名で懺悔を投稿できます
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>2.コメント</Box>
                <CommentIcon sx={{ my: 4 }} />
                <Typography variant="h5" align="center">
                  他人の懺悔に対してコメントすることができます
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>3.赦す</Box>
                <VolunteerActivismIcon sx={{ my: 4 }} />
                <Typography variant="h5" align="center">
                  他人の懺悔に対し赦しを与えることができます
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </div>
      </Container>
    </Box>
  );
}

export default ProductHowItWork;
