import * as React from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import { axios } from "../../api/Axios";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import EditIcon from "@mui/icons-material/Edit";
import CommentIcon from "@mui/icons-material/Comment";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import SkeletonLoading from "../loading/SkeletonLoading";
import Chip from "@mui/material/Chip";
import { categoryItems } from "../../data/Category";
import { Button, Divider, Tooltip, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Fab } from "@mui/material";
import { useForm } from "react-hook-form";

const commonStyles = {
  bgcolor: "dark",
  borderColor: "text.primary",
  p: 2,
  border: 0.1,
};

export default function Content(props: any) {
  console.log(props);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = React.useState(false);
  const [posts, setPosts] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState({ last_page: 1 });
  const [open, setOpen] = React.useState(false);

  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageCount = currentPage.last_page;
  const navigate = useNavigate();
  const params = useParams();
  console.log(params);
  const id = params.id;

  React.useEffect(() => {
    const qpPage = parseInt(searchParams.get("page") || "1", 10);
    fetchComment(qpPage);
  }, [searchParams]);

  // const id = props.state.id;
  // console.log(id);
  const fetchComment = async (page: number) => {
    setLoading(true);
    axios
      .get(`api/comments/index/${id}?page=${page}`)
      .then((res) => {
        console.log(res.data);
        setPosts(res.data.data);
        setCurrentPage(res.data);
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

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChangePage = (e: React.ChangeEvent<unknown>, page: number) => {
    console.log(page);
    navigate(`/myPage/comment/${id}?page=${page}`, { state: props.state });
    // setSearchParams({ page: String(page) });
  };

  return (
    <>
      <div>
        <Box sx={{ flexGrow: 1, variant: "outlined", overflow: "hidden", margin: "0 auto", display: "flex", justifyContent: "center", px: 3 }}>
          <Grid sx={{ width: 800 }}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <Box mb={2}>
                  <Typography variant="h5">神からの助言に耳を傾けよ</Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: 1,
                  height: "100%",
                  ...commonStyles,
                  borderRadius: 1,
                }}
              >
                <Typography mt={3} variant="h6" component="div" color="error">
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
                    <Tooltip title={props.state.name}>
                      <AvatarGroup max={3}>
                        <Avatar src={props.state.image} sx={{ width: 24, height: 24 }} />
                      </AvatarGroup>
                    </Tooltip>
                    <Typography variant="subtitle1">{props.state.name}</Typography>
                  </Box>

                  <Typography variant="subtitle1">{dayjs(props.state.updated_at).format("YYYY年M月D日")}</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>

      <div>
        <Box sx={{ flexGrow: 1, overflow: "hidden", margin: "0 auto", display: "flex", justifyContent: "center", px: 3 }}>
          <Grid sx={{ width: 800 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <Box mb={2}>
                <Typography variant="h5">コメント一覧</Typography>
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
                  }}
                >
                  <Typography mt={3} variant="h6" component="div" color="error">
                    「{post["category_name"]}」
                  </Typography>

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
                    <Box sx={{ display: "flex", flexDirection: "row", gap: 1, alignItems: "center" }}>
                      <Tooltip title={post["name"]}>
                        <AvatarGroup max={3}>
                          <Avatar src={post["image"]} sx={{ width: 24, height: 24 }} />
                        </AvatarGroup>
                      </Tooltip>
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

      <Box sx={{ display: "flex", flexDirection: "row", pt: 4 }} justifyContent={"center"}>
        <Pagination hidePrevButton hideNextButton page={page} onChange={handleChangePage} count={pageCount} boundaryCount={1} />
      </Box>
    </>
  );
}
