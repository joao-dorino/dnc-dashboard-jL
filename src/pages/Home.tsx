import { useEffect } from 'react'
import {
  AvatarList,
  CardComponent,
  CustomChart,
  CustomTable,
  Header,
  StyledH2,
  StyledH3,
  StyledSpan,
} from '@/components'
import { Container, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

//TYPES
//import type { HighlightsData, StartsData, NewsData } from '@/types'

//HOOKS
//import { useGet } from '@/hooks'

//UTILS
import { currencyConverter, highlightsDataTextConverter } from '@/utils'

function Home() {
  /*  const {
    data: highlightsData,
    loading: highlightsLoading,
    error: highlightsError,
 } = useGet<HighlightsData[]>('sales/highlights')
*/
  const highlightsData = [
    { value: 10000, subtitle: '10% acima do mês passado' },
    { value: 20000, subtitle: 'Meta mensal' },
    { value: 150, subtitle: 'Leads novos' },
  ]

  const highlightsLoading = false
  const highlightsError = null
  const navigate = useNavigate()

  // 🔐 Proteção da rota
  useEffect(() => {
    const token = Cookies.get('Authorization')

    if (!token) {
      navigate('/')
    }
  }, [navigate])

  const mockListData = [
    {
      avatar: '/dnc-avatar.svg',
      name: 'Name Sobrenome',
      subtitle: currencyConverter(1000.01),
    },
    {
      avatar: '/dnc-avatar.svg',
      name: 'Name Sobrenome 2',
      subtitle: currencyConverter(2000.02),
    },
    {
      avatar: '/dnc-avatar.svg',
      name: 'Name Sobrenome 3',
      subtitle: currencyConverter(3000.03),
    },
  ]

  const mockTableData = {
    headers: ['Name', 'Email', 'Actions'],
    rows: [
      [
        <span>Nome 1</span>,
        <span>Nome1@gmail.com</span>,
        <button>ACTION</button>,
      ],
      [
        <span>Nome 2</span>,
        <span>Nome2@gmail.com</span>,
        <button>ACTION</button>,
      ],
      [
        <span>Nome 3</span>,
        <span>Nome3@gmail.com</span>,
        <button>ACTION</button>,
      ],
    ],
  }

  return (
    <>
      <Header />

      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {!highlightsError && (
            <>
              <Grid item xs={12} md={4}>
                <CardComponent
                  className={
                    highlightsError
                      ? 'skeleton-loading skeleton-loading-mb-1'
                      : ''
                  }
                >
                  {!highlightsLoading && highlightsData && (
                    <>
                      <StyledH2 className="mb-1">
                        Total de vendas no mês
                      </StyledH2>
                      <StyledH3 className="mb-1" size={40} lineHeight={40}>
                        {currencyConverter(highlightsData[0].value)}
                      </StyledH3>
                      <StyledSpan>{highlightsData[0].subtitle}</StyledSpan>
                    </>
                  )}
                </CardComponent>
              </Grid>
              <Grid item xs={12} md={4}>
                <CardComponent
                  className={
                    highlightsData
                      ? highlightsData[1].subtitle
                      : 'skeleton-loading skeleton-loading-mb-1'
                  }
                >
                  {!highlightsLoading && highlightsData && (
                    <>
                      <StyledH2 className="mb-1">Meta do mês</StyledH2>
                      <StyledH3 className="mb-1" size={40} lineHeight={40}>
                        {currencyConverter(highlightsData[1].value)}
                      </StyledH3>
                      <StyledSpan>{highlightsDataTextConverter(highlightsData[1].subtitle)}</StyledSpan>
                    </>
                  )}
                </CardComponent>
              </Grid>
              <Grid item xs={12} md={4}>
                <CardComponent
                  className={
                    highlightsError
                      ? 'skeleton-loading skeleton-loading-mb-1'
                      : ''
                  }
                >
                  {!highlightsLoading && highlightsData && (
                    <>
                      <StyledH2 className="mb-1">Leads contactados</StyledH2>
                      <StyledH3 className="mb-1" size={40} lineHeight={40}>
                        {' '}
                        {highlightsData[2].value}{' '}
                      </StyledH3>
                      <StyledSpan>{highlightsData[2].subtitle}</StyledSpan>
                    </>
                  )}
                </CardComponent>
              </Grid>
            </>
          )}

          <Grid item xs={12} md={7}>
            <CardComponent>
              <StyledH2 className="mb-1">Valor de vendas no mês</StyledH2>
              <CustomChart
                labels={['Jan', 'Fev', 'Mar', 'Abr', 'Mai']}
                data={[1000.12, 2456.54, 986.32, 654.89, 754.89]}
                type="line"
              />
            </CardComponent>
          </Grid>
          <Grid item xs={12} md={5}>
            <CardComponent>
              <StyledH2 className="mb-1">Maiores vendedores do mês</StyledH2>
              <AvatarList listData={mockListData} />
            </CardComponent>
          </Grid>
          <Grid item xs={12} md={5}>
            <CardComponent>
              <StyledH2 className="mb-1">Notícias relevantes</StyledH2>
              <CustomTable
                headers={mockTableData.headers}
                rows={mockTableData.rows}
              />
            </CardComponent>
          </Grid>
          <Grid item xs={12} md={7}>
            <CardComponent>
              <StyledH2 className="mb-1">Valor de vendas por mês</StyledH2>
              <CustomChart
                labels={['Jan', 'Fev', 'Mar', 'Abr', 'Mai']}
                data={[1000.12, 2456.54, 986.32, 654.89, 754.89, 354.89]}
                type="bar"
              />
            </CardComponent>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Home
