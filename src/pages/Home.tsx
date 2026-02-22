import {
  AvatarList,
  CardComponent,
  CustomChart,
  CustomTable,
  Header,
  StyledH2,
} from '@/components'
import { Container, Grid } from '@mui/material'
import { currencyConverter } from '@/utils'

function Home() {

  const mockListData = [
    {
      avatar: "/dnc-avatar.svg",
      name: "Name Sobrenome",
      subtitle: currencyConverter(1000.01),
    },
    {
      avatar: "/dnc-avatar.svg",
      name: "Name Sobrenome 2",
      subtitle: currencyConverter(2000.02),
    },
    {
      avatar: "/dnc-avatar.svg",
      name: "Name Sobrenome 3",
      subtitle: currencyConverter(3000.03),
    },
  ]

  const mockTableData = {
    headers: ["Name", "Email", "Actions"],
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
          <Grid item xs={12} md={4}>
            <CardComponent>
              <StyledH2 className="mb-1">Total de vendas no mês</StyledH2>
            </CardComponent>
          </Grid>
          <Grid item xs={12} md={4}>
            <CardComponent>
              <StyledH2 className="mb-1">Meta do mês</StyledH2>
            </CardComponent>
          </Grid>
          <Grid item xs={12} md={4}>
            <CardComponent>
              <StyledH2 className="mb-1">Leads contactados</StyledH2>
            </CardComponent>
          </Grid>
          <Grid item xs={12} md={7}>
            <CardComponent>
              <StyledH2 className="mb-1">Valor de vendas no mês</StyledH2>
              <CustomChart
                labels={['Jan', 'Fev', 'Mar', 'Abr', 'Mai']}
                data={[1000.12, 2456.54, 986.32, 654.89, 754.89, 354.89]}
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
  );
}

export default Home;
