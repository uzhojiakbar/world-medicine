import React, { useState } from "react";
import {
  FiltrWrapper,
  Header,
  IconWrapper,
  Form,
  Item,
  Wrapper,
  Main,
  Section,
  Article,
  InfoCard,
  InfoTitle,
  Footer,
} from "./style";
import { MiniTitleSmall, Title } from "../../../root/style";
import DownloadIcon from "../../../assets/svg/download.jsx";
import PrintIcon from "../../../assets/svg/print.jsx";
import Input2 from "../../../components/Generic/Input/Input2";
import PrimarySelect from "../../../components/Generic/Select/Select";
import { Tumanlar, Viloyatlar } from "../../../mock/data";
import DateRangePicker from "../../../components/Generic/DataRangePicker/DataRangePicker";
import PieDiagram2 from "../../../components/PieDiagram/PieDiagream2";
import SalesChart2 from "../../../components/SalesChart/SalesChar2.jsx";
import ChartBar from "../../../components/ChartBar";
import HorizontalChart from "../../../components/HorizontalBar/index";
import Recipes from "./Recipes/index.jsx";

const Reports = () => {
  const information = {
    title: "Отчеты",
    filterTitle: "Поиск выписок по фильтрам",
    inputData: {
      palaceholder: "Ф.И.О",
      region: "Oбласть",
      city: "Район",
      kategoriya: "Категория",
      speciality: "Специальность",
      preparation: "Препарат",
    },
  };

  const infoAnalitika = {
    top: [
      {
        id: 1,
        title: "Квота",
        count: "500 000",
      },
      {
        id: 2,
        title: "Продажа в упаковках",
        count: "250 000",
      },
    ],
    bottom: [
      {
        id: 3,
        title: "Процент выполнения",
        count: "50%",
      },
      {
        id: 4,
        title: "Доступный процент",
        count: "13%",
      },
      {
        id: 5,
        title: "Доступно в сумме",
        count: "156 000 000",
      },
      {
        id: 6,
        title: "Квота",
        count: "155 000 000",
      },
    ],
  };

  const [active, setActive] = useState(1);
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
    <Wrapper>
      <Recipes />
      {/* <Header>
        <Title>{information.title}</Title>
        <Item>
          <IconWrapper>
            <DownloadIcon />
          </IconWrapper>
          <IconWrapper>
            <PrintIcon />
          </IconWrapper>
        </Item>
      </Header>
      <FiltrWrapper>
        <MiniTitleSmall>{information.filterTitle}</MiniTitleSmall>
        <Form onSubmit={handleSubmit}>
          <Input2
            type={"text"}
            placeholder={information.inputData.palaceholder}
            onChange={handleChange}
            name="fullName"
          />
          <PrimarySelect
            def={information.inputData.city}
            options={Viloyatlar}
            onValueChange={(value) => handleSelectChange(["city", value])}
          />
          <PrimarySelect
            def={information.inputData.region}
            options={tuman}
            onValueChange={(value) => handleSelectChange(["region", value])}
          />
          <PrimarySelect
            def={information.inputData.kategoriya}
            options={Viloyatlar}
            onValueChange={(value) => handleSelectChange(["kategoriya", value])}
          />
          <PrimarySelect
            def={information.inputData.speciality}
            options={Viloyatlar}
            onValueChange={(value) => handleSelectChange(["speciality", value])}
          />
          <PrimarySelect
            def={information.inputData.preparation}
            options={Viloyatlar}
            onValueChange={(value) =>
              handleSelectChange(["preparation", value])
            }
          />

          <DateRangePicker />
        </Form>
      </FiltrWrapper>

      <Main>
        <Section>
          <Article>
            {infoAnalitika.top.map((v) => {
              return (
                <InfoCard
                  active={active === v.id ? "true" : ""}
                  onClick={() => setActive(v.id)}
                >
                  <MiniTitleSmall>{v.title}</MiniTitleSmall>
                  <InfoTitle active={active === v.id ? "true" : ""}>
                    {v.count}
                  </InfoTitle>
                </InfoCard>
              );
            })}
          </Article>
          <Article>
            {infoAnalitika.bottom.map((v) => {
              return (
                <InfoCard
                  active={active === v.id ? "true" : ""}
                  onClick={() => setActive(v.id)}
                >
                  <MiniTitleSmall>{v.title}</MiniTitleSmall>
                  <InfoTitle active={active === v.id ? "true" : ""}>
                    {v.count}
                  </InfoTitle>
                </InfoCard>
              );
            })}
          </Article>
        </Section>

        <Footer>
          <PieDiagram2
            item={["Рецепт", "СБ", "СУ", "ГЭ"]}
            bgColor={["#001EB9", "#FF5B99", "#C4D9FF", "#35FF50"]}
            title="По упаковкам"
          />
          <PieDiagram2
            item={["Рецепт", "СБ", "СУ", "ГЭ"]}
            bgColor={["#001EB9", "#FF5B99", "#C4D9FF", "#35FF50"]}
            title="По сумме"
          />
          <SalesChart2 title={"Статистика выполнения KPI"} active={active} />
          <PieDiagram2
            item={["Ташкент", "Андижан.", "Самарканд"]}
            count={[500, 400, 387]}
            countType="шт"
            bgColor={["#001EB9", "#FF5B99", "#C4D9FF"]}
            title="По сумме"
          />
          <ChartBar title={"Активность врачей"} active={active} />
          <HorizontalChart title={"Продажа препаратов по регионам"} />
        </Footer>
      </Main> */}
    </Wrapper>
  );
};

export default Reports;
