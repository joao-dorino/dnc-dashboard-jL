 import { AvatarList ,CardComponent, Header } from "@/components"
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
    </Container>
    
    </>
  )
}
export default Home
