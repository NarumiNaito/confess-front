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
import Chip from "@mui/material/Chip";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { categoryItems } from "../../../data/Category";
import { Button, Divider, Tooltip, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, IconButton } from "@mui/material";
import { BookMarkState, CurrentPage, ForgiveState, Post } from "../../../types/Types";

// interface CurrentPage {
//   last_page: number;
// }

export default function DetailContent() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [currentPage, setCurrentPage] = React.useState<CurrentPage>({ last_page: 1 });
  const [forgiveState, setForgiveState] = React.useState<ForgiveState>({});
  const [bookmark, setBookmark] = React.useState<BookMarkState>({});

  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageCount = currentPage.last_page;
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const id = params.id;

  console.log(location);

  React.useEffect(() => {
    const qpPage = parseInt(searchParams.get("page") || "1", 10);
    fetchPost(qpPage);
  }, [searchParams]);

  const fetchPost = async (page: number) => {
    setLoading(true);
    axios
      .get(`api/posts/userIndex/${id}?page=${page}`)
      .then((res) => {
        console.log(res.data.data);
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

  // toggleForgive 関数の修正
  const toggleForgive = async (postId: number) => {
    // 現在の状態を取得
    const currentForgive = forgiveState[postId]?.forgive || false;
    const updatedCount = currentForgive ? forgiveState[postId].forgiveCount - 1 : forgiveState[postId].forgiveCount + 1;

    // 状態を更新
    setForgiveState((prevForgiveState) => ({
      ...prevForgiveState,
      [postId]: { forgive: !currentForgive, forgiveCount: updatedCount },
    }));

    await axios.get(`sanctum/csrf-cookie`).then(() => {
      axios.post("api/forgives/toggle", {
        post_id: postId,
        is_forgive: !currentForgive,
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
        <Box mt={2} sx={{ justifyContent: "center", display: "flex", gap: 1, alignItems: "center" }}>
          <Tooltip title={location.state.name}>
            <AvatarGroup max={3}>
              <Avatar src={location.state.image} sx={{ width: 36, height: 36 }} />
            </AvatarGroup>
          </Tooltip>
          <Typography variant="h5">{location.state.name}のページ</Typography>
        </Box>
      </Box>

      <Box mt={2} mb={2}>
        <Divider />
      </Box>
      <Typography variant="h5">投稿一覧</Typography>
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