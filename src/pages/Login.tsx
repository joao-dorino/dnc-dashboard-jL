import { useEffect } from "react";
import type { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import cookies from "js-cookie";

// COMPONENTS
import {
  BannerImage,
  FormComponent,
  Logo,
  StyledH1,
  StyledP,
} from "@/components";

import { Box, Container, Grid } from "@mui/material";

// HOOKS
import { useFormValidation, usePost } from "@/hooks";

// TYPES
import type {
  LoginData,
  LoginPostData,
  MessageProps,
} from "@/types";

// UTILS
import { pxToRem } from "@/utils";

export default function Login() {
  const navigate = useNavigate();

  const inputs = [
    { type: "email", placeholder: "Email" },
    { type: "password", placeholder: "Senha" },
  ];

  // 🔥 Fake API
  const { data, loading, error, postData } =
    usePost<LoginData, LoginPostData>();

  const { formValues, formValid, handleChange } =
    useFormValidation(inputs);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    postData({
      email: formValues[0],
      password: formValues[1],
    });
  };

  // 🔥 Quando "login" der certo
  useEffect(() => {
    if (data?.jwt_token) {
      cookies.set("Authorization", data.jwt_token);
      navigate("/home");
    }
  }, [data, navigate]);

  const handleMessage = (): MessageProps | undefined => {
    if (!error) return undefined;

    if (error === 401) {
      return { msg: "Email ou senha inválidos", type: "error" };
    }

    return {
      msg: "Erro no servidor. Tente novamente.",
      type: "error",
    };
  };

  return (
    <Box>
      <Grid container>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            display: "flex",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Container maxWidth="sm">
            <Box sx={{ marginBottom: pxToRem(24) }}>
              <Logo height={41} width={100} />
            </Box>

            <Box sx={{ marginBottom: pxToRem(24) }}>
              <StyledH1>Bem-vindo</StyledH1>
              <StyledP>
                Digite seu email e senha para logar
              </StyledP>
            </Box>

            <FormComponent
              onSubmit={handleSubmit}
              inputs={inputs.map((input, index) => ({
                ...input,
                value: formValues[index],
                onChange: (e: ChangeEvent<HTMLInputElement>) =>
                  handleChange(index, e.target.value),
              }))}
              buttons={[
                {
                  type: "submit",
                  className: "primary",
                  disabled: !formValid || loading,
                  children: loading ? "Aguarde..." : "Login",
                },
              ]}
              message={handleMessage()}
            />
          </Container>
        </Grid>

        <Grid
          item
          sm={6}
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          <BannerImage />
        </Grid>
      </Grid>
    </Box>
  );
}