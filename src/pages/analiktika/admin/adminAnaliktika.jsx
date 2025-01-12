import React, { useState } from "react";
import { Analiktika__Cards, AnaliktikaCon } from "./style";
import { Title } from "../../../root/style";
import InfoCard from "../../../components/infoCard/infoCard";
import PrimarySelect from "../../../components/Generic/Select/Select";
import { Viloyatlar, Tumanlar, MestaRabot } from "../../../mock/data";
import Input from "../../../components/Generic/Input/Input";
import DateRangePicker from "../../../components/Generic/DataRangePicker/DataRangePicker";
import Information from "../../../components/Information/Information";
import DrugsAnalictic from "../../../components/DrugsAnalictic/DrugsAnalictic";
import ChartBlock from "../../../components/ChartBlock/ChartBlock";
import QuickAccess from "../../admin/quickAccess/quickAccess";
import { useLanguage } from "../../../context/LanguageContext";
import Reports from "../../admin/Reports/Reports";
import EyeIcon from "../../../assets/svg/Eye";
import SystemIcon from "../../../assets/svg/SystemIcon";
import BDIcon from "../../../assets/svg/BDIcon";
import { useNavigate } from "react-router-dom";

const AdminAnaliktika = () => {
  const [selectedViloyat, setSelectedViloyat] = useState("");
  const [selectedTuman, setSelectedTuman] = useState("");
  const [selectedMestaRabot, setSelectedMestaRabot] = useState("");
  const [nameSurname, setNameSurname] = useState("");
  const [active, setActive] = useState(1);

  const nav = useNavigate();

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

  const { translate } = useLanguage(); // Tarjima funksiyasi
  const data = [
    {
      id: 1,
      name: translate("Отчеты"),
      icon: <EyeIcon />,
      onclick: () => {
        nav("analiktika");
      },
    },
    {
      id: 2,
      name: translate("Администрирование"),
      icon: <SystemIcon />,
      onclick: () => {
        nav("upravleniya-sistemoy#administration");
        console.log("button clickd");
      },
    },
    {
      id: 3,
      name: translate("Настройка_условий"),
      icon: <BDIcon />,
      onclick: () => {
        nav("nastroyka-usloviya");
      },
    },
  ];

  return (
    <AnaliktikaCon>
      <Title>{translate("quick_access")}</Title>
      <QuickAccess data={data} />
      <Title>{translate("navbar_admin_analiktika")}</Title>
      <Analiktika__Cards.Con>
        <Analiktika__Cards type="type-1">
          <InfoCard padding={"5px 5px"} title={"Регион"}>
            <PrimarySelect
              def={translate("область")}
              translateDef={"область"}
              options={Viloyatlar}
              onValueChange={handleViloyatChange}
            />
            <PrimarySelect
              def={translate("Район")}
              options={Tumanlar[selectedViloyat] || []}
              onValueChange={handleTumanChange}
            />
            <PrimarySelect
              def={"Место работы"}
              options={MestaRabot[selectedTuman] || []}
              onValueChange={handleMestaRabotChange}
            />
          </InfoCard>

          <InfoCard padding={"5px 5px"} title={"Ф.И.О. врача"}>
            <Input onChange={setNameSurname} placeholder={"Ф.И.О. врача"} />
          </InfoCard>

          <InfoCard padding={"5px 5px"} title={"Дата"}>
            <DateRangePicker />
          </InfoCard>
          <Information admin={1} active={active} setActive={setActive} />
        </Analiktika__Cards>
        <Analiktika__Cards type="type-1">
          <InfoCard
            title={"Все препараты"}
            rightBtn="Все"
            rightBtnFunc={() => {
              console.log("Clicker");
            }}
          >
            <DrugsAnalictic />
          </InfoCard>
          <ChartBlock admin={1} active={active} />
        </Analiktika__Cards>
      </Analiktika__Cards.Con>
      <Title>Отчеты</Title>
      <Reports />
    </AnaliktikaCon>
  );
};

export default AdminAnaliktika;
