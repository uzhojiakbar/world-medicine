import React, { useState } from "react";
import {
  Container,
  FilterSection,
  FilterInput,
  Form,
  FiltrWrapper,
  PoSvetuWrapper,
  RadioWrapper,
  RadioCon,
  Radio,
} from "./style.js";
import { MiniTitleSmall, Title, TitleSmall } from "../../../root/style.js";

import { useLanguage } from "../../../context/LanguageContext.jsx";

import Input2 from "../../../components/Generic/Input/Input2.jsx";
import PrimarySelect from "../../../components/Generic/Select/Select.jsx";
import DateRangePicker from "../../../components/Generic/DataRangePicker/DataRangePicker.jsx";
import { Tumanlar, Viloyatlar } from "../../../mock/data.js";
import { css } from "@emotion/react";

const FilterReports = ({ id }) => {
  const { translate } = useLanguage();

  const information = {
    filterTitle: translate("Поиск_по_фильтрам"),
    palaceholder: translate("Fullname"),
    region: translate("область"),
    city: translate("Район"),
    kategoriya: translate("Категория"),
    speciality: translate("Специальность"),
    preparation: translate("Препарат"),
  };

  const [formData, setFormData] = useState({
    region: "",
    city: "",
    kategoriya: "",
    speciality: "",
    lpu: "",
    all: false,
  });

  const [tuman, setTuman] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value, // formData ichidagi qiymatni yangilash
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleSelectChange = ([name, value]) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value, // select uchun tanlangan qiymatni saqlash
    }));

    if (name === "city") {
      setTuman(Tumanlar[value]); // faqat region tanlanganida tumanlarni yangilash
    }
  };
  console.log(formData.all);

  return (
    <div
      className={css`
        display: flex;
        margin-bottom: 20px;
      `}
    >
      <FiltrWrapper>
        <MiniTitleSmall>{information.filterTitle}</MiniTitleSmall>
        <Form row="1" onSubmit={handleSubmit}>
          <PrimarySelect
            bgColor={"white"}
            def={information?.city}
            options={Viloyatlar}
            onValueChange={(value) => handleSelectChange(["city", value])}
          />
          <PrimarySelect
            bgColor={"white"}
            def={information?.region}
            options={tuman}
            onValueChange={(value) => handleSelectChange(["region", value])}
          />
          <PrimarySelect
            bgColor={"white"}
            def={translate("ЛПУ")}
            options={[]}
            onValueChange={(value) => handleSelectChange(["lpu", value])}
          />
          <PrimarySelect
            bgColor={"white"}
            def={information?.kategoriya}
            options={Viloyatlar}
            onValueChange={(value) => handleSelectChange(["kategoriya", value])}
          />
          <PrimarySelect
            bgColor={"white"}
            def={information?.speciality}
            options={Viloyatlar}
            onValueChange={(value) => handleSelectChange(["speciality", value])}
          />
          <PoSvetuWrapper>
            <MiniTitleSmall>{translate("По цвету")}</MiniTitleSmall>
            <RadioWrapper>
              <p>Все</p>
              <RadioCon
                all={`${formData.all}`}
                onClick={() => setFormData({ ...formData, all: !formData.all })}
              >
                <Radio all={`${formData.all}`} />
              </RadioCon>
            </RadioWrapper>
          </PoSvetuWrapper>

          <DateRangePicker bgColor={"white"} />
        </Form>
      </FiltrWrapper>
    </div>
  );
};

export default FilterReports;
