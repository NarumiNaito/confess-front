import * as React from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import { axios } from "../../api/Axios";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import CommentIcon from "@mui/icons-material/Comment";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import SkeletonLoading from "../loading/SkeletonLoading";
import Chip from "@mui/material/Chip";
import { categoryItems } from "../../data/Category";
import { Button, Divider, Tooltip, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

export default function Content() {
  const getPageNumberFromSession = (): number => {
    const pageNumber = sessionStorage.getItem("getPage");
    return pageNumber ? parseInt(pageNumber, 10) : 1;
  };

  const [loading, setLoading] = React.useState(false);
  const [posts, setPosts] = React.useState([]);
  const [page, setPage] = React.useState(getPageNumberFromSession());
  const [currentPage, setCurrentPage] = React.useState({ current_page: 1, last_page: 1, total: 0 });
  const [category, setCategory] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [showPosts, setShowPosts] = React.useState(posts);

  // const navigate = useNavigate();
  const pageCount = currentPage.last_page;

  React.useEffect(() => {
    sessionStorage.setItem("getPage", page.toString());
    fetchPost(page);
  }, [page, category]);

  React.useEffect(() => {
    setShowPosts(posts);
  }, [posts]);

  const fetchPost = async (page: number) => {
    // React.useEffect(() => {
    setLoading(true);
    axios
      .get(`api/posts?page=${page}&category_id=${category}`)
      .then((res) => {
        console.log(res.data);
        setPosts(res.data.data);
        setCurrentPage(res.data);
      })
      .catch((res) => {
        if (res.status === 401) {
          // setAuthError(true);
          return;
        }
      })
      .finally(() => {
        setTimeout(() => setLoading(false), 1000);
      });
  };
  // }, [page]);

  const handleChange = (event: SelectChangeEvent<number>) => {
    setCategory(Number(event.target.value));
    sessionStorage.setItem("getPage", "1");
    setPage(1);
  };

  const handleChangePage = (e: React.ChangeEvent<unknown>, page: number) => {
    console.log(page);
    setPage(page);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClick = (categoryId: number) => {
    setCategory(categoryId);
    sessionStorage.setItem("getPage", "1");
    setPage(1);
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <Box mb={2}>
          <Typography variant="h5" mb={3}>
            みんなの懺悔
          </Typography>
          <Typography>自分が犯した罪や過ちなど、心残りを神の前で告白しませんか？</Typography>
        </Box>

        <Box sx={{ display: { md: "none" } }}>
          <Button sx={{ mr: 6 }} color="error" onClick={handleOpen}>
            カテゴリー検索
          </Button>
          <Box>
            <FormControl sx={{ minWidth: 150 }} size="small">
              <InputLabel id="demo-select-small-label">カテゴリー</InputLabel>
              <Select labelId="demo-select-small-label" id="demo-select-small" open={open} onClose={handleClose} onOpen={handleOpen} value={category} label="カテゴリー" onChange={handleChange}>
                {categoryItems.map((category, id) => (
                  <MenuItem key={id} value={category.id}>
                    {category.category_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: { xs: "column-reverse", md: "row" },
            width: "100%",
            justifyContent: "center",
            alignItems: { xs: "center" },
            gap: 4,
            overflow: "auto",
          }}
        >
          {categoryItems.map((category, id) => (
            <Box
              key={id}
              sx={{
                flexDirection: "row",
                gap: 3,
                overflow: "auto",
              }}
            >
              <Chip
                onClick={() => handleClick(category.id)}
                size="medium"
                label={category.category_name}
                icon={category.icon}
                sx={{
                  backgroundColor: "transparent",
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>
      {loading ? (
        <SkeletonLoading />
      ) : (
        <>
          <div>
            <Box sx={{ flexGrow: 1, overflow: "hidden", margin: "0 auto", display: "flex", justifyContent: "center", px: 3 }}>
              <Grid sx={{ width: 800 }}>
                {showPosts.map((post, id) => (
                  <Grid key={id} size={{ xs: 12, sm: 6 }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        gap: 1,
                        height: "100%",
                      }}
                    >
                      <Typography mt={3} variant="h6" component="div" color="error">
                        「{post["category_name"]}」
                      </Typography>

                      <Typography m={1} variant="h6">
                        {post["content"]}
                      </Typography>

                      <Box sx={{ position: "relative", mb: 3 }}>
                        <Box display="flex" justifyContent="space-between" sx={{ position: "absolute", right: 0 }}>
                          <Tooltip title="赦す">
                            <Button component="label" variant="outlined" sx={{ color: "#fff", mr: 1 }} tabIndex={-1} size="small" startIcon={<VolunteerActivismIcon />}>
                              (0)
                            </Button>
                          </Tooltip>
                          <Tooltip title="コメント">
                            <Button component="label" variant="outlined" sx={{ color: "#fff" }} tabIndex={-1} size="small" startIcon={<CommentIcon />}>
                              (0)
                            </Button>
                          </Tooltip>
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
                          <AvatarGroup max={3}>
                            <Avatar src={post["image"]} sx={{ width: 24, height: 24 }} />
                          </AvatarGroup>
                          <Typography variant="subtitle1">{post["name"]}</Typography>
                        </Box>

                        <Typography variant="subtitle1">{dayjs(post["created_at"]).format("YYYY年M月D日")}</Typography>
                      </Box>
                    </Box>
                    <Divider />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </div>
        </>
      )}
      <Box sx={{ display: "flex", flexDirection: "row", pt: 4 }} justifyContent={"center"}>
        <Pagination hidePrevButton hideNextButton page={page} onChange={handleChangePage} count={pageCount} boundaryCount={10} />
      </Box>
    </>
  );
}
