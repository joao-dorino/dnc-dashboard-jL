import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import cookies from "js-cookie";

import {
  AvatarList,
  CardComponent,
  CustomChart,
  CustomTable,
  Header,
} from "@/components";

import { Container } from "@mui/material";
import { currencyConverter } from "@/utils";

function Home() {
  const navigate = useNavigate();

  // 🔐 Proteção da rota
  useEffect(() => {
    const token = cookies.get("Authorization");

    if (!token) {
      navigate("/");
    }
  }, [navigate]);

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
  ];

  const mockTableData = {
    headers: ["Name", "Email", "Actions"],
    rows: [
      [
        <span key="1-name">Nome 1</span>,
        <span key="1-email">Nome1@gmail.com</span>,
        <button key="1-action">ACTION</button>,
      ],
      [
        <span key="2-name">Nome 2</span>,
        <span key="2-email">Nome2@gmail.com</span>,
        <button key="2-action">ACTION</button>,
      ],
      [
        <span key="3-name">Nome 3</span>,
        <span key="3-email">Nome3@gmail.com</span>,
        <button key="3-action">ACTION</button>,
      ],
    ],
  };

  return (
    <>
      <Header />

      <Container maxWidth="lg" sx={{ marginTop: 4 }}>
        <CardComponent>CARD</CardComponent>

        <CardComponent>
          <AvatarList listData={mockListData} />
        </CardComponent>

        <CardComponent>
          <CustomTable
            headers={mockTableData.headers}
            rows={mockTableData.rows}
          />
        </CardComponent>

        <CardComponent>
          <CustomChart
            labels={["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"]}
            data={[1000.12, 2456.54, 986.32, 654.89, 754.89, 354.89]}
            type="line"
          />
        </CardComponent>
      </Container>
    </>
  );
}

export default Home;
