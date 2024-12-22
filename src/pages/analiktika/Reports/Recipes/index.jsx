import React, { useState } from "react";
import { FiltrContainer, Form, Header, TableWrapper, Wrapper } from "./style";
import { Title, TitleSmall } from "../../../../root/style";
import { MestaRabot, Tumanlar, Viloyatlar } from "../../../../mock/data";
import PrimarySelect from "../../../../components/Generic/Select/Select";
import Input2 from "../../../../components/Generic/Input/Input2";
import DateRangePicker from "../../../../components/Generic/DataRangePicker/DataRangePicker";
import GenericTable from "../../../../components/Generic/GenericTable/GenericTable.jsx";
const TableData = [
  {
    title: "Иванов Дмитрий Евгеньевич",
    replace: "Ташкент, 1 Гор. Больница",
    date: "Создан 20.12.2024",
    preparation: "Аналгин",
  },
  {
    title: "Иванов Дмитрий Евгеньевич",
    replace: "Ташкент, 1 Гор. Больница",
    date: "Создан 20.12.2024",
    preparation: "Аналгин",
  },
  {
    title: "Иванов Дмитрий Евгеньевич",
    replace: "Ташкент, 1 Гор. Больница",
    date: "Создан 20.12.2024",
    preparation: "Аналгин",
  },
  {
    title: "Иванов Дмитрий Евгеньевич",
    replace: "Ташкент, 1 Гор. Больница",
    date: "Создан 20.12.2024",
    preparation: "Аналгин",
  },
  {
    title: "Иванов Дмитрий Евгеньевич",
    replace: "Ташкент, 1 Гор. Больница",
    date: "Создан 20.12.2024",
    preparation: "Аналгин",
  },
  {
    title: "Иванов Дмитрий Евгеньевич",
    replace: "Ташкент, 1 Гор. Больница",
    date: "Создан 20.12.2024",
    preparation: "Аналгин",
  },
  {
    title: "Иванов Дмитрий Евгеньевич",
    replace: "Ташкент, 1 Гор. Больница",
    date: "Создан 20.12.2024",
    preparation: "Аналгин",
  },
  {
    title: "Иванов Дмитрий Евгеньевич",
    replace: "Ташкент, 1 Гор. Больница",
    date: "Создан 20.12.2024",
    preparation: "Аналгин",
  },
  {
    title: "Иванов Дмитрий Евгеньевич",
    replace: "Ташкент, 1 Гор. Больница",
    date: "Создан 20.12.2024",
    preparation: "Аналгин",
  },
  {
    title: "Иванов Дмитрий Евгеньевич",
    replace: "Ташкент, 1 Гор. Больница",
    date: "Создан 20.12.2024",
    preparation: "Аналгин",
  },
  {
    title: "Иванов Дмитрий Евгеньевич",
    replace: "Ташкент, 1 Гор. Больница",
    date: "Создан 20.12.2024",
    preparation: "Аналгин",
  },
  {
    title: "Иванов Дмитрий Евгеньевич",
    replace: "Ташкент, 1 Гор. Больница",
    date: "Создан 20.12.2024",
    preparation: "Аналгин",
  },
  {
    title: "Иванов Дмитрий Евгеньевич",
    replace: "Ташкент, 1 Гор. Больница",
    date: "Создан 20.12.2024",
    preparation: "Аналгин",
  },
  {
    title: "Иванов Дмитрий Евгеньевич",
    replace: "Ташкент, 1 Гор. Больница",
    date: "Создан 20.12.2024",
    preparation: "Аналгин",
  },
];

const Recipes = () => {
  const information = {
    title: "Рецепты",
    filtrTitle: "Поиск выписок по фильтрам",
    inputData: {
      city: "Oбласть",
      district: "Район",
      place: "Место работы",
      preparation: "Препарат",
      fullTitle: "Ф.И.О",
    },
    tableTitle: "Список последних выписанных рецептов",
    open: "Открыть",
    tableData: {
      fullName: "Ф.И.О. Врача",
      place: "Место работы врача",
      date: "Дата создания",
      preparation: "Название препарата",
    },
  };

  const [formData, setFormData] = useState({
    city: "",
    replace: "",
    preparation: "",
    fullName: "",
  });
  const [selectedViloyat, setSelectedViloyat] = useState("");
  const [selectedTuman, setSelectedTuman] = useState("");
  const [selectedMestaRabot, setSelectedMestaRabot] = useState("");

  const handleViloyatChange = (value) => {
    setSelectedViloyat(value);
    setSelectedTuman("");
    setSelectedMestaRabot("");
  };

  const handleTumanChange = (value) => {
    console.log(MestaRabot[value]);

    setSelectedTuman(value);
    setSelectedMestaRabot("");
  };

  const handleMestaRabotChange = (value) => {
    setSelectedMestaRabot(value);
  };

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

  return (
    <Wrapper>
      <Header>
        <Title>{information.title}</Title>
        <FiltrContainer>
          <TitleSmall size="20px">{information.filtrTitle}</TitleSmall>
          <Form onSubmit={handleSubmit}>
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
              def={information.inputData.fullTitle}
              options={MestaRabot[selectedTuman] || []}
              onValueChange={handleMestaRabotChange}
            />

            <PrimarySelect
              def={information.inputData.preparation}
              options={[]}
              onValueChange={(value) => handleSelectChange(["place", value])}
            />
            <Input2
              type={"text"}
              placeholder={information.inputData.fullTitle}
              onChange={handleChange}
              name="fullName"
            />

            <DateRangePicker />
          </Form>
        </FiltrContainer>
      </Header>
      <TableWrapper>
        <TitleSmall size="20px">{information.tableTitle}</TitleSmall>
        <GenericTable
          thead={Object.values(information.tableData)}
          data={TableData}
        />
      </TableWrapper>
    </Wrapper>
  );
};

export default Recipes;
