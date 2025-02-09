import React from "react";
import { Container, FilterSection, FilterInput, Figcaption, Details } from "./style.js";
import { TitleSmall } from "../../../../root/style.js";
import Input from "../../../../components/Generic/Input/Input.jsx";
import DateRangePicker from "./DataRangePicker/DataRangePicker.jsx";
import { useLanguage } from "../../../../context/LanguageContext.jsx";

const Info = () => {
  const { translate } = useLanguage()
  const dataInvestitsiya = [
    { title: "<60%", subTitle: "10,0%" },
    { title: "60% - 69,9%", subTitle: "10,5%" },
    { title: "70% - 79,9%", subTitle: "11,0%" },
    { title: "80% - 89,9%", subTitle: "11,5%" },
    { title: "90 >", subTitle: "12%" },
  ]

  const dataUsloviya = [
    { title: "%СУ", subTitle: "30%" },
    { title: "%СБ", subTitle: "20%" },
    { title: "%ГЗ", subTitle: "40%" },
    { title: "%КВ", subTitle: "30%" },
  ]
  return (
    <Container>
      <FilterSection>

        <Details>
          <Figcaption>
            <div>{translate("Доступный % инвестиций")}</div>
          </Figcaption>
          {
            dataInvestitsiya.map((v, i) => {

              return <Figcaption key={i}>
                <div>{v.title}</div>
                <div>{v.subTitle}</div>
              </Figcaption>
            })
          }

          <Figcaption>
            <div className="info">{translate("Добавить пункт")}</div>
            <div className="info">-%</div>
          </Figcaption>

        </Details>

        <Details>
          <Figcaption>
            <div>{translate("Условия")}</div>
          </Figcaption>
          {
            dataUsloviya.map((v, i) => {
              return <Figcaption key={i}>
                <div>{v.title}</div>
                <div>{v.subTitle}</div>
              </Figcaption>
            })
          }

          <Figcaption>
            <div className="info">{translate("Добавить пункт")}</div>
            <div className="info">-%</div>
          </Figcaption>
        </Details>
      </FilterSection>
      <div className="div">
        <DateRangePicker title={translate("Срок сдачи отчета")} />
        <div className="inner"></div>
      </div>
    </Container>
  );
};

export default Info;
