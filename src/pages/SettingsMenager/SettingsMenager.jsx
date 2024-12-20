import React, { useState } from "react";
import { Title, TitleSmall } from "../../root/style";
import Button from "../../components/Generic/Button/Button";
import IconPlus from "../../assets/svg/IconPlus";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Generic/Input/Input";
import PrimarySelect from "../../components/Generic/Select/Select";
import { Viloyatlar, Tumanlar, MestaRabot } from "../../mock/data";
// import { Container,  } from "./";
import { Checkbox } from "antd";
import { FilterCardsWrapper } from "../admin/settingSystemAdmin/style";
import Table from "./Table";
import { Managers } from "../../mock/managers";
import { useLanguage } from "../../context/LanguageContext";

const SettingsMenager = () => {
  const nav = useNavigate();

  const [selectedViloyat, setSelectedViloyat] = useState("");
  const [selectedTuman, setSelectedTuman] = useState("");
  const [selectedMestaRabot, setSelectedMestaRabot] = useState("");
  const [nameSurname, setNameSurname] = useState("");
  const [active, setActive] = useState(1);

  const [checked, setChecked] = useState(false);

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

  const onChangeCheckbox = (e) => {
    console.log(`Checked: ${e.target.checked}`);
    setChecked(e.target.checked);
  };

  const { translate } = useLanguage();

  return (
    <>
      <Title>
        <span>{translate("Управление_менеджерами")}</span>
        <Button onClick={() => nav("../create-manager")} icon={<IconPlus />}>
          {translate("Добавить_менеджера")}
        </Button>
      </Title>

      <FilterCardsWrapper>
        <TitleSmall> {translate("врача_по_фильтрам")}</TitleSmall>
        <div className="cards">
          <PrimarySelect
            def={translate("область")}
            options={Viloyatlar}
            onValueChange={handleViloyatChange}
          />
          <PrimarySelect
            def={translate("Район")}
            options={Tumanlar[selectedViloyat] || []}
            onValueChange={handleTumanChange}
          />
          <PrimarySelect
            def={translate("Место_работы")}
            options={MestaRabot[selectedTuman] || []}
            onValueChange={handleMestaRabotChange}
          />

          <Input
            onChange={setNameSurname}
            placeholder={translate("Fullname_doctor")}
          />
          <Checkbox onChange={onChangeCheckbox} checked={checked}>
            {translate("Назначен_мною")}
          </Checkbox>
        </div>
      </FilterCardsWrapper>

      <Table data={Managers || []} />
    </>
  );
};

export default SettingsMenager;
