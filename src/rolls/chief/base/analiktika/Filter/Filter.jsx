import React, { useState } from "react";
import { css } from "@emotion/react";
import { MiniTitleSmall } from "../../../../../root/style.js";
import { useLanguage } from "../../../../../context/LanguageContext.jsx";
import { FiltrWrapper } from "../Reports/style.js";
import { Form } from "../../../../../pages/manager/analiktika/style.js";
import Input2 from "../../../../../components/Generic/Input/Input2.jsx";
import PrimarySelect from "../../../../../components/Generic/Select/Select.jsx";
import DateRangePicker from "../../../../../components/Generic/DataRangePicker/DataRangePicker.jsx";
import { Tumanlar, Viloyatlar } from "../../../../../mock/data.js";

const FilterAnaliktika = ({ id }) => {
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
    fullName: "",
    region: "",
    city: "",
    kategoriya: "",
    speciality: "",
    preparation: "",
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
          <Input2
            type={"text"}
            placeholder={information?.palaceholder}
            onChange={handleChange}
            name="fullName"
          />
          <PrimarySelect
            def={information?.city}
            options={Viloyatlar}
            onValueChange={(value) => handleSelectChange(["city", value])}
          />
          <PrimarySelect
            def={information?.region}
            options={tuman}
            onValueChange={(value) => handleSelectChange(["region", value])}
          />
          <PrimarySelect
            def={information?.kategoriya}
            options={Viloyatlar}
            onValueChange={(value) => handleSelectChange(["kategoriya", value])}
          />
          <PrimarySelect
            def={information?.speciality}
            options={Viloyatlar}
            onValueChange={(value) => handleSelectChange(["speciality", value])}
          />
          <PrimarySelect
            def={information?.preparation}
            options={Viloyatlar}
            onValueChange={(value) =>
              handleSelectChange(["preparation", value])
            }
          />

          <DateRangePicker />
        </Form>
      </FiltrWrapper>
    </div>
  );
};

export default FilterAnaliktika;
