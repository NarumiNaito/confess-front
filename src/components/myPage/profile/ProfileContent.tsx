import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import ForgotPassword from "../../auth/login/ForgotPassword";
import { GoogleIcon } from "../../CustomIcons";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { axios } from "../../../api/Axios";
import Loading from "../../loading/Loading";
import { InputsProfile } from "../../../types/Types";
import { Tooltip } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import useFileInput from "../../../hooks/useFileInput";

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
}));

export default function ProfileContent(props: { disableCustomTheme?: boolean }) {
  const [user, setUser] = React.useState<any>(null);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const { control, handleSubmit, register, reset } = useForm<InputsProfile>({
    defaultValues: {
      name: "",
      image: "",
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  const inputProps = register("image");

  const { file, imageData, resets, selectFile, contextHolder } = useFileInput(inputProps);

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("api/user");
        if (res.data && res.data.length > 0) {
          const fetchedUser = res.data[0];
          setUser(fetchedUser);
          console.log(fetchedUser);
          reset({
            name: fetchedUser?.name || "",
            image: fetchedUser?.image || null, // 画像がない場合は null
          });
        }
      } catch (error) {
        console.error("ユーザー情報の取得に失敗しました:", error);
      }
    };

    fetchUser();
  }, [reset]);

  const onSubmit: SubmitHandler<InputsProfile> = async (data) => {
    // 画像が未選択の場合、デフォルト値として null を送信

    // const requestUser = {
    //   id: user.id,
    //   name: data.name,
    //   image: file ? file : null, // 画像がなければ null を送信
    // };
    // console.log(requestUser);

    const formData = new FormData();
    formData.append("id", user.id);
    formData.append("name", data.name);
    if (file) {
      formData.append("image", file);
    }

    try {
      setLoading(true);
      await axios.get(`sanctum/csrf-cookie`);
      await axios.post(`api/user/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/myPage");
    } catch (error) {
      console.error("ユーザー更新に失敗しました:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <LoginContainer direction="column" justifyContent="space-between" sx={{ flexGrow: 1 }}>
            <Card variant="outlined" sx={{ bgcolor: "rgba(255, 255, 255, 0.12)" }}>
              <Typography color="error" component="h4" variant="h4" sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)", mt: 3 }}>
                アカウント編集
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
                <Controller
                  control={control}
                  name="image"
                  render={({ field }) => (
                    <Box marginTop={2}>
                      {contextHolder}
                      <Tooltip title="アイコン">
                        {file ? (
                          <Box>
                            <IconButton onClick={selectFile} sx={{ p: 0, color: "white", textTransform: "none" }}>
                              <img src={imageData} alt="選択された画像" style={{ margin: "auto", width: "10rem", height: "10rem", borderRadius: "50%", objectFit: "cover" }} />
                            </IconButton>
                            <Box marginTop={1}>
                              <Button variant="outlined" size="small" color="error" onClick={resets}>
                                削除
                              </Button>
                            </Box>
                          </Box>
                        ) : (
                          <IconButton onClick={selectFile} sx={{ p: 0, color: "white", textTransform: "none" }}>
                            <AccountCircle sx={{ fontSize: "10rem" }} />
                          </IconButton>
                        )}
                      </Tooltip>
                    </Box>
                  )}
                />
                <FormControl sx={{ mb: 2, mt: 2 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <FormLabel htmlFor="name">名前</FormLabel>
                  </Box>
                  <Controller
                    control={control}
                    name="name"
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

                <Typography sx={{ textAlign: "right" }}>
                  <Link onClick={handleClickOpen} variant="body2" color="error" sx={{ alignSelf: "baseline" }}>
                    パスワードをお忘れの方はこちら
                  </Link>
                </Typography>
                <Divider />
                <ForgotPassword open={open} handleClose={handleClose} />
                <Button type="submit" fullWidth variant="contained">
                  登録
                </Button>
              </Box>
              <Divider>または</Divider>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Button type="submit" fullWidth variant="outlined" onClick={() => alert("Sign in with Google")} startIcon={<GoogleIcon />}>
                  Googleアカウントでログイン
                </Button>
              </Box>
            </Card>
          </LoginContainer>
          <Box component="footer" sx={{ mt: "auto", width: "100%" }}></Box>
        </>
      )}
    </>
  );
}