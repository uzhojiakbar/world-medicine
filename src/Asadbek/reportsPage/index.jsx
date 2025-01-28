import React from "react";
import { Container, Info, InfoWrapper, Main, TitleWrap } from "./style";
import FilterReports from "./Filter/Filter";
import { Title } from "../../root/style";
import { useLanguage } from "../../context/LanguageContext";

const ReportsPage = () => {
  const { translate } = useLanguage();
  return (
    <Container>
      <Title>{translate("Отчеты")}</Title>
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
      </Main>
    </Container>
  );
};

export default ReportsPage;
