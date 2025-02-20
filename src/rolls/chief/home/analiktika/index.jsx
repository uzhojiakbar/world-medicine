import React, { useState } from "react";
import {
  AllChartContainer,
  AppointmentWrapper,
  ChartContainer,
  Child,
  Container,
  FilterWrapper,
  Form,
  InfoContainer,
  InfoItem,
  Item,
  ItemWrapper,
  Wrapper,
  Title,
} from "./style";
import GenericAnalitikaTable from "./GenericTable";
import SalesChart from "./SelesChart";
import HorizontalChart from "../../../../components/HorizontalBar";
import ChartBar from "../../../../components/ChartBar";
import PieDiagram from "../../../../components/PieDiagram/PieDiagream2";
import Input2 from "../../../../components/Generic/Input/Input2";
import { Tumanlar } from "../../../../mock/data";
import PrimarySelect from "../../../../components/Generic/Select/Select";
import DateRangePicker from "../../../../components/Generic/DataRangePicker/DataRangePicker";
import { useLanguage } from "../../../../context/LanguageContext";

const AnalitikaChiefPage = () => {
  const { translate } = useLanguage();

  const [selectedTuman, setSelectedTuman] = useState("");
  const [active, setActive] = useState(1);

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
      { id: 1, viloyat: "Ташкентская", price: "5" },
      { id: 2, viloyat: "Сырдарьинская", price: "1" },
      { id: 3, viloyat: "Навоийская", price: "3" },
      { id: 4, viloyat: "Ферганская", price: "6" },
      { id: 5, viloyat: "Андижанская", price: "2" },
      { id: 6, viloyat: "Бухарская", price: "8" },
      { id: 7, viloyat: "Хорезмская", price: "4" },
      { id: 8, viloyat: "Кашкадарьинская", price: "1" },
      { id: 9, viloyat: "Навоийская", price: "4" },
    ],
  };

  const назначению = [
    { title: "1 Ношпа", price: "110" },
    { title: "4 Гастал", price: "110" },
    { title: "2 АЦЦ", price: "110" },
    { title: "5 Нафтизин", price: "110" },
    { title: "3 Терафлю", price: "110" },
    { title: "6 Марганцовка", price: "110" },
  ];

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
                <Title size={"24"}>{translate("Квота")}</Title>
                <Title size={"38"} title="true">
                  500 000
                </Title>
              </InfoItem>
              <InfoItem>
                <Title size={"24"}>{translate("Продажи")}</Title>
                <Title size={"38"} title="true">
                  400 000
                </Title>
              </InfoItem>
              <InfoItem>
                <Title size={"24"}>%</Title>
                <Title size={"38"} title="true">
                  70%
                </Title>
              </InfoItem>
            </InfoContainer>
          </FilterWrapper>
          <FilterWrapper>
            <GenericAnalitikaTable data={tableData} />
          </FilterWrapper>
        </ItemWrapper>
        <ItemWrapper>
          <FilterWrapper>
            <GenericAnalitikaTable data={tableData} />
          </FilterWrapper>
          <FilterWrapper>
            <GenericAnalitikaTable data={tableData} />
          </FilterWrapper>
        </ItemWrapper>
      </Wrapper>

      <AllChartContainer>
        <ChartContainer>
          <AppointmentWrapper>
            <Title size={"24"}>
              {translate("Топ")} {назначению.length}{" "}
              {translate("по назначению")}
            </Title>
            {назначению.map((v) => {
              return (
                <Item>
                  <div>{v.title}</div>
                  <div>
                    {v.price} {translate("шт")}.
                  </div>
                </Item>
              );
            })}
          </AppointmentWrapper>
          <AppointmentWrapper>
            <SalesChart title={"Статистика продаж"} active={active} />
          </AppointmentWrapper>
        </ChartContainer>

        <ChartContainer>
          <AppointmentWrapper gap={"20px"}>
            <Child>
              <PieDiagram
                item={["Рецепт", "СБ", "СУ", "ГЭ"]}
                bgColor={["#001EB9", "#FF5B99", "#C4D9FF", "#35FF50"]}
                title={translate("Инвестиции_по_упаковкам")}
              />
              <PieDiagram
                item={["Рецепт", "СБ", "СУ", "ГЭ"]}
                bgColor={["#001EB9", "#FF5B99", "#C4D9FF", "#35FF50"]}
                title={translate("Инвестиции_по_сумме")}
              />
            </Child>
            <Child>
              <Child>
                <SalesChart
                  title={"Статистика выполнение задач"}
                  active={active}
                  seles={["Выполнено", "Квота"]}
                />
              </Child>
              <Child>
                <PieDiagram
                  item={["Рецепт", "СБ", "СУ", "ГЭ"]}
                  bgColor={["#001EB9", "#FF5B99", "#C4D9FF", "#35FF50"]}
                  title={translate("Рецептов_в_месяц")}
                />
              </Child>
            </Child>
            {/*<Child>*/}
            {/*  <HorizontalChart title={"Продажа препаратов по регионам"} />*/}
            {/*  <ChartBar title={"Активность врачей"} active={active} />*/}
            {/*</Child>*/}
          </AppointmentWrapper>
        </ChartContainer>
      </AllChartContainer>
    </Container>
  );
};

export default AnalitikaChiefPage;
