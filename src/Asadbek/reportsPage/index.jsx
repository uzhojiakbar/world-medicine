import React, { useState } from "react";
import {
  Container,
  Header,
  IconWrapper,
  Info,
  InfoWrapper,
  Item,
  Main,
  TitleWrap,
} from "./style";
import FilterReports from "./Filter/Filter";
import { Title } from "../../root/style";
import { useLanguage } from "../../context/LanguageContext";
import Table from "./table";
import DownloadIcon from "../../assets/svg/download.jsx";
import PrintIcon from "../../assets/svg/print.jsx";

const ReportsPage = () => {
  const { translate } = useLanguage();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([
    {
      name: " Амлипин таблетки 5/10 мг",
      dosage: "-?",
      quantity: "-?%",
      price: "12%",
      Рецептурник: "7",
      СУ: "5",
      СБ: "2",
      ГЗ: "4",
      КВ: "10",
    },
    {
      id: 1,
      name: " Амлипин таблетки 5/10 мг",
      dosage: "-?",
      quantity: "-?%",
      price: "12%",
      Рецептурник: "7",
      СУ: "5",
      СБ: "2",
      ГЗ: "4",
      КВ: "10",
    },
    {
      id: 2,
      name: " Амлипин таблетки 5/10 мг",
      dosage: "-?",
      quantity: "-?%",
      price: "12%",
      Рецептурник: "7",
      СУ: "5",
      СБ: "2",
      ГЗ: "4",
      КВ: "10",
    },
    {
      id: 3,
      name: " Амлипин таблетки 5/10 мг",
      dosage: "-?",
      quantity: "-?%",
      price: "12%",
      Рецептурник: "7",
      СУ: "5",
      СБ: "2",
      ГЗ: "4",
      КВ: "10",
    },
    {
      id: 4,
      name: " Амлипин таблетки 5/10 мг",
      dosage: "-?",
      quantity: "-?%",
      price: "12%",
      Рецептурник: "7",
      СУ: "5",
      СБ: "2",
      ГЗ: "4",
      КВ: "10",
    },
    {
      id: 5,
      name: " Амлипин таблетки 5/10 мг",
      dosage: "-?",
      quantity: "-?%",
      price: "12%",
      Рецептурник: "7",
      СУ: "5",
      СБ: "2",
      ГЗ: "4",
      КВ: "10",
    },
    {
      id: 6,
      name: " Амлипин таблетки 5/10 мг",
      dosage: "-?",
      quantity: "-?%",
      price: "12%",
      Рецептурник: "7",
      СУ: "5",
      СБ: "2",
      ГЗ: "4",
      КВ: "10",
    },
  ]);

  return (
    <Container>
      <Header>
        <Title>{translate("Отчеты")}</Title>
        <Item>
          <IconWrapper>
            <DownloadIcon />
          </IconWrapper>
          <IconWrapper>
            <PrintIcon />
          </IconWrapper>
        </Item>
      </Header>
      <InfoWrapper>
        <Info>
          <TitleWrap>
            <p>{translate("Продажа")} (уп)</p>
            <p>45 000</p>
          </TitleWrap>
          <TitleWrap>
            <p>{translate("Квота")} (уп)</p>
            <p>75 000</p>
          </TitleWrap>
          <TitleWrap>
            <p>% {translate("выполнения")}</p>
            <p>65%</p>
          </TitleWrap>
        </Info>
        <Info>
          <TitleWrap>
            <p>{translate("Продажа")} (сумма)</p>
            <p>500 000 000</p>
          </TitleWrap>
          <TitleWrap>
            <p>{translate("Инвестиции")} (сумма)</p>
            <p>420 000 000</p>
          </TitleWrap>
          <TitleWrap>
            <p>% {translate("инвестиций от продаж")}</p>
            <p>85%</p>
          </TitleWrap>
        </Info>
      </InfoWrapper>

      <Main>
        <FilterReports />
        <Table
          title={translate("Наименование_товара")}
          loading={loading}
          setLoading={setLoading}
          data={data}
        />
      </Main>
    </Container>
  );
};

export default ReportsPage;
