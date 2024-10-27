import * as React from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import { axios } from "../../../api/Axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import CommentIcon from "@mui/icons-material/Comment";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import EditIcon from "@mui/icons-material/Edit";
import SkeletonLoading from "../../loading/SkeletonLoading";
import Chip from "@mui/material/Chip";
import { categoryItems } from "../../../data/Category";
import { Button, Divider, Tooltip, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, IconButton } from "@mui/material";

export default function Content() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState({ last_page: 1 });

  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageCount = currentPage.last_page;
  const navigate = useNavigate();

  React.useEffect(() => {
    const qpPage = parseInt(searchParams.get("page") || "1", 10);
    fetchPost(qpPage);
  }, [searchParams]);

  const fetchPost = async (page: number) => {
    axios.get(`api/posts/show?page=${page}`).then((res) => {
      console.log(res);
      setPosts(res.data.data);
      setCurrentPage(res.data);
    });
  };

  const handleChangePage = (e: React.ChangeEvent<unknown>, page: number) => {
    console.log(page);
    setSearchParams({ page: String(page) });
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <Box mb={2}>
          <Typography variant="h5" mb={3}>
            貴方の懺悔履歴
          </Typography>
          <Typography>過去を振り返るの者は赦しへの第一歩となる。</Typography>
        </Box>
      </Box>

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
                      <Tooltip title="コメントを見る">
                        <IconButton component="label" sx={{ color: "#fff", mr: 2 }} tabIndex={-1} size="small" onClick={() => navigate(`/myPage/myComment/${post["id"]}`, { state: post })}>
                          <CommentIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="編集する">
                        <IconButton component="label" sx={{ color: "#fff" }} tabIndex={-1} size="small" onClick={() => navigate(`/myPage/postList/${post["id"]}`, { state: post })}>
                          <EditIcon />
                        </IconButton>
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
                      <Tooltip title="赦された数">
                        <Button component="label" sx={{ color: "#fff", mr: 1 }} tabIndex={-1} size="small" startIcon={<VolunteerActivismIcon />}>
                          (0)件成就
                        </Button>
                      </Tooltip>
                    </Box>
                    <Typography variant="subtitle2">{dayjs(post["created_at"]).format("YYYY年M月D日")}</Typography>
                  </Box>
                </Box>
                <Divider />
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>

      <Box sx={{ display: "flex", flexDirection: "row", pt: 4 }} justifyContent={"center"}>
        <Pagination hidePrevButton hideNextButton page={page} onChange={handleChangePage} count={pageCount} boundaryCount={1} />
      </Box>
    </>
  );
}
