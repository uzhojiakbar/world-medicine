import React, { useCallback, useEffect, useState } from "react";
import { InformationTitleSpan, TitleSpan } from "../../../../root/style";
import { BaseDoctorCon, Line, NavTitleSection } from "./style";
import { useLanguage } from "../../../../context/LanguageContext";
import { Checkbox } from "antd";
import Input from "../../../../components/Generic/Input/Input";
import PrimarySelect from "../../../../components/Generic/Select/Select";
import { Viloyatlar, Tumanlar, MestaRabot } from "../../../../mock/data";
import { useNavigate } from "react-router-dom";
import {
  useGetDistricts,
  useGetDoctors,
  useGetRegions,
} from "../../../../utils/server/server";
import FieldnamesManager from "../../../../utils/fieldnamesManager";
import DateRangePicker from "../../../../components/Generic/DataRangePicker/DataRangePicker";

const information = {
  all: 500,
  fact: 200,
  new: 10,
};

const BaseDoctor = () => {
  const nav = useNavigate();
  const { translate, language } = useLanguage();

  const [selectedViloyat, setSelectedViloyat] = useState("");
  const [selectedTuman, setSelectedTuman] = useState("");
  const [selectedMestaRabot, setSelectedMestaRabot] = useState("");
  const [nameSurname, setNameSurname] = useState("");
  const [checked, setChecked] = useState(false);
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [date, setDate] = useState([]);

  const specializations = FieldnamesManager();

  const { data: regions, isLoading: isLoadingRegions } = useGetRegions();
  const { data: districts, isLoading: isLoadingDistricts } =
    useGetDistricts(selectedViloyat);
  const { data: doctors, isLoading: isLoadingDoctors } = useGetDoctors({
    regionId: selectedViloyat,
    districtId: selectedTuman ? selectedTuman : null,
  });

  const [filteredDoctors, setFilteredDoctors] = useState();

  useEffect(() => {
    if (selectedViloyat) {
      setSelectedTuman(""); // Reset tuman when viloyat changes
    }
    if (selectedSpecialization) {
      const filtered = doctors.filter(
        (doc) => doc.fieldName === selectedSpecialization
      );
      setFilteredDoctors(filtered);
    }
  }, [selectedViloyat, selectedSpecialization]);

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

  const handleDateChange = useCallback((dates) => setDate(dates), []);

  console.log("doctors", doctors);
  console.log("filteredDoctors", filteredDoctors);
  console.log("date", date);
  return (
    <BaseDoctorCon>
      {isLoadingDoctors || isLoadingDistricts || isLoadingRegions ? (
        <div className="loaderWindow">
          <div className="loader"></div>
        </div>
      ) : null}
      <NavTitleSection>
        <div className="section1">
          <TitleSpan>База врачей</TitleSpan>
          <InformationTitleSpan>
            {translate("Всего")} {information.all} вр
          </InformationTitleSpan>
          <Line />
          <InformationTitleSpan>
            {translate("По_факту")} {information.fact} вр
          </InformationTitleSpan>
          <Line />
          <InformationTitleSpan>
            {translate("Новых")} {information.new} вр
          </InformationTitleSpan>
        </div>
      </NavTitleSection>
      <div className="cards">
        <Input
          onChange={(e) => setNameSurname(e.target.value)}
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
        <PrimarySelect
          def={translate("Категория")}
          options={MestaRabot[selectedTuman] || []}
          onValueChange={setSelectedMestaRabot}
        />
        <PrimarySelect
          def="Select Specialization"
          options={specializations}
          onValueChange={(value) => setSelectedSpecialization(value.label)}
          onlyOption={1}
        />
        <PrimarySelect
          def={translate("Препарат")}
          options={MestaRabot[selectedTuman] || []}
          onValueChange={setSelectedMestaRabot}
        />
        <DateRangePicker onDateChange={handleDateChange} />
      </div>
      {filteredDoctors?.map((doctor) => (
        <div key={doctor.userId}>
          Doctor ID: {doctor.userId}, Specialization: {doctor.fieldName}
        </div>
      ))}
    </BaseDoctorCon>
  );
};

export default BaseDoctor;
