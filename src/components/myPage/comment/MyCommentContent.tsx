import * as React from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import { axios } from "../../../api/Axios";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import { Button, Divider, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

// const commonStyles = {
//   bgcolor: "#212121",
//   px: 2,
//   border: 0.1,
// };

export default function CommentContent(props: any) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [comments, setComments] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState({ last_page: 1 });

  console.log(props);
  console.log(comments);

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
      .get(`api/comments/index/${id}?page=${page}`)
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
    navigate(`/myPage/comment/${id}?page=${page}`, { state: props.state });
  };

  const deleteComment = async (comment: any) => {
    await axios.delete(`api/comments/delete`, { data: comment }).then((res) => {
      navigate(`/myPage/comment/${comment.post_id}`, { state: props.state });
    });
  };

  return (
    <>
      <div>
        <Box sx={{ flexGrow: 1, variant: "outlined", overflow: "hidden", margin: "0 auto", display: "flex", justifyContent: "center", px: 3 }}>
          <Grid sx={{ width: 800 }}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <Box mb={2}>
                  <Typography variant="h5">神からの助言</Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: 1,
                  height: "100%",
                  // ...commonStyles,
                  // borderRadius: 1,
                  // borderColor: "grey.500",
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
                  <Box sx={{ display: "flex", flexDirection: "row", gap: 1, alignItems: "center" }}></Box>
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
                    // ...commonStyles,
                    // borderRadius: 1,
                    // borderColor: "grey.500",
                  }}
                >
                  <Typography m={1} whiteSpace={"pre-line"} variant="h6">
                    {comment["content"]}
                  </Typography>

                  <Box sx={{ position: "relative", mb: 3 }}>
                    <Box display="flex" justifyContent="space-between" sx={{ position: "absolute", right: 0 }}>
                      <Tooltip title="削除">
                        <Button onClick={() => deleteComment(comment)} component="label" variant="outlined" color="error" tabIndex={-1} size="small" startIcon={<DeleteIcon />}>
                          削除
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
                      <Tooltip title={comment["name"]}>
                        <AvatarGroup max={3}>
                          <Avatar src={comment["image"]} sx={{ width: 24, height: 24 }} />
                        </AvatarGroup>
                      </Tooltip>
                      <Typography variant="subtitle1">{comment["name"]}</Typography>
                    </Box>

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
