/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import type { ChangeEvent } from "react"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"

// COMPONENTS
import {
  BannerImage,
  FormComponent,
  Logo,
  StyledH1,
  StyledP,
} from "@/components"

import { Box, Container, Grid } from "@mui/material"

// HOOKS
import { useFormValidation, usePost } from "@/hooks"

// REDUX
import { useSelector } from "react-redux"
import type { RootState } from "@/redux/slices"

// TYPES
import type { MessageProps } from "@/types"

// UTILS
import { pxToRem } from "@/utils"

export default function Login() {
  const navigate = useNavigate()
  const { email } = useSelector((state: RootState) => state.createProfile)

  const inputs = [
    { type: "email", placeholder: "Email", required: true },
    { type: "password", placeholder: "Senha", required: true },
  ]

  const { formValues, formValid, handleChange } =
    useFormValidation(inputs)

  // LOGIN HOOK
  const [loginData, loginLoading, loginError, login] = usePost<
    { jwt_token: string },
    { email: string; password: string }
  >("login")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    await login({
      email: formValues[0],
      password: formValues[1],
    })
  }

  // REDIRECIONA SE LOGIN OK
  useEffect(() => {
    if (loginData?.jwt_token) {
      Cookies.set("Authorization", loginData.jwt_token)
      navigate("/home", { replace: true })
    }
  }, [loginData, navigate])

  // PREENCHE EMAIL VINDO DO REDUX
  useEffect(() => {
    if (email) {
      handleChange(0, email)
    }
  }, [email])

  // MENSAGEM DE ERRO
  const handleMessage = (): MessageProps | undefined => {
    if (loginError === 401) {
      return {
        type: "error",
        msg: "Email ou senha inválidos",
      }
    }

    if (loginError) {
      return {
        type: "error",
        msg: "Erro ao fazer login",
      }
    }

    return undefined
  }

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
                value: formValues[index] || "",
                onChange: (e: ChangeEvent<HTMLInputElement>) =>
                  handleChange(index, e.target.value),
              }))}
              buttons={[
                {
                  type: "submit",
                  className: "primary",
                  disabled: !formValid || loginLoading,
                  children: loginLoading
                    ? "Entrando..."
                    : "Login",
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
  )
}