import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import { axios } from "../../../api/Axios";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import { Button, Divider, Tooltip } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import angels from "../../../assets/angels.jpg";
import { motion } from "framer-motion";

export default function MyFulfillmentContent(props: any) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState({ last_page: 1 });

  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageCount = currentPage.last_page;
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;

  React.useEffect(() => {
    const qpPage = parseInt(searchParams.get("page") || "1", 10);
    fetchPost(qpPage);
  }, [searchParams]);

  const fetchPost = async (page: number) => {
    axios
      .get(`api/forgives/index/${id}?page=${page}`)
      .then((res) => {
        setPosts(res.data.data);
        setCurrentPage(res.data);
      })

      .catch((res) => {
        if (res.status === 401) {
          return;
        }
      });
  };

  const handleChangePage = (e: React.ChangeEvent<unknown>, page: number) => {
    navigate(`/myPage/forgives/${id}?page=${page}`, { state: props.state });
  };

  return (
    <>
      <div>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Box
            mb={8}
            sx={{
              fontStyle: "italic",
              position: "relative",
              backgroundImage: `url(${angels})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              color: "#fff",
              padding: "7rem",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                borderRadius: "inherit",
                zIndex: 1,
              },
              zIndex: 2,
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
            >
              <Typography color="error" variant="h5" sx={{ fontFamily: "YuMincho", position: "relative", zIndex: 2 }}>
                神より赦しを得た懺悔
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
                variant="subtitle1"
                sx={{
                  fontFamily: "cursive",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                Confession with forgiveness
              </Typography>
            </motion.div>
          </Box>
        </Box>

        <Box sx={{ flexGrow: 1, overflow: "hidden", margin: "0 auto", display: "flex", justifyContent: "center", px: 3 }}>
          <Grid sx={{ width: 900 }}>
            <Box
              sx={{
                mb: 5,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 1,
                height: "100%",
              }}
            >
              <Typography mt={2} variant="h6" component="div" color="error">
                「{props.state.category_name}」
              </Typography>

              <Typography m={1} whiteSpace={"pre-line"} variant="h6">
                {props.state.content}
              </Typography>

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
                  <Button
                    color="inherit"
                    sx={{ textTransform: "none", display: "flex", flexDirection: "row", gap: 1, alignItems: "center", fontSize: 20 }}
                    startIcon={
                      props.state.image ? <img src={props.state.image} alt="userIcon" style={{ width: 32, height: 32, borderRadius: "50%" }} /> : <AccountCircle sx={{ width: 32, height: 32 }} />
                    }
                  >
                    {props.state.name}
                  </Button>
                </Box>

                <Typography variant="subtitle1">{dayjs(props.state.updated_at).format("YYYY年M月D日")}</Typography>
              </Box>
              <Divider />
            </Box>
          </Grid>
        </Box>
      </div>
      <div>
        <Box sx={{ flexGrow: 1, overflow: "hidden", margin: "0 auto", display: "flex", justifyContent: "center", px: 3 }}>
          <Grid sx={{ width: 800 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <Box my={7}>
                <Typography variant="h5">赦しをくれた子羊達</Typography>
              </Box>
            </Box>
            {posts.map((post, id) => (
              <Grid key={id} size={{ xs: 12, sm: 6 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: 1,
                    height: "100%",
                    mb: 5,
                  }}
                >
                  <Typography m={1} whiteSpace={"pre-line"} variant="h6">
                    {post["content"]}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 2,
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Tooltip title={post["name"]}>
                      <Button
                        onClick={() => navigate(`/myPage/detail/${post["user_id"]}`, { state: post })}
                        color="inherit"
                        sx={{ textTransform: "none", display: "flex", flexDirection: "row", gap: 1, alignItems: "center", fontSize: 20 }}
                        startIcon={post["image"] ? <img src={post["image"]} alt="userIcon" style={{ width: 32, height: 32, borderRadius: "50%" }} /> : <AccountCircle sx={{ width: 32, height: 32 }} />}
                      >
                        {post["name"]}
                      </Button>
                    </Tooltip>
                    <Typography variant="subtitle1">{dayjs(post["created_at"]).format("YYYY年M月D日")}</Typography>
                  </Box>
                  <Divider />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
      <Box sx={{ display: "flex", flexDirection: "row", pb: 7 }} justifyContent={"center"}>
        <Pagination hidePrevButton hideNextButton page={page} onChange={handleChangePage} count={pageCount} boundaryCount={1} />
      </Box>
    </>
  );
}
