import React, { useEffect, useState } from "react";
import { Container, FilterSection, FilterInput } from "./style.js";
import { TitleSmall } from "../../../../root/style.js";
import Input from "../../../../components/Generic/Input/Input.jsx";
import PrimarySelect from "../../../../components/Generic/Select/Select.jsx";
import {
  useGetDistricts,
  useGetRegions,
} from "../../../../utils/server/server.js";
import { useLanguage } from "../../../../context/LanguageContext.jsx";
import FieldnamesManager from "../../../../utils/fieldnamesManager.js";

const Filter = () => {
  const { translate, language } = useLanguage();

  const [selectedViloyat, setSelectedViloyat] = useState("");
  const [selectedTuman, setSelectedTuman] = useState("");
  const [nameSurname, setNameSurname] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("");

  const specializations = FieldnamesManager();

  const { data: regions, isLoading: isLoadingRegions } = useGetRegions();
  const { data: districts, isLoading: isLoadingDistricts } =
    useGetDistricts(selectedViloyat);

  useEffect(() => {
    setSelectedTuman(""); // Reset tuman when viloyat changes
  }, [selectedViloyat]);

  const getOptions = (items, language) => {
    console.log(items);

    return items?.map((item) => ({
      id: item.id,
      value: item["name"], // Using template literals to dynamically access properties based on language
    }));
  };

  const getOptionsDistricts = (items, language) => {
    console.log(items);

    return items?.map((item) => ({
      id: item?.districtId,
      value: item["name"], // Using template literals to dynamically access properties based on language
    }));
  };
  return (
    <Container>
      <TitleSmall>Поиск выписок по фильтрам</TitleSmall>
      <FilterSection>
        <Input
          onChange={(v) => setNameSurname(v)}
          placeholder={translate("Fullname")}
        />
        <PrimarySelect
          def={translate("область")}
          options={getOptions(regions, language)}
          onValueChange={(value) => setSelectedViloyat(value.id)}
          onlyOption={1}
        />
        <PrimarySelect
          def={translate("Район")}
          options={getOptionsDistricts(districts, language)}
          onValueChange={(value) => setSelectedTuman(value.id)}
          onlyOption={1}
        />
        <PrimarySelect def={translate("ЛПУ")} options={[]} />
        <PrimarySelect
          def="Специальность"
          options={specializations}
          onValueChange={(value) => setSelectedSpecialization(value.label)}
          onlyOption={1}
        />
      </FilterSection>
    </Container>
  );
};

export default Filter;
