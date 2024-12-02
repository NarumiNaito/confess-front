import * as React from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import { axios } from "../../../api/Axios";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import CommentIcon from "@mui/icons-material/Comment";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import SkeletonLoading from "../../loading/SkeletonLoading";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Button, Divider, Tooltip, IconButton } from "@mui/material";
import { BookMarkState, CurrentPage, ForgiveState, Post } from "../../../types/Types";
import maria from "../../../assets/maria.png";
import { motion } from "framer-motion";

export default function DetailContent() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [currentPage, setCurrentPage] = React.useState<CurrentPage>({ last_page: 1 });
  const [forgiveState, setForgiveState] = React.useState<ForgiveState>({});
  const [bookmark, setBookmark] = React.useState<BookMarkState>({});
  const [userId, setUserId] = React.useState<number>();

  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageCount = currentPage.last_page;
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const id = params.id;
  const processing = React.useRef(false);

  React.useEffect(() => {
    const qpPage = parseInt(searchParams.get("page") || "1", 10);
    fetchPost(qpPage);
  }, [searchParams]);

  const fetchPost = async (page: number) => {
    setLoading(true);
    axios
      .get(`api/posts/userIndex/${id}?page=${page}`)
      .then((res) => {
        setPosts(res.data.data);
        setCurrentPage(res.data);

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

  const handleChangePage = (e: React.ChangeEvent<unknown>, page: number) => {
    navigate(`/myPage/detail/${id}?page=${page}`, { state: location.state });
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

    // API 呼び出し
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
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
        >
          <Box
            mt={5}
            sx={{
              fontStyle: "italic",
              position: "relative",
              backgroundImage: `url(${maria})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              color: "#fff",
              padding: "3rem",
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
              transition={{ duration: 1 }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
            >
              <Typography variant="h4" sx={{ fontFamily: "cursive", position: "relative", zIndex: 2 }}>
                confession Room
              </Typography>
            </motion.div>
          </Box>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 1 }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
        >
          <Box mt={3} sx={{ zIndex: 2, justifyContent: "center", display: "flex", gap: 1, alignItems: "center" }}>
            <AvatarGroup max={3} sx={{ zIndex: 2 }}>
              <Avatar
                src={location.state.image}
                sx={{
                  width: 48,
                  height: 48,
                  zIndex: 2,
                }}
              />
            </AvatarGroup>
            <Typography color="error" variant="h5" sx={{ fontFamily: "YuMincho", position: "relative", zIndex: 2 }}>
              {location.state.name}の懺悔室
            </Typography>
          </Box>
        </motion.div>
      </Box>

      <Box mt={3} mb={2}>
        <Divider />
      </Box>
      <Typography variant="h5">懺悔一覧</Typography>
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
                        <Box sx={{ display: "flex", flexDirection: "row", gap: 1, alignItems: "center" }}></Box>
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
