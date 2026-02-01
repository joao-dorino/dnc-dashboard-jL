import { BannerImage, FormComponent, Logo, StyledH1, StyledP } from '@/components'
import { pxToRem } from '@/utils'
import { Box, Container, Grid } from '@mui/material'


export default function Login() {
  return (
    <Box>
      <Grid container>
        {/* Área do login */}
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <Container maxWidth="sm">
            <Box sx={{ marginBottom: pxToRem(24) }}>
              <Logo height={41}
              width={100}
            />
            </Box>
            <Box sx={{ marginBottom: pxToRem(24) }}>
              <StyledH1>Bem-vindo</StyledH1>
              <StyledP>Digite sua senha e email para logar</StyledP>
            </Box>  
           <FormComponent

            inputs={[
            { type: 'email', placeholder: 'Email', disabled: true },
            { type: 'password', placeholder: 'Senha', },
           ]} 

           buttons={[
            { className: 'primary',
              type: 'submit',
              children: 'Login',
              disabled: true },
           ]}
           
            message={{
              msg: 'Sucesso!!!',
              type: 'success'
             }}
           />
          </Container>
        </Grid>

        {/* Imagem lateral (some no mobile) */}
        <Grid
          item
          sm={6}
          sx={{
            display: { xs: 'none', sm: 'block' },
          }}
        >
          < BannerImage />
        </Grid>
      </Grid>
    </Box>
  )
}
