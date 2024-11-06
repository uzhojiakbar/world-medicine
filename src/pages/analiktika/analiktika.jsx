import React, { useState, useEffect } from "react";
import { Analiktika__Cards, AnaliktikaCon } from "./style";
import { Title } from "../../root/style";
import InfoCard from "../../components/infoCard/infoCard";
import PrimarySelect from "../../components/Select/Select";
import { Viloyatlar, Tumanlar, MestaRabot } from "../../mock/data";

const Analiktika = () => {
  const [selectedViloyat, setSelectedViloyat] = useState("");
  const [selectedTuman, setSelectedTuman] = useState("");
  const [selectedMestaRabot, setSelectedMestaRabot] = useState("");

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
        <InfoCard width={"50%"} title={"Регион"}>
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
        <InfoCard width={"25%"} title={"Ф.И.О. врача"}>
          {/* Other Content */}
        </InfoCard>
        <InfoCard width={"25%"} title={"Дата"}>
          {/* Other Content */}
        </InfoCard>
      </Analiktika__Cards>
    </AnaliktikaCon>
  );
};

export default Analiktika;
