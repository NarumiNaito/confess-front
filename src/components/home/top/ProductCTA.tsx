import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import maria from "../../../assets/maria.png";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../router/useAuthContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputsLogin } from "../../../types/Types";
import { axios } from "../../../api/Axios";

function ProductCTA() {
  const navigate = useNavigate();
  const { login } = useAuthContext();
  const { handleSubmit } = useForm({
    defaultValues: {
      email: "welcome@guest.com",
      password: "welcome4649",
    },
  });

  const onSubmit: SubmitHandler<InputsLogin> = async (data) => {
    const requestUser = {
      email: data.email,
      password: data.password,
    };

    await axios.get(`sanctum/csrf-cookie`).then((response) => {
      axios.post(`api/login`, requestUser).then((res) => {
        navigate("/myPage");
        login();
      });
    });
  };

  return (
    <Container component="section" sx={{ mt: 13, mb: 10, display: "flex" }}>
      <Grid container>
        <Grid item xs={12} md={6} sx={{ zIndex: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              bgcolor: "#606060",
              py: 8,
              px: 3,
            }}
          >
            <Box component="form">
              <Typography color="error" variant="h5" marginTop={2} marginBottom={2} sx={{ fontStyle: "italic", fontFamily: "cursive" }}>
                You shall love your neighbor as yourself.
              </Typography>
              <Button onClick={() => navigate("/login")} color="primary" variant="contained" sx={{ width: "100%", mt: 4 }} startIcon={<LoginIcon />}>
                ログイン
              </Button>
              <Button type="button" onClick={handleSubmit(onSubmit)} color="warning" variant="contained" sx={{ width: "100%", mt: 4 }} startIcon={<PersonAddIcon />}>
                ゲストログイン
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: { md: "block", xs: "none" }, position: "relative" }}>
          <Box
            sx={{
              position: "absolute",
              top: -67,
              left: -67,
              right: 0,
              bottom: 0,
              width: "100%",
            }}
          />
          <Box
            component="img"
            src={maria}
            alt="call to action"
            sx={{
              position: "absolute",
              top: -28,
              left: -28,
              right: 0,
              bottom: 0,
              height: 310,
              width: "60%",
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductCTA;
