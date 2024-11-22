import * as React from "react";
import ProductHeroLayout from "./ProductHeroLayout";
import dinner from "../../../assets/dinner.jpg";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

export default function ProductHero() {
  const fadeInVariants = {
    // hidden: { opacity: 0 },
    // visible: { opacity: 1, transition: { duration: 1 } },
  };
  return (
    <motion.div initial="hidden" animate="visible" variants={fadeInVariants}>
      <ProductHeroLayout
        sxBackground={{
          backgroundImage: `url(${dinner})`,
          backgroundPosition: "center",
        }}
      >
        <Box sx={{ fontStyle: "italic", mt: 12 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
          >
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 1 }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
          >
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
          </motion.div>
        </Box>
      </ProductHeroLayout>
    </motion.div>
  );
}
