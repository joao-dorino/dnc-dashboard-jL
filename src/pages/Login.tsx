import { BannerImage } from '@/components'
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
           <h1>LOGIN</h1>
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
