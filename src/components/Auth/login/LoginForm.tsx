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

interface INPUTS {
  email: string;
  password: string;
}

export default function LoginForm(props: { disableCustomTheme?: boolean }) {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit: SubmitHandler<INPUTS> = (data) => {
    console.log(data);
  };

  return (
    <LoginContainer direction="column" justifyContent="space-between" sx={{ flexGrow: 1 }}>
      <Card variant="outlined">
        <Typography color="error" component="h1" variant="h4" sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}>
          ログイン
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
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <FormLabel htmlFor="password">パスワード</FormLabel>
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
                  type="password"
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
            <Link component="button" onClick={handleClickOpen} variant="body2" color="error" sx={{ alignSelf: "baseline" }}>
              パスワードをお忘れの方はこちら
            </Link>
          </Typography>
          <Divider />
          <ForgotPassword open={open} handleClose={handleClose} />
          <Button type="submit" fullWidth variant="contained">
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
  );
}
