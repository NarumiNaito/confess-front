import * as React from "react";
import ProductHeroLayout from "./ProductHeroLayout";
import dinner from "../../../assets/dinner.jpg";
import { Box, Typography } from "@mui/material";

export default function ProductHero() {
  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${dinner})`,
        backgroundPosition: "center",
      }}
    >
      <img style={{ display: "none" }} src={dinner} alt="dinner" />
      <Box sx={{ fontStyle: "italic", mt: 12 }}>
        <Typography
          color="error"
          align="center"
          variant="h3"
          sx={{
            fontFamily: "YuMincho",
          }}
        >
          懺悔の館
        </Typography>
        <Typography
          color="inherit"
          align="center"
          variant="h6"
          sx={{
            mb: 4,
            mt: { xs: 4, sm: 10 },
            fontFamily: "cursive",
          }}
        >
          Don't judge, and you won't be judged. Don't condemn, and you won't be condemned. Set free, and you will be set free.
        </Typography>
      </Box>
    </ProductHeroLayout>
  );
}
