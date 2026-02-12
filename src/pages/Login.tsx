import { useEffect } from "react";
import type { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import cookies from "js-cookie";

//COMPONENETS
import {
  BannerImage,
  FormComponent,
  Logo,
  StyledH1,
  StyledP,
} from "@/components";
import { Box, Container, Grid } from "@mui/material";

//HOOKS
import { useFormValidation, usePost } from "@/hooks";

 //UTILS
import { jwtExpirationDateConverter, pxToRem } from "@/utils";

//TYPES
import type { DecodedJWT, MessageProps, LoginData, LoginPostData } from "@/types";

export default function Login() {
  const navigate = useNavigate();
  const inputs = [
    { type: "email", placeholder: "Email" },
    { type: "password", placeholder: "Senha" },
  ];

 const { data, loading, error } =
  usePost<LoginData, LoginPostData>("login");

  const { formValues, formValid, handleChange } =
    useFormValidation(inputs);

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  console.log("Botão clicado"); // 👈 teste

  cookies.set("Authorization", "fake-token");
  navigate("/home");
};

  const handleMessage = (): MessageProps => {
    if (!error) return { msg: "", type: "success" };

    if (error === 401) {
      return { msg: "Email ou senha inválidos", type: "error" };
    }

    return {
      msg: "Erro no servidor. Tente novamente.",
      type: "error",
    };
  };

 useEffect(() => {
  if (data?.jwt_token) {
    const decoded: DecodedJWT = jwtDecode(data.jwt_token);

    cookies.set("Authorization", data.jwt_token, {
      expires: jwtExpirationDateConverter(decoded.exp),
      secure: true,
    });

    if (cookies.get("Authorization")) navigate("/home");
  }
}, [data, navigate]);


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
