/* eslint-disable react-hooks/exhaustive-deps */
import type { ChangeEvent } from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { Box, Container, Grid } from "@mui/material"

import {
  BannerImage,
  FormComponent,
  StyledH1,
  StyledP,
  StyledUl,
  Logo,
} from "@/components"

import { pxToRem } from "@/utils"

import { useFormValidation, usePost } from "@/hooks"

import { useSelector, useDispatch } from "react-redux"

import type { RootState } from "@/redux/slices"

import { setMessage, setProfileData } from "@/redux/slices/createProfile"

import type { CreateProfileData, InputProps } from "@/types"

const Registration = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { email } = useSelector(
    (state: RootState) => state.createProfile
  )

  const [
    data,
    loading,
    error,
    postData
  ] = usePost<string, CreateProfileData>("profile/create")

  const step1Inputs: InputProps[] = [
    { name: "name", type: "text", placeholder: "Nome", required: true },
    { name: "email", type: "email", placeholder: "Email", required: true },
    { name: "phone", type: "tel", placeholder: "Telefone", required: true },
  ]

  const {
    formValues: step1FormValues,
    formValid: step1FormValid,
    handleChange: step1HandleChange,
  } = useFormValidation(step1Inputs)

  const step2Inputs: InputProps[] = [
    { type: "password", placeholder: "Senha", required: true },
  ]

  const {
    formValues: step2FormValues,
    formValid: step2FormValid,
    handleChange: step2HandleChange,
  } = useFormValidation(step2Inputs)

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault()

    dispatch(
      setProfileData({
        email: String(step1FormValues[1]),
      })
    )
  }

  const handleStep2 = async (e: React.FormEvent) => {
    e.preventDefault()

    await postData({
      name: String(step1FormValues[0]),
      email: String(step1FormValues[1]),
      phone: String(step1FormValues[2]),
      password: String(step2FormValues[0]),
    })
  }

  useEffect(() => {
    if (data) {
      dispatch(setMessage("Usuário criado com sucesso."))
      navigate("/login")
    }

    if (error) {
      alert(`Erro ao criar usuário (${error})`)
    }
  }, [data, error])

  const inputs = email ? step2Inputs : step1Inputs

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

              <StyledH1>
                {email ? "Defina sua senha" : "Faça seu cadastro"}
              </StyledH1>

              <StyledP>
                {email
                  ? "Sua senha deve ter:"
                  : "Primeiro, diga-nos quem você é."}
              </StyledP>

              {email && (
                <StyledUl>
                  <li>Entre 8 e 16 caracteres</li>
                  <li>Pelo menos uma letra maiúscula</li>
                  <li>Pelo menos um caractere especial</li>
                  <li>Pelo menos um número</li>
                </StyledUl>
              )}

            </Box>

            <FormComponent
              onSubmit={email ? handleStep2 : handleStep1}
              inputs={inputs.map((input, index) => ({
                ...input,
                value: email
                  ? step2FormValues[index] || ""
                  : step1FormValues[index] || "",
                onChange: (e: ChangeEvent<HTMLInputElement>) =>
                  email
                    ? step2HandleChange(index, e.target.value)
                    : step1HandleChange(index, e.target.value),
              }))}
              buttons={[
                {
                  type: "submit",
                  className: "primary",
                  disabled: email
                    ? !step2FormValid || loading
                    : !step1FormValid,
                  children: email ? "Enviar" : "Próximo",
                },
              ]}
            />

          </Container>

        </Grid>

        <Grid
          item
          sm={6}
          sx={{
            display: { xs: "none", sm: "block" },
          }}
        >
          <BannerImage />
        </Grid>

      </Grid>
    </Box>
  )
}

export default Registration