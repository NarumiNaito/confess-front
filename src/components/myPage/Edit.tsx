import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { axios } from "../../api/Axios";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputLabel, MenuItem, Select, Slide } from "@mui/material";
import { categoryItems } from "../../data/Category";
import { TransitionProps } from "@mui/material/transitions";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
}));

const LoginContainer = styled(Stack)(({ theme }) => ({
  padding: 20,
  marginTop: "10vh",
  marginBottom: "5vh",
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
  },
}));

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface INPUTS {
  category_id: string;
  content: string;
}

export default function Edit(props: { disableCustomTheme?: boolean }) {
  const location = useLocation();
  console.log(location);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      category_id: location.state.category_id,
      content: location.state.content,
    },
  });

  const [open, setOpen] = React.useState(false);
  const [dialog, setDialog] = React.useState(false);
  const [authError, setAuthError] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<INPUTS> = async (data) => {
    const Posts = {
      id: location.state.id,
      category_id: data.category_id,
      content: data.content,
    };
    // console.log(Posts);

    await axios
      .get(`sanctum/csrf-cookie`)
      .then((response) => {
        axios.post(`api/posts/update`, Posts);
      })
      .then((res) => {
        navigate("/myPage/postList");
      })
      .catch((res) => {
        if (res.status === 401) {
          setAuthError(true);
          return;
        }
      });
  };

  const Posts = {
    id: location.state.id,
  };

  const deletePost = async (Posts: any) => {
    console.log(Posts);
    await axios
      .delete(`api/posts/delete`, { data: Posts })

      .then((res) => {
        navigate("/myPage/postList");
      })
      .catch((res) => {
        if (res.status === 401) {
          setAuthError(true);
          return;
        }
      });
  };

  const handleClickOpen = () => {
    setDialog(true);
  };

  const handleClickClose = () => {
    setDialog(false);
  };

  const getCategories = () => {
    return categoryItems.filter((category) => category.id !== 0);
  };

  return (
    <>
      <LoginContainer direction="column" justifyContent="space-between" sx={{ flexGrow: 1 }}>
        <Card variant="outlined">
          <Typography color="error" component="h4" variant="h4" sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)", mt: 4 }}>
            懺悔を編集
          </Typography>
          <Typography color="error" variant="overline">
            {authError && "更新対象の懺悔が存在しません。"}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormControl sx={{ mb: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Controller
                  control={control}
                  name="category_id"
                  defaultValue={""}
                  rules={{
                    required: { value: true, message: "カテゴリーを選択して下さい" },
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <Box sx={{}}>
                      <Button sx={{ mr: 6 }} color="error" onClick={handleOpen}>
                        カテゴリー選択
                      </Button>
                      <Box>
                        <FormControl sx={{ minWidth: 150 }} size="small">
                          <InputLabel id="demo-select-small-label">カテゴリー</InputLabel>
                          <Select
                            {...field}
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            open={open}
                            onClose={handleClose}
                            onOpen={handleOpen}
                            value={field.value}
                            label="カテゴリー"
                            onChange={(e) => field.onChange(e.target.value)}
                          >
                            {getCategories().map((category, id) => (
                              <MenuItem key={id} value={category.id}>
                                {category.category_name}
                              </MenuItem>
                            ))}
                          </Select>
                          {error && (
                            <Typography variant="caption" color="error">
                              {error.message}
                            </Typography>
                          )}
                        </FormControl>
                      </Box>
                    </Box>
                  )}
                />
              </Box>
            </FormControl>
            <FormControl>
              <Box sx={{ display: "flex" }}>
                <FormLabel htmlFor="content">懺悔の内容</FormLabel>
              </Box>
              <Controller
                control={control}
                name="content"
                defaultValue={""}
                rules={{
                  required: { value: true, message: "懺悔の内容を入力して下さい" },
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    sx={{ whiteSpace: "pre-line" }}
                    placeholder="懺悔の内容を入力して下さい"
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

            <Divider />
            <Typography color="error" variant="subtitle1">
              過去に犯した過ちを神の前で告白し,
              <br />
              赦しを請うため懺悔しますか？
            </Typography>
            <Button type="submit" fullWidth variant="contained">
              懺悔する
            </Button>
            <Divider />
            <Typography color="error" variant="subtitle1">
              悔い改めたため削除しますか？
            </Typography>
          </Box>
          <Button color="error" fullWidth variant="contained" onClick={handleClickOpen}>
            削除する
          </Button>
          <Dialog open={dialog} TransitionComponent={Transition} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title" color="error">
              {"この懺悔を削除しますか?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                一度削除した内容は復元することができません。
                <br />
                本当に削除しますか？
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClickClose}>戻る</Button>
              <Button color="error" onClick={() => deletePost(Posts)} autoFocus>
                削除
              </Button>
            </DialogActions>
          </Dialog>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}></Box>
        </Card>
      </LoginContainer>
      <Box component="footer" sx={{ mt: "auto", width: "100%" }}></Box>
    </>
  );
}
