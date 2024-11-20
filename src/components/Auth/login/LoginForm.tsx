import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import ForgotPassword from "../login/ForgotPassword";
import { GoogleIcon } from "../../CustomIcons";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { axios } from "../../../api/Axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { InputAdornment } from "@mui/material";
import Loading from "../../loading/Loading";
import Header from "../../header/AuthHeader";
import AuthFooter from "../../footer/AuthFooter";
import { useAuthContext } from "../../../router/useAuthContext";
import { InputsLogin } from "../../../types/Types";

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

export default function LoginForm(props: { disableCustomTheme?: boolean }) {
  const { login } = useAuthContext();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [open, setOpen] = React.useState(false);
  const [password, setPassword] = React.useState(false);
  const [authError, setAuthError] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

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

  const onSubmit: SubmitHandler<InputsLogin> = async (data) => {
    const requestUser = {
      email: data.email,
      password: data.password,
    };

    await axios.get(`sanctum/csrf-cookie`).then((response) => {
      setLoading(true);
      axios
        .post(`api/login`, requestUser)
        .then((res) => {
          navigate("/myPage");
        })
        .catch((res) => {
          if (res.status === 401) {
            setAuthError(true);
            return;
          }

          if (res.status === 422) {
            setIsError(true);
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
            <Card variant="outlined" sx={{ bgcolor: "rgba(255, 255, 255, 0.12)" }}>
              <Typography color="error" component="h4" variant="h4" sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)", mt: 3 }}>
                ログイン
              </Typography>
              <Typography color="error" variant="overline">
                {authError && "ログインに失敗しました。もう一度お試し下さい。"}
              </Typography>
              <Typography color="error" variant="overline">
                {isError && "何かしらのエラーが発生しました。もう一度お試し下さい。"}
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
                <FormControl>
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
                        placeholder="パスワードを入力して下さい"
                        type={password ? "text" : "password"}
                        id="password"
                        autoComplete="current-password"
                        autoFocus
                        required
                        fullWidth
                        variant="outlined"
                        {...field}
                        error={!!error?.message}
                        helperText={error?.message}
                      />
                    )}
                  />
                </FormControl>
                <Typography sx={{ textAlign: "right" }}>
                  <Link onClick={handleClickOpen} variant="body2" color="error" sx={{ alignSelf: "baseline" }}>
                    パスワードをお忘れの方はこちら
                  </Link>
                </Typography>
                <Divider />
                <ForgotPassword open={open} handleClose={handleClose} />
                <Button type="submit" onClick={login} fullWidth variant="contained">
                  ログイン
                </Button>
                <Typography sx={{ textAlign: "right" }}>
                  <Link href="/material-ui/getting-started/templates/sign-in/" variant="body2" color="error" sx={{ alignSelf: "baseline" }}>
                    アカウントをお持ちでない方はこちら
                  </Link>
                </Typography>
              </Box>
              <Divider>または</Divider>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Button type="submit" fullWidth variant="outlined" onClick={() => alert("Sign in with Google")} startIcon={<GoogleIcon />}>
                  Googleアカウントでログイン
                </Button>
              </Box>
            </Card>
          </LoginContainer>
          <Box component="footer" sx={{ mt: "auto", width: "100%" }}>
            <AuthFooter />
          </Box>
        </>
      )}
    </>
  );
}
