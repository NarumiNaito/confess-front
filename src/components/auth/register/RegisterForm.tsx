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
import { useNavigate } from "react-router-dom";
import { axios } from "../../../api/Axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { InputAdornment } from "@mui/material";
import Loading from "../../loading/Loading";
import Header from "../../header/AuthHeader";
import AuthFooter from "../../footer/AuthFooter";
import { useAuthContext } from "../../../router/useAuthContext";
import { InputsRegister } from "../../../types/Types";

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

const RegisterContainer = styled(Stack)(({ theme }) => ({
  padding: 20,
  marginTop: "10vh",
  marginBottom: "5vh",
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
  },
}));

export default function RegisterForm(props: { disableCustomTheme?: boolean }) {
  const { control, handleSubmit, getValues } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      reenter: "",
    },
  });

  const [password, setPassword] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const togglePassword = () => {
    setPassword(!password);
  };

  const navigate = useNavigate();
  const { login } = useAuthContext();

  const onSubmit: SubmitHandler<InputsRegister> = async (data) => {
    const requestUser = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    await axios.get(`sanctum/csrf-cookie`).then((response) => {
      setLoading(true);
      axios
        .post(`api/register`, requestUser)
        .then((res) => {
          navigate("/myPage");
        })
        .catch((res) => {
          if (res.status === 410) {
            setEmailError(true);
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
          <RegisterContainer direction="column" justifyContent="space-between">
            <Card variant="outlined" sx={{ mb: 5, bgcolor: "rgba(255, 255, 255, 0.12)" }}>
              <Typography component="h2" variant="h2" color="error" sx={{ fontFamily: "cursive", width: "100%", mt: 3 }}>
                Register
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
                    <FormLabel htmlFor="name">名前</FormLabel>
                  </Box>
                  <Controller
                    control={control}
                    name="name"
                    defaultValue={""}
                    rules={{ required: { value: true, message: "名前を入力して下さい" }, maxLength: { value: 255, message: "255文字以内で入力してください" } }}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        id="name"
                        type="name"
                        placeholder="名前を入力して下さい"
                        autoComplete="name"
                        autoFocus
                        fullWidth
                        variant="outlined"
                        color="primary"
                        sx={{ ariaLabel: "name" }}
                        {...field}
                        error={!!error?.message}
                        helperText={error?.message}
                      />
                    )}
                  />
                </FormControl>
                <FormControl>
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
                <Typography color="error" variant="overline">
                  {emailError && "入力されたメールアドレスは既に登録されています。"}
                </Typography>
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
                <Divider sx={{ mb: 2 }} />

                <Button sx={{ mb: 3 }} onClick={login} type="submit" fullWidth variant="contained">
                  登録
                </Button>
              </Box>
            </Card>
          </RegisterContainer>
          <Box component="footer" sx={{ mt: "auto", width: "100%" }}>
            <AuthFooter />
          </Box>
        </>
      )}
    </>
  );
}
