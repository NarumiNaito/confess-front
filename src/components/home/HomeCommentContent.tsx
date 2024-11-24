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
import { Button, Divider, Tooltip } from "@mui/material";
import { Comment, CurrentPage } from "../../types/Types";
import { AccountCircle } from "@mui/icons-material";

export default function HomeCommentContent(props: any) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [comments, setComments] = React.useState<Comment[]>([]);
  const [currentPage, setCurrentPage] = React.useState<CurrentPage>({ last_page: 1 });

  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageCount = currentPage.last_page;
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;

  React.useEffect(() => {
    const qpPage = parseInt(searchParams.get("page") || "1", 10);
    fetchComment(qpPage);
  }, [searchParams]);

  const fetchComment = async (page: number) => {
    axios
      .get(`api/comments/show/${id}?page=${page}`)
      .then((res) => {
        console.log(res.data.data);
        setComments(res.data.data);
        setCurrentPage(res.data);
      })
      .catch((res) => {
        if (res.status === 401) {
          return;
        }
      });
  };

  const handleChangePage = (e: React.ChangeEvent<unknown>, page: number) => {
    navigate(`/comment/${id}?page=${page}`, { state: props.state });
  };

  return (
    <>
      <div>
        <Box sx={{ flexGrow: 1, variant: "outlined", overflow: "hidden", margin: "0 auto", display: "flex", justifyContent: "center", px: 3 }}>
          <Grid sx={{ width: 800 }}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <Box mb={2}>
                  <Typography variant="h5">迷える子羊への助言</Typography>
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
                    <Tooltip title={props.state.name}>
                      <AvatarGroup max={3}>
                        <Avatar src={props.state.image} sx={{ width: 24, height: 24 }} />
                      </AvatarGroup>
                    </Tooltip>
                    <Typography variant="subtitle1">{props.state.name}</Typography>
                  </Box>

                  <Typography variant="subtitle1">{dayjs(props.state.updated_at).format("YYYY年M月D日")}</Typography>
                </Box>
                <Divider />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
      <Box mt={2} mb={2}>
        <Divider />
      </Box>
      <div>
        <Box sx={{ flexGrow: 1, overflow: "hidden", margin: "0 auto", display: "flex", justifyContent: "center", px: 3 }}>
          <Grid sx={{ width: 800 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <Box mb={5}>
                <Typography variant="h5">コメント一覧</Typography>
              </Box>
            </Box>
            {comments.map((comment, id) => (
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
                    {comment["content"]}
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
                    <Tooltip title={comment["name"]}>
                      <Button
                        onClick={() => navigate(`/detail/${comment["user_id"]}`, { state: comment })}
                        color="inherit"
                        sx={{ textTransform: "none", display: "flex", flexDirection: "row", gap: 1, alignItems: "center", fontSize: 20 }}
                        startIcon={
                          comment["image"] ? <img src={comment["image"]} alt="userIcon" style={{ width: 32, height: 32, borderRadius: "50%" }} /> : <AccountCircle sx={{ width: 32, height: 32 }} />
                        }
                      >
                        {comment["name"]}
                      </Button>
                    </Tooltip>
                    <Typography variant="subtitle1">{dayjs(comment["created_at"]).format("YYYY年M月D日")}</Typography>
                  </Box>
                  <Divider />
                </Box>
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
