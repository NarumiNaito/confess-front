import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
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
import Loading from "../../loading/Loading";
import { InputsProfile } from "../../../types/Types";
import { Avatar } from "@mui/material";
import useFileInput from "../../../hooks/useFileInput";
import Footer from "../../footer/Footer";
import Header from "../../header/Header";

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
  const [loading, setLoading] = React.useState(false);
  const [authError, setAuthError] = React.useState(false);
  const [image, setImage] = React.useState<string | null>(null);

  const { control, handleSubmit, register, reset } = useForm<InputsProfile>({
    defaultValues: {
      name: "",
      image: "",
    },
  });

  const navigate = useNavigate();
  const params = useParams();
  const inputProps = register("image");

  const { file, imageData, resets, selectFile, contextHolder } = useFileInput(inputProps);

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("api/user");
        const fetchedUser = res.data[0];
        setUser(fetchedUser);
        console.log(fetchedUser);
        setImage(fetchedUser.image);
        console.log(fetchedUser.image);

        reset({
          name: fetchedUser?.name || "",
          image: fetchedUser?.image || null,
        });
      } catch (error) {
        console.error("ユーザー情報の取得に失敗しました:", error);
      }
    };

    fetchUser();
  }, [reset]);

  const onSubmit: SubmitHandler<InputsProfile> = async (data) => {
    const formData = new FormData();
    formData.append("id", user.id);
    formData.append("name", data.name);
    if (file) {
      formData.append("image", file);
    }

    await axios.get(`sanctum/csrf-cookie`).then((response) => {
      setLoading(true);
      axios
        .post(`api/user/update`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          navigate("/myPage");
        })
        .catch((res) => {
          console.log(res);

          if (res.status === 422) {
            setAuthError(true);
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
            <Card variant="outlined" sx={{ mb: 7, bgcolor: "rgba(255, 255, 255, 0.12)" }}>
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
                      {file ? (
                        <Box>
                          <IconButton onClick={selectFile} sx={{ p: 0, color: "white", textTransform: "none" }}>
                            <img
                              src={imageData}
                              alt="imageData"
                              style={{
                                margin: "auto",
                                width: "10rem",
                                height: "10rem",
                                borderRadius: "50%",
                                objectFit: "cover",
                              }}
                            />
                          </IconButton>
                          <Box marginTop={1}>
                            <Button variant="outlined" size="small" color="error" onClick={resets}>
                              削除
                            </Button>
                          </Box>
                        </Box>
                      ) : (
                        <Box>
                          <IconButton onClick={selectFile} sx={{ p: 0, color: "white" }}>
                            <Avatar src={image || undefined} sx={{ width: 120, height: 120 }} />
                          </IconButton>
                          {image && (
                            <Box marginTop={1}>
                              <Button variant="outlined" size="small" color="error" onClick={() => setImage(null)}>
                                削除
                              </Button>
                            </Box>
                          )}
                        </Box>
                      )}
                    </Box>
                  )}
                />
                <Typography color="error" variant="subtitle2" sx={{ width: "100%" }}>
                  {authError && "画像サイズが大きすぎます。2MBまでの別の画像でお試しください。"}
                </Typography>
                <FormControl sx={{ mb: 2 }}>
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

                <Divider />
                <Button sx={{ mb: 1, mt: 1 }} type="submit" fullWidth variant="contained">
                  登録
                </Button>
              </Box>
              {params.id === "11" || (
                <>
                  <Divider>または</Divider>
                  <Box sx={{ mb: 1, mt: 1, display: "flex", flexDirection: "column", gap: 2 }}>
                    <Button onClick={() => navigate(`/myPage/profile/delete/${params.id}`, { state: user })} color="error" fullWidth variant="contained">
                      アカウント削除はこちら
                    </Button>
                  </Box>
                </>
              )}
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
