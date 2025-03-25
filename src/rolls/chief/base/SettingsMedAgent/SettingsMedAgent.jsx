import React, {useMemo, useState} from "react";
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
import {useGetDistricts, useGetMedAgents, useGetProfileInfo, useGetRegions} from "../../../../utils/server/server";
import { FilterCardsWrapper } from "../../../../pages/admin/settingSystemAdmin/style";
import {transformDistrictsForSelect, transformRegionsForSelect} from "../../../../utils/transformRegionsForSelect.js";

const SettingsMedAgent = ({ id }) => {
  const nav = useNavigate();
  const { translate,language } = useLanguage();

  const [selectedViloyat, setSelectedViloyat] = useState("");
  const [selectedTuman, setSelectedTuman] = useState("");
  const [selectedMestaRabot, setSelectedMestaRabot] = useState("");
  const [nameSurname, setNameSurname] = useState("");
  const [checked, setChecked] = useState(false);

  const {data: profileInfo, isLoading: IsLoadingProfileInfo} =
      useGetProfileInfo();

  const {data: regions, isLoading: isLoadingRegions} = useGetRegions();
  const {data: districts, isLoading: isLoadingDistricts} =
      useGetDistricts(selectedViloyat);

  // Filterlar asosida ma'lumot olish
  const { data: MedAgents, isLoading } = useGetMedAgents({
    creatorId: checked ? profileInfo?.userId : null, // Agarda checkbox bosilgan bo'lsa, foydalanuvchi ID sini qo'shish
    countryId: null, // Agar kerak bo'lsa, qo'shish
    regionId: selectedViloyat || null,
    districtId: selectedTuman || null,
    nameQuery: nameSurname || null,
  });



  const regionsTranslate = useMemo(
      () => transformRegionsForSelect(regions, language),
      [regions, translate]
  );

  const districtsTranslate = useMemo(
      () => transformDistrictsForSelect(districts, language),
      [districts, translate]
  );

  return (
    <MainWrapperGap id={id || "administration"}>
      <Title>
        <span>{translate("Мед_представители")}</span>
        <Button onClick={() => nav("../create-med-agent")} icon={<IconPlus />}>
          {translate("Добавить_мед_представителя")}
        </Button>
      </Title>

      <FilterCardsWrapper grid={4}>
        <TitleSmall>{translate("manager_filter")}</TitleSmall>
        <div className="cards">
          <PrimarySelect
              def={translate("область")}
              options={regionsTranslate}
              onValueChange={(value) => setSelectedViloyat(value.id)}
              onlyOption={1}
          />
          <PrimarySelect
              def={translate("Район")}
              options={districtsTranslate}
              onValueChange={(value) => setSelectedTuman(value.districtId)}
              onlyOption={1}
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


      <Table data={MedAgents || []} isLoading={isLoading || isLoadingRegions || isLoadingDistricts || IsLoadingProfileInfo} />
    </MainWrapperGap>
  );
};

export default SettingsMedAgent;
