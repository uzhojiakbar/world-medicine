import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "antd";
import { MainWrapperGap, Title, TitleSmall } from "../../../../root/style";
import Button from "../../../../components/Generic/Button/Button";
import IconPlus from "../../../../assets/svg/IconPlus";
import Input from "../../../../components/Generic/Input/Input";
import PrimarySelect from "../../../../components/Generic/Select/Select";
import { Viloyatlar, Tumanlar, MestaRabot } from "../../../../mock/data";
import Table from "./Table";
import { useLanguage } from "../../../../context/LanguageContext";
import { useGetMedAgents } from "../../../../utils/server/server";
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
  const { data: MedAgents, isLoading } = useGetMedAgents({
    creatorId: checked ? "currentUserId" : null, // Agarda checkbox bosilgan bo'lsa, foydalanuvchi ID sini qo'shish
    countryId: null, // Agar kerak bo'lsa, qo'shish
    regionId: selectedViloyat || null,
    workplaceId: selectedMestaRabot || null,
    nameQuery: nameSurname || null,
  });

  return (
    <MainWrapperGap id={id || "administration"}>
      <Title>
        <span>{translate("Мед_представители")}</span>
        <Button onClick={() => nav("../create-med-agent")} icon={<IconPlus />}>
          {translate("Добавить_мед_представителя")}
        </Button>
      </Title>

      <Table title={translate("Мед_представители")} data={MedAgents || []} isLoading={isLoading} />
    </MainWrapperGap>
  );
};

export default SettingsMedAgent;
