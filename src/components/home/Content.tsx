import * as React from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import { axios } from "../../api/Axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import CommentIcon from "@mui/icons-material/Comment";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import SkeletonLoading from "../loading/SkeletonLoading";
import Chip from "@mui/material/Chip";
import { categoryItems } from "../../data/Category";
import { Button, Divider, Tooltip, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { CurrentPage, Post } from "../../types/Types";

export default function Content() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [currentPage, setCurrentPage] = React.useState<CurrentPage>({ last_page: 1 });
  const [open, setOpen] = React.useState<boolean>(false);
  const [total, setTotal] = React.useState<number>();

  const navigate = useNavigate();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageCount = currentPage.last_page;

  React.useEffect(() => {
    const qpPage = parseInt(searchParams.get("page") || "1", 10);
    const qpCategory = parseInt(searchParams.get("category_id") || "0", 10);
    fetchPost(qpPage, qpCategory);
  }, [searchParams]);

  const fetchPost = async (page: number, categoryId: number) => {
    setLoading(true);
    axios
      .get(`api/posts?page=${page}&category_id=${categoryId}`)
      .then((res) => {
        console.log(res.data);
        setPosts(res.data.data);
        setCurrentPage(res.data);
        setTotal(res.data.total);
      })
      .catch((res) => {
        if (res.status === 401) {
          return;
        }
      })
      .finally(() => {
        setTimeout(() => setLoading(false), 1000);
      });
  };

  const handleChange = (event: SelectChangeEvent<number>) => {
    setSearchParams({ page: "1", category_id: String(event.target.value) });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChangePage = (e: React.ChangeEvent<unknown>, page: number) => {
    console.log(page);
    setSearchParams({ page: String(page), category_id: searchParams.get("category_id") || "0" });
  };

  React.useEffect(() => {
    const savedCategory = localStorage.getItem("selectedCategory");
    if (savedCategory) {
      setSearchParams({ page: "1", category_id: savedCategory });
    }
    //  else {
    //   setSearchParams({ page: "1", category_id: "0" });
    // }
    return () => {
      localStorage.removeItem("selectedCategory");
    };
  }, []);

  const handleClick = (categoryId: number) => {
    localStorage.setItem("selectedCategory", String(categoryId));
    setSearchParams({ page: "1", category_id: String(categoryId) });
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
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                label="カテゴリー"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                onChange={handleChange}
                value={parseInt(searchParams.get("category_id") || "0", 10)}
              >
                {categoryItems.map((category, id) => (
                  <MenuItem
                    key={id}
                    value={id}
                    onClick={() => handleClick(category.id)}
                    sx={{
                      transition: "all 0.3s",
                      backgroundColor: searchParams.get("category_id") === String(category.id) ? "#1976d2" : "transparent",
                      color: searchParams.get("category_id") === String(category.id) ? "#fff" : "inherit",
                    }}
                  >
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
                  transition: "all 0.3s",
                  backgroundColor: searchParams.get("category_id") === String(category.id) && searchParams.get("category_id") ? "#1976d2" : "transparent",
                  color: searchParams.get("category_id") === String(category.id) && searchParams.get("category_id") ? "#fff" : "inherit",
                }}
              />
            </Box>
          ))}
        </Box>
        <Typography variant="h5">全 {total} 件</Typography>
      </Box>
      {loading ? (
        <SkeletonLoading />
      ) : (
        <>
          <div>
            <Box sx={{ flexGrow: 1, overflow: "hidden", margin: "0 auto", display: "flex", justifyContent: "center", px: 3 }}>
              <Grid sx={{ width: 800 }}>
                {posts.map((post, id) => (
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

                      <Typography m={1} whiteSpace={"pre-line"} variant="h6">
                        {post["content"]}
                      </Typography>

                      <Box sx={{ position: "relative", mb: 3 }}>
                        <Box display="flex" justifyContent="space-between" sx={{ position: "absolute", right: 0 }}>
                          <Tooltip title="赦す">
                            <Button color="inherit" component="label" variant="outlined" sx={{ mr: 1 }} tabIndex={-1} size="small" startIcon={<VolunteerActivismIcon />}>
                              ({post["forgives_count"]})
                            </Button>
                          </Tooltip>
                          <Tooltip title="コメント">
                            <Button
                              onClick={() => navigate(`/comment/${post["id"]}`, { state: post })}
                              component="label"
                              variant="outlined"
                              color="inherit"
                              tabIndex={-1}
                              size="small"
                              startIcon={<CommentIcon />}
                            >
                              ({post["comment_count"]})
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
                        <Button onClick={() => navigate(`/detail/${post["user_id"]}`, { state: post })} color="inherit" sx={{ display: "flex", flexDirection: "row", gap: 1, alignItems: "center" }}>
                          <Tooltip title={post["name"]}>
                            <AvatarGroup max={3}>
                              <Avatar src={post["image"]} sx={{ width: 24, height: 24 }} />
                            </AvatarGroup>
                          </Tooltip>
                          <Typography variant="subtitle1">{post["name"]}</Typography>
                        </Button>

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
        <Pagination hidePrevButton hideNextButton page={page} onChange={handleChangePage} count={pageCount} boundaryCount={1} />
      </Box>
    </>
  );
}
