import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { axios } from "../../../api/Axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import { Button, Divider, Pagination, Tooltip } from "@mui/material";
import { CurrentPage } from "../../../types/Types";
import { AccountCircle } from "@mui/icons-material";
import angel from "../../../assets/angel.jpg";
import { motion } from "framer-motion";

export default function HomeCommentContent() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notifications, setNotifications] = React.useState<any[]>([]);
  const [currentPage, setCurrentPage] = React.useState<CurrentPage>({ last_page: 1 });

  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageCount = currentPage.last_page;

  React.useEffect(() => {
    const qpPage = parseInt(searchParams.get("page") || "1", 10);
    fetchNotification(qpPage);
  }, [searchParams]);

  const navigate = useNavigate();

  const fetchNotification = async (page: number) => {
    try {
      const res = await axios.get(`api/notifications?page=${page}`);
      console.log(res.data.data);
      const notifications = res.data.data;
      console.log(notifications);
      setNotifications(notifications);
      setCurrentPage(res.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const commentNotification = async (post: any) => {
    const id = post.comment_id;
    const data = {
      id: post.post.id,
      content: post.post.content,
      image: post.image,
      name: post.post.user.name,
      category_name: post.post.category.category_name,
    };
    await axios.post(`api/comments/update/notification/${id}`);
    navigate(`/myPage/comment/${post.post.id}`, { state: data });
  };

  const forgiveNotification = async (post: any) => {
    const id = post.forgive_id;
    const data = {
      id: post.user.id,
      content: post.post.content,
      image: post.image,
      name: post.post.user.name,
      category_name: post.post.category.category_name,
    };
    await axios.post(`api/forgives/update/notification/${id}`);
    navigate(`/myPage/myFulfillment/${post.post.id}`, { state: data });
  };

  const handleChangePage = (e: React.ChangeEvent<unknown>, page: number) => {
    // console.log(page);
    setSearchParams({ page: String(page) });
  };

  return (
    <>
      <div>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Box
            mt={5}
            mb={8}
            sx={{
              fontStyle: "italic",
              position: "relative",
              backgroundImage: `url(${angel})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              color: "#fff",
              padding: "6rem",
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
                神より通知一覧
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
                Notification List
              </Typography>
            </motion.div>
          </Box>
        </Box>
      </div>

      <div>
        <Box sx={{ flexGrow: 1, overflow: "hidden", margin: "0 auto", display: "flex", justifyContent: "center", px: 3 }}>
          <Grid sx={{ width: 800 }}>
            {notifications.map((post) => (
              <Grid key={post.id} xs={12} sm={6}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Tooltip title={post.user.name}>
                      <Button
                        onClick={() =>
                          navigate(`/myPage/detail/${post.user.id}`, {
                            state: {
                              name: post.user.name,
                              image: post.userImage,
                            },
                          })
                        }
                        color="inherit"
                        sx={{
                          textTransform: "none",
                          display: "flex",
                          flexDirection: "row",
                          gap: 1,
                          alignItems: "center",
                          fontSize: 20,
                        }}
                        startIcon={
                          post.userImage ? <img src={post.userImage} alt="userIcon" style={{ width: 32, height: 32, borderRadius: "50%" }} /> : <AccountCircle sx={{ width: 32, height: 32 }} />
                        }
                      >
                        {post.user.name}
                      </Button>
                    </Tooltip>
                    <Typography variant="subtitle1">より下記懺悔に対して</Typography>
                  </Box>
                </Box>
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
                    {post.post.content}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "row",
                      gap: 2,
                    }}
                  >
                    {post.type === "comment" ? (
                      <>
                        <Button
                          onClick={() => {
                            commentNotification(post);
                          }}
                          color="inherit"
                          sx={{
                            textTransform: "none",
                            display: "flex",
                            flexDirection: "row",
                            gap: 1,
                            alignItems: "center",
                            fontSize: 20,
                          }}
                        >
                          コメント
                        </Button>
                        <Typography variant="subtitle1">をいただきました</Typography>
                      </>
                    ) : (
                      <>
                        <Button
                          onClick={() => forgiveNotification(post)}
                          color="inherit"
                          sx={{
                            textTransform: "none",
                            display: "flex",
                            flexDirection: "row",
                            gap: 1,
                            alignItems: "center",
                            fontSize: 20,
                          }}
                        >
                          赦す
                        </Button>
                        <Typography variant="subtitle1">をいただきました</Typography>
                      </>
                    )}
                  </Box>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      marginLeft: "auto",
                    }}
                  >
                    {dayjs(post.user.updated_at).format("YYYY年M月D日")}
                  </Typography>
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
