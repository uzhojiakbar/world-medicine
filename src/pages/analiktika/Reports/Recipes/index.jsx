import React, { useState } from "react";
import { FiltrContainer, Form, Header, TableWrapper, Wrapper } from "./style";
import { Title, TitleSmall } from "../../../../root/style";
import { MestaRabot, Tumanlar, Viloyatlar } from "../../../../mock/data";
import PrimarySelect from "../../../../components/Generic/Select/Select";
import Input2 from "../../../../components/Generic/Input/Input2";
import DateRangePicker from "../../../../components/Generic/DataRangePicker/DataRangePicker";
import GenericTable from "../../../../components/Generic/GenericTable/GenericTable.jsx";
import { useLanguage } from "../../../../context/LanguageContext.jsx";
import Table from "./Table.jsx";

const TableData = [
  {
    fio: "Иванов Дмитрий Евгеньевич",
    district: "Ташкент, 1 Гор. Больница",
    dateCreated: "20.12.2024",
    preparation: "Аналгин",
  },
  {
    fio: "Иванов Дмитрий Евгеньевич",
    district: "Ташкент, 1 Гор. Больница",
    dateCreated: "20.12.2024",
    preparation: "Аналгин",
  },
  {
    fio: "Иванов Дмитрий Евгеньевич",
    district: "Ташкент, 1 Гор. Больница",
    dateCreated: "20.12.2024",
    preparation: "Аналгин",
  },
  {
    fio: "Иванов Дмитрий Евгеньевич",
    district: "Ташкент, 1 Гор. Больница",
    dateCreated: "20.12.2024",
    preparation: "Аналгин",
  },
  {
    fio: "Иванов Дмитрий Евгеньевич",
    district: "Ташкент, 1 Гор. Больница",
    dateCreated: "20.12.2024",
    preparation: "Аналгин",
  },
  {
    fio: "Иванов Дмитрий Евгеньевич",
    district: "Ташкент, 1 Гор. Больница",
    dateCreated: "20.12.2024",
    preparation: "Аналгин",
  },
  {
    fio: "Иванов Дмитрий Евгеньевич",
    district: "Ташкент, 1 Гор. Больница",
    dateCreated: "20.12.2024",
    preparation: "Аналгин",
  },
  {
    fio: "Иванов Дмитрий Евгеньевич",
    district: "Ташкент, 1 Гор. Больница",
    dateCreated: "20.12.2024",
    preparation: "Аналгин",
  },
  {
    fio: "Иванов Дмитрий Евгеньевич",
    district: "Ташкент, 1 Гор. Больница",
    dateCreated: "20.12.2024",
    preparation: "Аналгин",
  },
  {
    fio: "Иванов Дмитрий Евгеньевич",
    district: "Ташкент, 1 Гор. Больница",
    dateCreated: "20.12.2024",
    preparation: "Аналгин",
  },
  {
    fio: "Иванов Дмитрий Евгеньевич",
    district: "Ташкент, 1 Гор. Больница",
    dateCreated: "20.12.2024",
    preparation: "Аналгин",
  },
  {
    fio: "Иванов Дмитрий Евгеньевич",
    district: "Ташкент, 1 Гор. Больница",
    dateCreated: "20.12.2024",
    preparation: "Аналгин",
  },
  {
    fio: "Иванов Дмитрий Евгеньевич",
    district: "Ташкент, 1 Гор. Больница",
    dateCreated: "20.12.2024",
    preparation: "Аналгин",
  },
  {
    fio: "Иванов Дмитрий Евгеньевич",
    district: "Ташкент, 1 Гор. Больница",
    dateCreated: "20.12.2024",
    preparation: "Аналгин",
  },
];

const Recipes = () => {
  const { translate } = useLanguage();

  const information = {
    title: translate("Рецепты"),
    filtrTitle: translate("Поиск_выписок_по_фильтрам"),
    inputData: {
      city: translate("область"),
      district: translate("Район"),
      place: translate("Место_работы"),
      preparation: translate("Препарат"),
      Специальность: translate("Специальность"),
      fullTitle: translate("Fullname"),
      Категория: translate("Категория"),
    },
    tableTitle: translate("Список_последних_выписанных_рецептов"),
    open: translate("Открыть"),
    tableData: {
      fullName: translate("Ф_Врача"),
      place: translate("Место_работы_врача"),
      date: translate("Дата_создания"),
      preparation: translate("Название_препарата"),
    },
  };

  const [selectedViloyat, setSelectedViloyat] = useState("");
  const [selectedTuman, setSelectedTuman] = useState("");
  const [SetKategoriya, setSetKategoriya] = useState("");

  const [formData, setFormData] = useState({
    city: selectedViloyat || "",
    district: selectedTuman || "",
    place: SetKategoriya || "",
    replace: "",
    preparation: "",
    fullName: "",
    Специальность: "",
  });

  const handleViloyatChange = (value) => {
    setSelectedViloyat(value);

    setFormData((prevFormData) => ({
      ...prevFormData,
      city: value, // formData ichidagi qiymatni yangilash
    }));

    setSelectedTuman("");
    setSetKategoriya("");
  };

  const handleTumanChange = (value) => {
    setSelectedTuman(value);
    setSetKategoriya("");

    setFormData((prevFormData) => ({
      ...prevFormData,
      district: value, // formData ichidagi qiymatni yangilash
    }));
  };

  const handelKategoryChange = (value) => {
    setSetKategoriya(value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      place: value, // formData ichidagi qiymatni yangilash
    }));
  };

  const handleChange = (e) => {
    let name,
      value = "";
    if (!Array.isArray(e)) {
      name = e.target.name;
      value = e.target.value;
    } else {
      name = e[0];
      value = e[1];
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value, // formData ichidagi qiymatni yangilash
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  console.log(formData);

  return (
    <Wrapper>
      <Header>
        <Title>{information.title}</Title>
        <FiltrContainer>
          <TitleSmall size="20px">{information.filtrTitle}</TitleSmall>
          <Form onSubmit={handleSubmit}>
            <Input2
              type={"text"}
              placeholder={information.inputData.fullTitle}
              onChange={handleChange}
              name="fullName"
            />

            <PrimarySelect
              def={information.inputData.city}
              options={Viloyatlar}
              onValueChange={handleViloyatChange}
            />
            <PrimarySelect
              def={information.inputData.district}
              options={Tumanlar[selectedViloyat] || []}
              onValueChange={handleTumanChange}
            />

            <PrimarySelect
              def={information.inputData["Категория"]}
              options={MestaRabot[selectedTuman] || []}
              onValueChange={handelKategoryChange}
            />
            {/* * */}

            <PrimarySelect
              def={information.inputData.Специальность}
              options={[]}
              onValueChange={(value) => handleChange(["Специальность", value])}
            />
            <PrimarySelect
              def={information.inputData.preparation}
              options={Viloyatlar}
              onValueChange={(value) => handleChange(["preparation", value])}
            />
            <DateRangePicker />
          </Form>
        </FiltrContainer>
      </Header>
      <TableWrapper>
        <Table title={Object.values(information.tableTitle)} data={TableData} />
      </TableWrapper>
    </Wrapper>
  );
};

export default Recipes;
