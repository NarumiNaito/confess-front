import { Box, Container, Fab, FormControl, FormLabel, TextField, Tooltip } from "@mui/material";
import Header from "../../../components/header/Header";
import CommentContent from "../../../components/myPage/comment/CommentContent";
import { useLocation, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { SiteMarkIcon } from "../../../components/CustomIcons";
import { IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/GitHub";
import { Link } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Controller, useForm } from "react-hook-form";
import { axios } from "../../../api/Axios";
import { myFooterItems } from "../../../data/NavItems";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Comment() {
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (data: any) => {
    const comments = {
      content: data.content,
      post_id: location.state.id,
    };
    await axios
      .get(`sanctum/csrf-cookie`)
      .then((res) => {
        axios.post(`api/comments/register`, comments);
      })
      .then((res) => {
        reset();
        setOpen(false);
        navigate(`/myPage/comment/${location.state.id}`, { state: location.state });
      });
  };
  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header />
        <Container maxWidth="lg" component="main" sx={{ display: "flex", flexDirection: "column", my: 7, gap: 4 }}>
          <CommentContent {...location} />
        </Container>
        <Box component="footer" sx={{ mt: "auto", width: "100%" }}>
          <AppBar position="sticky">
            <Container sx={{ Bottom: 0, padding: 2, mt: 1 }}>
              <Box>
                <Box sx={{ display: { sm: "block" } }} justifyContent={"center"}>
                  {myFooterItems.map((item, id) => (
                    <Button onClick={() => navigate(item.path)} color="inherit" key={id} sx={{ textAlign: "white" }}>
                      {item.name}
                    </Button>
                  ))}
                  <Button href="mailto:confess-customer-contact@gmail.com" color="inherit">
                    お問合せ
                  </Button>
                </Box>
                <Link to="/myPage">
                  <SiteMarkIcon />
                </Link>
                <Typography>
                  ©since 2024 懺悔の館
                  <IconButton color="inherit" size="large" href="https://github.com/NarumiNaito/confess-front" aria-label="LinkedIn" sx={{ alignSelf: "center" }}>
                    <FacebookIcon />
                  </IconButton>
                </Typography>
              </Box>
            </Container>

            <Fab
              color="primary"
              aria-label="edit"
              onClick={handleClickOpen}
              sx={{
                position: "fixed",
                bottom: 20,
                right: 20,
                zIndex: 1000,
              }}
            >
              <Tooltip title="コメントする">
                <EditIcon />
              </Tooltip>
            </Fab>
            <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleClose} aria-describedby="alert-dialog-slide-description">
              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: { xs: "100%", sm: 500 },
                  margin: "auto",
                  p: 1,
                }}
              >
                <DialogTitle color="error">{"救いの言葉を送ろう"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    <FormControl fullWidth>
                      <Box sx={{ display: "flex" }}>
                        <FormLabel htmlFor="content">内容</FormLabel>
                      </Box>
                      <Controller
                        control={control}
                        name="content"
                        defaultValue={""}
                        rules={{
                          required: { value: true, message: "コメントの内容を入力して下さい" },
                        }}
                        render={({ field, fieldState: { error } }) => (
                          <TextField
                            placeholder="コメントを入力して下さい"
                            type="text"
                            id="content"
                            autoComplete="content"
                            autoFocus
                            required
                            fullWidth
                            variant="outlined"
                            multiline
                            rows={8}
                            {...field}
                            error={!!error?.message}
                            helperText={error?.message}
                          />
                        )}
                      />
                    </FormControl>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button color="inherit" onClick={handleClose}>
                    戻る
                  </Button>
                  <Button type="submit" onClick={handleClose}>
                    コメント
                  </Button>
                </DialogActions>
              </Box>
            </Dialog>
          </AppBar>
        </Box>
      </Box>
    </>
  );
}
export default Comment;
