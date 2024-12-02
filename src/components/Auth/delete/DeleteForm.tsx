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
import { useNavigate, useParams } from "react-router-dom";
import { axios } from "../../../api/Axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, FormGroup, FormHelperText, InputAdornment } from "@mui/material";
import Loading from "../../loading/Loading";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import { useAuthContext } from "../../../router/useAuthContext";
import { InputsDelete } from "../../../types/Types";

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

export default function DeleteForm(props: { disableCustomTheme?: boolean }) {
  const { logout } = useAuthContext();
  const params = useParams();

  const { control, handleSubmit, getValues } = useForm({
    defaultValues: {
      id: params.id,
      email: "",
      password: "",
      reenter: "",
      check: false,
    },
  });

  const [password, setPassword] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const togglePassword = () => {
    setPassword(!password);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<InputsDelete> = async (data) => {
    const requestUser = {
      id: params.id,
      email: data.email,
      password: data.password,
    };

    await axios.get(`sanctum/csrf-cookie`).then((response) => {
      setLoading(true);
      setOpen(false);
      axios
        .delete(`api/user/delete`, { data: requestUser })
        .then((res) => {
          navigate("/");
          logout();
        })
        .catch((res) => {
          if (res.status === 404) {
            setEmailError(true);
            return;
          }

          if (res.status === 405) {
            setPasswordError(true);
          }
        })
        .then(() => {
          setTimeout(() => setLoading(false), 2000);
        });
    });
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <LoginContainer direction="column" justifyContent="space-between" sx={{ flexGrow: 1 }}>
            <Card variant="outlined" sx={{ mb: 5, bgcolor: "rgba(255, 255, 255, 0.12)" }}>
              <Typography color="error" component="h3" variant="h3" sx={{ fontFamily: "cursive", width: "100%", mt: 3 }}>
                AccountDelete
              </Typography>
              <Typography color="error" variant="overline">
                {emailError && "メールアドレスが一致しません。もう一度お試し下さい。"}
              </Typography>
              <Typography color="error" variant="overline">
                {passwordError && "パスワードが一致しません。もう一度お試し下さい。"}
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
                    <FormLabel htmlFor="email">メールアドレス</FormLabel>
                  </Box>
                  <Controller
                    control={control}
                    name="email"
                    defaultValue={""}
                    rules={{
                      required: { value: true, message: "メールアドレスを入力して下さい" },
                      pattern: { value: /^[a-z\d][\w.-]*@[\w.-]+\.[a-z\d]+$/i, message: "メールアドレスを正しく入力して下さい" },
                    }}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        id="email"
                        type="email"
                        placeholder="メールアドレスを入力して下さい"
                        autoComplete="email"
                        autoFocus
                        required
                        fullWidth
                        variant="outlined"
                        sx={{ ariaLabel: "email" }}
                        {...field}
                        error={!!error?.message}
                        helperText={error?.message}
                      />
                    )}
                  />
                </FormControl>
                <FormControl sx={{ mb: 2 }}>
                  <Box sx={{ display: "flex" }}>
                    <FormLabel htmlFor="password">パスワード</FormLabel>
                    <InputAdornment position="end">
                      {password ? (
                        <VisibilityOffIcon
                          onClick={togglePassword}
                          className="Password__visual"
                          sx={{
                            ":hover": {
                              cursor: "default",
                            },
                          }}
                        />
                      ) : (
                        <VisibilityIcon
                          onClick={togglePassword}
                          className="Password__visual"
                          sx={{
                            ":hover": {
                              cursor: "default",
                            },
                          }}
                        />
                      )}
                    </InputAdornment>
                  </Box>
                  <Controller
                    control={control}
                    name="password"
                    defaultValue={""}
                    rules={{
                      required: { value: true, message: "パスワードを入力して下さい" },
                      minLength: { value: 7, message: "8文字以上で入力してください" },
                      maxLength: { value: 20, message: "20文字以内で入力してください" },
                      pattern: { value: /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,20}$/i, message: "パスワードは英数文字で8文字以上、20文字以内で入力して下さい" },
                    }}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        id="password"
                        type={password ? "text" : "password"}
                        placeholder="パスワードを入力して下さい"
                        autoComplete="current-password"
                        autoFocus
                        fullWidth
                        variant="outlined"
                        {...field}
                        error={!!error?.message}
                        helperText={error?.message}
                      />
                    )}
                  />
                </FormControl>
                <FormControl sx={{ mb: 2 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <FormLabel htmlFor="reenter">パスワードを再入力</FormLabel>
                  </Box>
                  <Controller
                    control={control}
                    name="reenter"
                    defaultValue={""}
                    rules={{
                      required: { value: true, message: "パスワードを入力して下さい" },
                      minLength: { value: 7, message: "8文字以上で入力してください" },
                      maxLength: { value: 20, message: "20文字以内で入力してください" },
                      pattern: { value: /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,20}$/i, message: "パスワードは英数文字で8文字以上、20文字以内で入力して下さい" },
                      validate: { value: (value) => value === getValues("password") || "パスワードが一致しません。もう一度入力してください。" },
                    }}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        id="reenter"
                        type={password ? "text" : "password"}
                        placeholder="確認のためパスワードを再入力して下さい"
                        autoComplete="reenter"
                        autoFocus
                        fullWidth
                        variant="outlined"
                        {...field}
                        error={!!error?.message}
                        helperText={error?.message}
                      />
                    )}
                  />
                </FormControl>
                <Divider sx={{ mt: 2, mb: 3 }} />
                <Button onClick={handleClickOpen} color="error" fullWidth variant="contained">
                  削除
                </Button>
                <>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    disableEnforceFocus={false} // Keeps focus trap active
                    disablePortal={false} // Ensures dialog is rendered in a separate layer
                  >
                    <DialogTitle sx={{ mt: 2 }} id="alert-dialog-title" color="error">
                      {"アカウントを削除しますか？"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        一度削除すると利用者に紐づく情報も削除され復元することができません。
                        <br />
                        本当にアカウントを削除してもよろしいですか？
                      </DialogContentText>
                      <Box sx={{ display: "flex", alignItems: "center", mt: 2, mb: -2 }}>
                        <Controller
                          control={control}
                          name="check"
                          defaultValue={false}
                          rules={{
                            required: { value: true, message: "チェックを入れてください。" },
                          }}
                          render={({ field, formState: { errors } }) => (
                            <FormGroup {...field}>
                              <FormControlLabel control={<Checkbox name="check" />} label="はい" value={field.value} />
                              <FormHelperText sx={{ color: "error.main" }}>{errors.check?.message || ""}</FormHelperText>
                            </FormGroup>
                          )}
                        />
                      </Box>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>戻る</Button>
                      <Button color="error" onClick={handleSubmit(onSubmit)}>
                        削除する
                      </Button>
                    </DialogActions>
                  </Dialog>
                </>

                <Button sx={{ mt: 3, mb: 3 }} variant="contained" onClick={() => navigate(-1)}>
                  戻る
                </Button>
              </Box>
            </Card>
          </LoginContainer>
          <Box component="footer" sx={{ mt: "auto", width: "100%" }}>
            <Footer />
          </Box>
        </>
      )}
    </>
  );
}
