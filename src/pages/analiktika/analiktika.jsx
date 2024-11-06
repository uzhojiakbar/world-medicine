import React, { useState } from "react";
import { Analiktika__Cards, AnaliktikaCon } from "./style";
import { Title } from "../../root/style";
import InfoCard from "../../components/infoCard/infoCard";
import PrimarySelect from "../../components/Generic/Select/Select";
import { Viloyatlar, Tumanlar, MestaRabot } from "../../mock/data";
import Input from "../../components/Generic/Input/Input";
import DateRangePicker from "../../components/Generic/DataRangePicker/DataRangePicker";

const Analiktika = () => {
  const [selectedViloyat, setSelectedViloyat] = useState("");
  const [selectedTuman, setSelectedTuman] = useState("");
  const [selectedMestaRabot, setSelectedMestaRabot] = useState("");
  const [nameSurname, setNameSurname] = useState("");

  const handleViloyatChange = (value) => {
    setSelectedViloyat(value);
    setSelectedTuman(""); // Tumanni tozalash
    setSelectedMestaRabot(""); // MestaRabotni tozalash
  };

  const handleTumanChange = (value) => {
    setSelectedTuman(value);
    setSelectedMestaRabot(""); // MestaRabotni tozalash
  };

  const handleMestaRabotChange = (value) => {
    setSelectedMestaRabot(value);
  };

  return (
    <AnaliktikaCon>
      <Title>Аналитика</Title>
      <Analiktika__Cards>
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
          <Input placeholder={"Ф.И.О. врача"} />
        </InfoCard>

        <InfoCard title={"Дата"}>
          {/* Foydalanuvchining sana diapazonini tanlash */}
          <DateRangePicker />
        </InfoCard>
      </Analiktika__Cards>
    </AnaliktikaCon>
  );
};

export default Analiktika;
