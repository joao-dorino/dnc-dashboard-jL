 import { AvatarList ,CardComponent, CustomTable, Header } from "@/components"
 import { Container } from "@mui/material"
 import { currencyConverter } from "@/utils"

function Home() {
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
        <button>ACTION</button>
      ],
      [
        <span>Nome 2</span>,
        <span>Nome2@gmail.com</span>,
        <button>ACTION</button>
      ],
      [
        <span>Nome 3</span>,
        <span>Nome3@gmail.com</span>,
        <button>ACTION</button>
      ]
    ]

  }

  return (
    <> 
    <Header />
    <Container maxWidth="lg">
      <CardComponent >
        CARD
      </CardComponent>
      <CardComponent >
        <AvatarList listData={mockListData} />
      </CardComponent>
      <CardComponent >
        <CustomTable headers={mockTableData.headers}
        rows={mockTableData.rows} />
      </CardComponent>
    </Container>
    
    </>
  )
}
export default Home
