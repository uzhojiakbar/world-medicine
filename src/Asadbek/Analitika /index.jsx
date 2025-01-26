import React, { useState } from "react";
import {
  Container,
  FilterWrapper,
  Form,
  InfoContainer,
  InfoItem,
  ItemWrapper,
  Wrapper,
} from "./style";
import { Title } from "../../root/style";
import { useLanguage } from "../../context/LanguageContext";
import DateRangePicker from "../../components/Generic/DataRangePicker/DataRangePicker";
import PrimarySelect from "../../components/Generic/Select/Select";
import { Tumanlar } from "../../mock/data";
import Input2 from "../../components/Generic/Input/Input2";
import GenericAnalitikaTable from "./GenericTable";

const AnalitikaManagerPage = () => {
  const { translate } = useLanguage();

  const [selectedTuman, setSelectedTuman] = useState("");

  const [formData, setFormData] = useState({
    district: selectedTuman || "",
    preparation: "",
    fullName: "",
    Специальность: "",
    lpu: "",
  });

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
  const tableData = {
    thead: {
      viloyat: "Регион",
      price: "Кол-во сотрудников",
    },
    tbody: [
      { id: 1, viloyat: "Ташкентская", price: "1" },
      { id: 2, viloyat: "Сырдарьинская", price: "1" },
      { id: 3, viloyat: "Навоийская", price: "1" },
      { id: 4, viloyat: "Ферганская", price: "1" },
      { id: 5, viloyat: "Андижанская", price: "1" },
      { id: 6, viloyat: "Бухарская", price: "1" },
      { id: 7, viloyat: "Хорезмская", price: "1" },
      { id: 8, viloyat: "Кашкадарьинская", price: "1" },
      { id: 9, viloyat: "Навоийская", price: "1" },
      { id: 10, viloyat: "Ферганская", price: "1" },
      { id: 11, viloyat: "Андижанская", price: "1" },
      { id: 12, viloyat: "Бухарская", price: "1" },
    ],
  };

  return (
    <Container>
      <Title>{translate("Аналитика")}</Title>

      <Wrapper>
        <ItemWrapper>
          <FilterWrapper>
            <Form>
              <PrimarySelect
                def={translate("Район")}
                options={Tumanlar["Ташкент"] || []}
                onValueChange={(value) => handleChange(["district", value])}
              />
              <PrimarySelect
                def={translate("ЛПУ")}
                options={[]}
                onValueChange={(value) => handleChange(["lpu", value])}
              />

              {/* * */}

              <PrimarySelect
                def={translate("Специальность")}
                options={[]}
                onValueChange={(value) =>
                  handleChange(["Специальность", value])
                }
              />
              <Input2
                type={"text"}
                placeholder={translate("Ф.И.О")}
                onChange={handleChange}
                name="fullName"
              />
              <PrimarySelect
                def={translate("Препарат")}
                options={[]}
                onValueChange={(value) => handleChange(["preparation", value])}
              />
              <DateRangePicker />
            </Form>
            <InfoContainer>
              <InfoItem>
                <Title size={"24px"}>{translate("Квота")}</Title>
                <Title size={"38px"}>500 000</Title>
              </InfoItem>
              <InfoItem>
                <Title size={"24px"}>{translate("Продажи")}</Title>
                <Title size={"38px"}>400 000</Title>
              </InfoItem>
              <InfoItem>
                <Title size={"24px"}>%</Title>
                <Title size={"38px"}>70%</Title>
              </InfoItem>
            </InfoContainer>
          </FilterWrapper>
          <FilterWrapper>
            <GenericAnalitikaTable data={tableData} />
          </FilterWrapper>
        </ItemWrapper>
      </Wrapper>
    </Container>
  );
};

export default AnalitikaManagerPage;
