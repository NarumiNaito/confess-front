import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import { axios } from "../../../api/Axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import CommentIcon from "@mui/icons-material/Comment";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import SkeletonLoading from "../../loading/SkeletonLoading";
import Chip from "@mui/material/Chip";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { categoryItems } from "../../../data/Category";
import { Button, Divider, Tooltip, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, IconButton } from "@mui/material";
import { CurrentPage, ForgiveState, BookMarkState, Post } from "../../../types/Types";
import AccountCircle from "@mui/icons-material/AccountCircle";
import dinner from "../../../assets/dinner.jpg";
import { motion } from "framer-motion";

export default function Content() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [currentPage, setCurrentPage] = React.useState<CurrentPage>({ last_page: 1 });
  const [open, setOpen] = React.useState<boolean>(false);
  const [forgiveState, setForgiveState] = React.useState<ForgiveState>({});
  const [bookmark, setBookmark] = React.useState<BookMarkState>({});
  const [userId, setUserId] = React.useState<number>();
  const [total, setTotal] = React.useState<number>();

  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageCount = currentPage.last_page;
  const navigate = useNavigate();
  const processing = React.useRef(false);

  React.useEffect(() => {
    const qpPage = parseInt(searchParams.get("page") || "1", 10);
    const qpCategory = parseInt(searchParams.get("category_id") || "0", 10);
    fetchPost(qpPage, qpCategory);
  }, [searchParams]);

  const fetchPost = async (page: number, categoryId: number) => {
    setLoading(true);
    axios
      .get(`api/posts/myIndex?page=${page}&category_id=${categoryId}`)
      .then((res) => {
        setPosts(res.data.data);
        setCurrentPage(res.data);
        setTotal(res.data.total);

        // 初期の forgiveState を作成し、is_like の状態も含める
        const initialForgiveState: ForgiveState = res.data.data.reduce((acc: ForgiveState, post: Post) => {
          acc[post.id] = {
            forgive: post.is_like || false,
            forgiveCount: post.forgives_count || 0,
          };
          return acc;
        }, {});
        setForgiveState(initialForgiveState);

        // 初期の bookmark を作成し、is_bookmarks の状態も含める
        const initialBookMarkState = res.data.data.reduce((prev: BookMarkState, post: Post) => {
          prev[post.id] = {
            bookmark: post.is_bookmarks || false,
          };
          return prev;
        }, {});
        setBookmark(initialBookMarkState);
      })
      .then((res) => {
        axios.get("api/user").then((res) => {
          setUserId(res.data[0].id);
        });
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

  React.useEffect(() => {
    const savedCategory = localStorage.getItem("selectedCategory");
    if (savedCategory) {
      setSearchParams({ page: "1", category_id: savedCategory });
    }
    return () => {
      localStorage.removeItem("selectedCategory");
    };
  }, []);

  const handleClick = (categoryId: number) => {
    localStorage.setItem("selectedCategory", String(categoryId));
    setSearchParams({ page: "1", category_id: String(categoryId) });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChangePage = (e: React.ChangeEvent<unknown>, page: number) => {
    setSearchParams({ page: String(page), category_id: searchParams.get("category_id") || "0" });
  };

  const toggleForgive = async (postId: number) => {
    if (processing.current) return;

    // 現在の状態を取得
    const currentForgive = forgiveState[postId]?.forgive || false;
    const updatedCount = currentForgive ? forgiveState[postId].forgiveCount - 1 : forgiveState[postId].forgiveCount + 1;

    // 状態を更新
    setForgiveState((prevForgiveState) => ({
      ...prevForgiveState,
      [postId]: { forgive: !currentForgive, forgiveCount: updatedCount },
    }));

    processing.current = true;

    await axios.get(`sanctum/csrf-cookie`).then(() => {
      axios
        .post("api/forgives/toggle", {
          post_id: postId,
          is_forgive: !currentForgive,
        })
        .finally(() => {
          setTimeout(() => (processing.current = false), 200);
        });
    });
  };

  const toggleBookmark = async (postId: number) => {
    const currentBookMark = bookmark[postId]?.bookmark || false;

    // 状態を更新
    setBookmark((prevBookMarkState) => ({
      ...prevBookMarkState,
      [postId]: { bookmark: !currentBookMark },
    }));

    await axios.get(`sanctum/csrf-cookie`).then(() => {
      axios.post("api/bookmarks/toggle", {
        post_id: postId,
        is_bookmarks: !currentBookMark,
      });
    });
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <Box
          mt={5}
          mb={2}
          sx={{
            fontStyle: "italic",
            position: "relative",
            backgroundImage: `url(${dinner})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            color: "#fff",
            padding: "5rem",
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
            initial={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
          >
            <Typography color="error" variant="h5" sx={{ fontFamily: "YuMincho", position: "relative", zIndex: 2 }}>
              みんなの懺悔
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            transition={{ duration: 1 }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontFamily: "cursive",
                mb: 5,
                position: "relative",
                zIndex: 2,
              }}
            >
              Everyone's Confession
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 1.5 }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
          >
            <Typography sx={{ fontFamily: "YuMincho", position: "relative", zIndex: 2 }}>自分が犯した罪や過ちなど、心残りを神の前で告白しませんか？</Typography>
          </motion.div>
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
                      backgroundColor: searchParams.get("category_id") === String(category.id) ? "#1976d2" : "transparent", // 選択時の背景色
                      color: searchParams.get("category_id") === String(category.id) ? "#fff" : "inherit", // 選択時の文字色
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
        <Typography
          variant="h5"
          sx={{
            mt: 5,
            fontFamily: "cursive",
          }}
        >
          {total} Number of Confession
        </Typography>
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
                    <Box sx={{ position: "relative", mb: 3 }}>
                      <Box display="flex" justifyContent="space-between" sx={{ position: "absolute", right: 0 }}>
                        {userId === post.user_id || (
                          <Tooltip title="ブックマーク">
                            <IconButton
                              onClick={() => toggleBookmark(post["id"])}
                              color={bookmark[post["id"]]?.bookmark ? "primary" : "inherit"}
                              component="label"
                              sx={{ mr: 1 }}
                              tabIndex={-1}
                              size="small"
                            >
                              <BookmarkIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Box>
                    </Box>
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
                          {userId === post.user_id ? (
                            <Tooltip title="赦す一覧">
                              <Button
                                onClick={() => navigate(`/myPage/myFulfillment/${post["id"]}`, { state: post })}
                                color={forgiveState[post["id"]]?.forgive ? "primary" : "inherit"}
                                component="label"
                                variant="outlined"
                                sx={{ mr: 1 }}
                                tabIndex={-1}
                                size="small"
                                startIcon={<VolunteerActivismIcon />}
                              >
                                ({forgiveState[post["id"]]?.forgiveCount || 0})
                              </Button>
                            </Tooltip>
                          ) : (
                            <Tooltip title="赦す">
                              <Button
                                onClick={() => toggleForgive(post["id"])}
                                color={forgiveState[post["id"]]?.forgive ? "primary" : "inherit"}
                                component="label"
                                variant="outlined"
                                sx={{ mr: 1 }}
                                tabIndex={-1}
                                size="small"
                                startIcon={<VolunteerActivismIcon />}
                              >
                                ({forgiveState[post["id"]]?.forgiveCount || 0})
                              </Button>
                            </Tooltip>
                          )}

                          <Tooltip title="コメント">
                            <Button
                              onClick={() => navigate(`/myPage/comment/${post["id"]}`, { state: post })}
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
                        <Tooltip title={post["name"]}>
                          <Button
                            onClick={() => navigate(`/myPage/detail/${post["user_id"]}`, { state: post })}
                            color="inherit"
                            sx={{ textTransform: "none", display: "flex", flexDirection: "row", gap: 1, alignItems: "center", fontSize: 20 }}
                            startIcon={
                              post["image"] ? <img src={post["image"]} alt="userIcon" style={{ width: 32, height: 32, borderRadius: "50%" }} /> : <AccountCircle sx={{ width: 32, height: 32 }} />
                            }
                          >
                            {post["name"]}
                          </Button>
                        </Tooltip>
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
