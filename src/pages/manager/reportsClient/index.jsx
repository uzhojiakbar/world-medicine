
import { useState } from "react";
import {
  ButtonWrapper,
  InfoContainer,
  InfoPage,
  InputWrapper,
  Item,
  TableWrapper,
  Title,
  TitleWrapper,
  Wrapper,
} from "./style";

import GenericTable from "./GenericTableUsloviyaSetting";
import { useLanguage } from "../../../context/LanguageContext";

const ReportsClient = () => {
  const { translate } = useLanguage();

  const [activeTab, setActiveTab] = useState("Рецепт");


  const information = {
    title: translate("Формирование отчета по работе клиентов"),
    download: translate("Загрузить базу продаж"),
    titles: [translate("Рецепт"), translate("СУ"), translate("СБ"), translate("ГЗ"), translate("Кабинет вакцинации")],

    info: {
      titles: [
        translate("Дозволено"),
        translate("Продажа в упаковках"),
        translate("Продано в сумах"),
        translate("Заявлено"),
      ],
      values: ["132.000.00", "48.000", "1.200.000.000", "0"],
      percent: "11%",
    },
  };
  const tableData = [
    {
      id: 1,
      data: ["Ампициллин таб. 5/10мг №30", "1000", "900", "1700"],
      highlight: true,
      colors: {
        iconcolor: "#FB3748",
        textcolor: "black",
      },
    },
    {
      id: 1,
      data: ["Ампициллин таб. 5/10мг №30", "1000", "900", "1700"],
      highlight: true,
      colors: {
        bgcolorr: "#FFDB43",
        textcolor: "black",
        iconcolor: "#216BF4",
      },
    },
    {
      id: 1,
      data: ["Артрокол р-р д/ин амп.10мг/2мл №5", "XX", "XX", "XX"],
      highlight: true,
      colors: {
        bgcolorr: "#FB3748",
        iconbgcolor: "#e1858d",
        iconcolor: "white",
        textcolor: "white",
      },
    },
  ];

  return (
    <Wrapper>
      <TitleWrapper>
        <Title>{information.title}</Title>

      </TitleWrapper>
      <ButtonWrapper>
        {information.titles.map((tab) => (
          <Item
            key={tab}
            active={activeTab === tab ? "true" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </Item>
        ))}
      </ButtonWrapper>

      <InfoPage>
        <InfoContainer>

          <InputWrapper>
            <p>{translate("Продажа")}</p>
            <p>48 000</p>
          </InputWrapper>

          <InputWrapper>
            <p>{translate("Квота")}</p>
            <p>56 000</p>
          </InputWrapper>

          <InputWrapper>
            <p>% {translate("выполнения")}</p>
            <p>20%</p>
          </InputWrapper>

          <InputWrapper>
            <p>{translate("Продано в сумах")}</p>
            <p>132 000 00</p>
          </InputWrapper>

          <InputWrapper>
            <p>{translate("Дозволено")}</p>
            <p className="red">-?</p>
          </InputWrapper>
        </InfoContainer>
        <InfoContainer>

          <InputWrapper>
            <p>{translate("Фильтры")}</p>
            <p></p>
          </InputWrapper>

          <InputWrapper>
            <p>{translate("Район")}</p>
            <p>30%</p>
          </InputWrapper>

          <InputWrapper>
            <p>{translate("Препарат")}</p>
            <p>20%</p>
          </InputWrapper>


        </InfoContainer>


      </InfoPage>
      <TableWrapper>
        <GenericTable
          thead={["Препараты", "Выписано", "Дозволено", "Продано"]}
          data={tableData}
        />
      </TableWrapper>
    </Wrapper>
  );
};

export default ReportsClient;