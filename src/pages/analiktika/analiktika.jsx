import React, { useState } from "react";
import { Analiktika__Cards, AnaliktikaCon } from "./style";
import { Title } from "../../root/style";
import InfoCard from "../../components/infoCard/infoCard";
import PrimarySelect from "../../components/Generic/Select/Select";
import { Viloyatlar, Tumanlar, MestaRabot } from "../../mock/data";
import Input from "../../components/Generic/Input/Input";
import DateRangePicker from "../../components/Generic/DataRangePicker/DataRangePicker";
import Information from "../../components/Information/Information";
import DrugsAnalictic from "../../components/DrugsAnalictic/DrugsAnalictic";
import ChartBlock from "../../components/ChartBlock/ChartBlock";
import PieDiagram from "../../components/PieDiagram/PieDiagram";

const Analiktika = () => {
  const [selectedViloyat, setSelectedViloyat] = useState("");
  const [selectedTuman, setSelectedTuman] = useState("");
  const [selectedMestaRabot, setSelectedMestaRabot] = useState("");
  const [nameSurname, setNameSurname] = useState("");

  const handleViloyatChange = (value) => {
    setSelectedViloyat(value);
    setSelectedTuman("");
    setSelectedMestaRabot("");
  };

  const handleTumanChange = (value) => {
    setSelectedTuman(value);
    setSelectedMestaRabot("");
  };

  const handleMestaRabotChange = (value) => {
    setSelectedMestaRabot(value);
  };

  return (
    <AnaliktikaCon>
      <Title>Аналитика</Title>
      <Analiktika__Cards type="type-1">
        <InfoCard title={"Регион"}>
          <PrimarySelect
            def={"область"}
            options={Viloyatlar}
            onValueChange={handleViloyatChange}
          />
          <PrimarySelect
            def={"Район"}
            options={Tumanlar[selectedViloyat] || []}
            onValueChange={handleTumanChange}
          />
          <PrimarySelect
            def={"Место работы"}
            options={MestaRabot[selectedTuman] || []}
            onValueChange={handleMestaRabotChange}
          />
        </InfoCard>

        <InfoCard title={"Ф.И.О. врача"}>
          <Input onChange={setNameSurname} placeholder={"Ф.И.О. врача"} />
        </InfoCard>

        <InfoCard title={"Дата"}>
          <DateRangePicker />
        </InfoCard>
      </Analiktika__Cards>
      <Analiktika__Cards type="type-2">
        <Information />
        <InfoCard
          title={"Все препараты"}
          rightBtn="Все"
          rightBtnFunc={() => {
            console.log("Clicker");
          }}
        >
          <DrugsAnalictic />
        </InfoCard>
      </Analiktika__Cards>
      <Analiktika__Cards type="type-3">
        <ChartBlock />
        <PieDiagram />
      </Analiktika__Cards>
    </AnaliktikaCon>
  );
};

export default Analiktika;
