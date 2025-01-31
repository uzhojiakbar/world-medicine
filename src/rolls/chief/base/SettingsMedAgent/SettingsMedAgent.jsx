import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "antd";
import { Title, TitleSmall } from "../../../../root/style";
import Button from "../../../../components/Generic/Button/Button";
import IconPlus from "../../../../assets/svg/IconPlus";
import Input from "../../../../components/Generic/Input/Input";
import PrimarySelect from "../../../../components/Generic/Select/Select";
import { Viloyatlar, Tumanlar, MestaRabot } from "../../../../mock/data";
import Table from "./Table";
import { useLanguage } from "../../../../context/LanguageContext";
import { useGetManagers } from "../../../../utils/server/server";
import { FilterCardsWrapper } from "../../../../pages/admin/settingSystemAdmin/style";

const SettingsMedAgent = ({ id }) => {
  const nav = useNavigate();
  const { translate } = useLanguage();

  const [selectedViloyat, setSelectedViloyat] = useState("");
  const [selectedTuman, setSelectedTuman] = useState("");
  const [selectedMestaRabot, setSelectedMestaRabot] = useState("");
  const [nameSurname, setNameSurname] = useState("");
  const [checked, setChecked] = useState(false);

  // Filterlar asosida ma'lumot olish
  const { data: Managers, isLoading } = useGetManagers({
    creatorId: checked ? "currentUserId" : null, // Agarda checkbox bosilgan bo'lsa, foydalanuvchi ID sini qo'shish
    countryId: null, // Agar kerak bo'lsa, qo'shish
    regionId: selectedViloyat || null,
    workplaceId: selectedMestaRabot || null,
    nameQuery: nameSurname || null,
  });

  return (
    <div id={id || "administration"}>
      <Title>
        <span>{translate("Мед_представители")}</span>
        <Button onClick={() => nav("../create-manager")} icon={<IconPlus />}>
          {translate("Добавить_мед_представителя")}
        </Button>
      </Title>

      <FilterCardsWrapper>
        <TitleSmall>{translate("врача_по_фильтрам")}</TitleSmall>
        <div className="cards">
          <PrimarySelect
            def={translate("область")}
            options={Viloyatlar}
            onValueChange={setSelectedViloyat}
          />
          <PrimarySelect
            def={translate("Район")}
            options={Tumanlar[selectedViloyat] || []}
            onValueChange={setSelectedTuman}
          />
          <PrimarySelect
            def={translate("Место_работы")}
            options={MestaRabot[selectedTuman] || []}
            onValueChange={setSelectedMestaRabot}
          />
          <Input
            onChange={setNameSurname}
            placeholder={translate("Fullname_doctor")}
          />
          <Checkbox
            onChange={(e) => setChecked(e.target.checked)}
            checked={checked}
          >
            {translate("Назначен_мною")}
          </Checkbox>
        </div>
      </FilterCardsWrapper>

      <Table data={Managers || []} isLoading={isLoading} />
    </div>
  );
};

export default SettingsMedAgent;
