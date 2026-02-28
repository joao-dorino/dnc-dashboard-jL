/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState, type ChangeEvent } from 'react'
import { AppThemeContext } from '@/contexts/AppThemeContext'

// COMPONENTS
import { Container, Grid } from '@mui/material'
import {
  CardComponent,
  Header,
  FormComponent,
  StyledH2,
  StyledButton,
} from '@/components'

import { Message } from '@/components/Message'

// HOOKS
import { useFormValidation, useGet, useDelete, usePut } from '@/hooks'

// SERVICES
import { logout } from '@/services'

// TYPES
import type {
  inputProps,
  ProfileData,
  MessageProps,
} from '@/types'

function Profile() {
  const themeContext = useContext(AppThemeContext)

  // FORM CONFIG
  const inputs: inputProps[] = [
    { name: 'name', type: 'text', placeholder: 'Nome', required: true },
    { name: 'email', type: 'email', placeholder: 'Email', required: true },
    { name: 'phone', type: 'tel', placeholder: 'Telefone', required: true },
  ]

  const { formValues, formValid, handleChange } =
    useFormValidation(inputs)

  // MESSAGE STATE
  const [updateMessage, setUpdateMessage] =
    useState<MessageProps>({
      type: 'success',
      msg: '',
    })

  const clearMessage = () => {
    setTimeout(() => {
      setUpdateMessage({ type: 'success', msg: '' })
    }, 3000)
  }

  // GET PROFILE (🔥 pegando getData agora)
  const {
    data: profileData,
    loading: profileLoading,
    error: profileError,
    getData,
  } = useGet<ProfileData>('profile')

  // PUT PROFILE
  const {
    data: profileUpdateData,
    loading: profileUpdateLoading,
    error: profileUpdateError,
    putData,
  } = usePut('profile')

  // DELETE PROFILE
  const {
    loading: profileDeleteLoading,
    deleteData,
  } = useDelete('profile')

  // POPULAR FORM QUANDO CARREGAR
  useEffect(() => {
    if (profileData) {
      handleChange(0, profileData.name)
      handleChange(1, profileData.email)
      handleChange(2, profileData.phone)
    }
  }, [profileData])

  // MENSAGEM DE SUCESSO / ERRO
  useEffect(() => {
    if (profileUpdateData) {
      setUpdateMessage({
        type: 'success',
        msg: 'Perfil atualizado com sucesso!',
      })
      clearMessage()
    }

    if (profileUpdateError) {
      setUpdateMessage({
        type: 'error',
        msg: 'Não foi possível atualizar o perfil.',
      })
      clearMessage()
    }
  }, [profileUpdateData, profileUpdateError])

  // SUBMIT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    await putData({
      name: formValues[0],
      email: formValues[1],
      phone: formValues[2],
    })

    await getData() // 🔥 ISSO ATUALIZA A TELA
  }

  // DELETE
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      'Tem certeza que deseja excluir sua conta?'
    )

    if (!confirmDelete) return

    try {
      await deleteData()
      alert('Conta excluída com sucesso!')
      logout()
    } catch {
      alert(
        'Não foi possível excluir sua conta.'
      )
    }
  }

  return (
    <>
      <Header />

      <Container className="mb-2" maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            {!profileError && (
              <CardComponent
                className={
                  profileLoading
                    ? 'skeleton-loading skeleton-loading-mb-2'
                    : ''
                }
              >
                {!profileLoading && profileData && (
                  <>
                    <StyledH2 className="mb-1">
                      Seus Dados
                    </StyledH2>

                    <FormComponent
                      onSubmit={handleSubmit}
                      inputs={inputs.map((input, index) => ({
                        ...input,
                        value: formValues[index],
                        onChange: (
                          e: ChangeEvent<HTMLInputElement>
                        ) =>
                          handleChange(
                            index,
                            e.target.value
                          ),
                      }))}
                      buttons={[
                        {
                          type: 'submit',
                          className: 'primary',
                          disabled:
                            !formValid ||
                            profileUpdateLoading,
                          children: profileUpdateLoading
                            ? 'Aguarde...'
                            : 'Atualizar meu perfil',
                        },
                        {
                          type: 'button',
                          className: 'alert',
                          disabled: profileDeleteLoading,
                          onClick: handleDelete,
                          children: profileDeleteLoading
                            ? 'Aguarde...'
                            : 'Excluir minha conta',
                        },
                      ]}
                    />

                    <Message message={updateMessage} />
                  </>
                )}
              </CardComponent>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <CardComponent>
              <StyledH2 className="mb-1">
                Definições de conta
              </StyledH2>

              <StyledButton
                className="primary mb-1"
                onClick={themeContext?.toggleTheme}
              >
                Trocar para tema{' '}
                {themeContext?.appTheme === 'light'
                  ? 'escuro'
                  : 'claro'}
              </StyledButton>

              <StyledButton
                className="alert"
                onClick={logout}
              >
                Logout
              </StyledButton>
            </CardComponent>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Profile