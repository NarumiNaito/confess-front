import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import friend from "../../../assets/friend.jpg";
import family from "../../../assets/family.jpg";
import love from "../../../assets/love.jpg";
import company from "../../../assets/company.jpg";
import school from "../../../assets/school.jpg";
import others from "../../../assets/others.jpg";

const ImageBackdrop = styled("div")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  background: "#000",
  opacity: 0.5,
  transition: theme.transitions.create("opacity"),
}));

const ImageIconButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  display: "block",
  padding: 0,
  borderRadius: 0,
  height: "40vh",
  [theme.breakpoints.down("md")]: {
    width: "100% !important",
    height: 100,
  },
  "&:hover": {
    zIndex: 1,
  },
  "&:hover .imageBackdrop": {
    opacity: 0.15,
  },
  "&:hover .imageMarked": {
    opacity: 0,
  },
  "&:hover .imageTitle": {
    border: "4px solid currentColor",
  },
  "& .imageTitle": {
    position: "relative",
    padding: `${theme.spacing(2)} ${theme.spacing(4)} 14px`,
  },
  "& .imageMarked": {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  },
}));

const number = {
  fontSize: 24,
  fontFamily: "default",
  color: "info.main",
  fontWeight: "medium",
};

const images = [
  { id: 1, url: friend, title: "友達", width: "40%" },
  { id: 2, url: family, title: "家族", width: "25%" },
  { id: 3, url: love, title: "恋愛", width: "35%" },
  { id: 4, url: company, title: "職場", width: "38%" },
  { id: 5, url: school, title: "学校", width: "38%" },
  { id: 6, url: others, title: "その他", width: "24%" },
];

export default function ProductCategories() {
  return (
    <Container component="section" sx={{ mt: 6, mb: 10 }}>
      <Box sx={number}>4.カテゴリー検索</Box>
      <Typography m={4} variant="h6" align="center">
        カテゴリー別に検索することができます。
      </Typography>
      <Box sx={{ mt: 4, display: "flex", flexWrap: "wrap" }}>
        {images.map((image) => (
          <ImageIconButton key={image.id} style={{ width: image.width }}>
            <Box
              sx={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                backgroundSize: "cover",
                backgroundPosition: "center 40%",
                backgroundImage: `url(${image.url})`,
              }}
            />
            <ImageBackdrop className="imageBackdrop" />
            <Box
              sx={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "common.white",
              }}
            >
              <Typography component="h3" variant="h6" color="inherit" className="imageTitle">
                {image.title}
                <div className="imageMarked" />
              </Typography>
            </Box>
          </ImageIconButton>
        ))}
      </Box>
    </Container>
  );
}
