import React from "react";
import { Analiktika__Cards, AnaliktikaCon } from "./style";
import { Title } from "../../root/style";
import InfoCard from "../../components/infoCard/infoCard";
// import InfoCard from "../../components/infoCard/infoCard";

const Analiktika = () => {
  return (
    <AnaliktikaCon>
      <Title>Аналитика</Title>
      <Analiktika__Cards>
        <InfoCard width={"50%"} title={"Регион"}>
          child
        </InfoCard>
        <InfoCard width={"25%"} title={"Ф.И.О. врача"}>
          child
        </InfoCard>
        <InfoCard width={"25%"} title={"Дата"}>
          child
        </InfoCard>
      </Analiktika__Cards>
    </AnaliktikaCon>
  );
};

export default Analiktika;
