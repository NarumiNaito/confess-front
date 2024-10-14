import { Box, Divider, Skeleton, useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useTheme } from "@mui/material/styles";

export default function SkeletonLoading() {
  const theme = useTheme();
  const isSmallScreen: boolean = useMediaQuery(theme.breakpoints.down("sm"));

  const isMediumScreen: boolean = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const isLargeScreen: boolean = useMediaQuery(theme.breakpoints.up("md"));

  let skeletonWidth: number;

  if (isSmallScreen) {
    skeletonWidth = 300;
  }

  if (isMediumScreen) {
    skeletonWidth = 700;
  }
  if (isLargeScreen) {
    skeletonWidth = 850;
  }

  return (
    <>
      <Box sx={{ flexGrow: 1, overflow: "hidden", margin: "0 auto", alignItems: "center", justifyContent: "center", px: 3 }}>
        {Array.from(new Array(5)).map((index) => (
          <Grid key={index} width={skeletonWidth}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 1,
                height: "100%",
                margin: 3,
              }}
            >
              <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
                <Skeleton variant="rectangular" width={40} height={20} />
              </Box>

              <Box>
                <Skeleton variant="rectangular" width="100%" height={150} />
              </Box>

              <Box sx={{ position: "relative", mb: 2 }}>
                <Box display="flex" justifyContent="space-between" sx={{ position: "absolute", right: 0 }}>
                  <Box mr={1}>
                    <Skeleton variant="rectangular" width={60} height={20} />
                  </Box>

                  <Box>
                    <Skeleton variant="rectangular" width={60} height={20} />
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "row", gap: 1, alignItems: "center" }}>
                  <Skeleton variant="circular" width={24} height={24} />
                  <Box>
                    <Skeleton variant="rectangular" width={72} height={20} />
                  </Box>
                </Box>
                <Box>
                  <Skeleton variant="rectangular" width={72} height={20} />
                </Box>
              </Box>
              <Divider />
            </Box>
          </Grid>
        ))}
      </Box>
    </>
  );
}
