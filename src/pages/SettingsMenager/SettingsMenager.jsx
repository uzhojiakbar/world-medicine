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

  return (
    <>
      <Title>
        <span>Управление менеджерами</span>
        <Button onClick={() => nav("../create-contract")} icon={<IconPlus />}>
          Добавить менеджера
        </Button>
      </Title>

      <FilterCardsWrapper>
        <TitleSmall>Поиск менеджера / врача по фильтрам</TitleSmall>
        <div className="cards">
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

          <Input onChange={setNameSurname} placeholder={"Ф.И.О. врача"} />
          <Checkbox onChange={onChangeCheckbox} checked={checked}>
            Назначен мною
          </Checkbox>
        </div>
      </FilterCardsWrapper>

      <Table data={Managers || []} />
    </>
  );
};

export default SettingsMenager;
