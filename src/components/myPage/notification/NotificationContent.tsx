import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { axios } from "../../../api/Axios";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { Button, Divider, Tooltip } from "@mui/material";
import { Notification } from "../../../types/Types";
import { AccountCircle } from "@mui/icons-material";
import revival from "../../../assets/revival.jpg";
import { motion } from "framer-motion";

export default function HomeCommentContent() {
  const [notifications, setNotifications] = React.useState<Notification[]>([]);

  const navigate = useNavigate();
  React.useEffect(() => {
    fetchNotification();
  }, []);

  const fetchNotification = async () => {
    try {
      const res = await axios.get(`api/notifications`);
      console.log(res);
      const notifications = res.data.map((notification: any) => {
        if (notification.type === "comment") {
          return {
            type: "comment",
            comment_id: notification.comment_id,
            content: notification.post.content,
            id: notification.post.id,
            postName: notification.user.name,
            userImage: notification.image,
            updated_at: notification.user.updated_at,
            category_name: notification.category_name,
            name: notification.userName,
            image: notification.userImage,
          };
        } else if (notification.type === "forgive") {
          return {
            type: "forgive",
            forgive_id: notification.forgive_id,
            content: notification.post.content,
            id: notification.post.id,
            postName: notification.user.name,
            userImage: notification.image,
            updated_at: notification.user.updated_at,
            category_name: notification.category_name,
            name: notification.userName,
            image: notification.userImage,
          };
        }
      });
      console.log(notifications);
      setNotifications(notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const commentNotification = async (post: Notification) => {
    const id = post["comment_id"];
    await axios.post(`api/comments/update/notification/${id}`);
    navigate(`/myPage/comment/${post["id"]}`, { state: post });
  };

  const forgiveNotification = async (post: Notification) => {
    const id = post["forgive_id"];
    await axios.post(`api/forgives/update/notification/${id}`);
    navigate(`/myPage/myFulfillment/${post["id"]}`, { state: post });
  };

  return (
    <>
      <div>
        <Box sx={{ mb: 5, display: "flex", flexDirection: "column", gap: 4 }}>
          <Box
            mt={5}
            mb={8}
            sx={{
              fontStyle: "italic",
              position: "relative",
              backgroundImage: `url(${revival})`,
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
              initial={{ opacity: 0, y: 20 }}
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
                    <Tooltip title={post["postName"]}>
                      <Button
                        onClick={() => navigate(`/myPage/detail/${post["id"]}`, { state: post })}
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
                          post["userImage"] ? <img src={post["userImage"]} alt="userIcon" style={{ width: 32, height: 32, borderRadius: "50%" }} /> : <AccountCircle sx={{ width: 32, height: 32 }} />
                        }
                      >
                        {post["postName"]}
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
                    {post["content"]}
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
                    {post["type"] === "comment" ? (
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
                    {dayjs(post["updated_at"]).format("YYYY年M月D日")}
                  </Typography>
                  <Divider />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </>
  );
}
