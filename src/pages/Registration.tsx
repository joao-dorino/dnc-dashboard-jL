import { Box, Container, Grid } from '@mui/material'
import { BannerImage } from '@/components'


const Registration = () => {
  return (
    <> 
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
                    <h1>CADASTRO</h1>
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
    </>
  )
}
export default Registration
