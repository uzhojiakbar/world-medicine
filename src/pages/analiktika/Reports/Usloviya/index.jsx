import React, { useState } from "react";
import {
  ButtonWrapper,
  Container,
  Info,
  InfoCard,
  InfoWrapper,
  Item,
  MiniItem,
  MiniItemWrapper,
  Wrap,
} from "./style";
import { Title, TitleSmall } from "../../../../root/style";
import Button from "../../../../components/Generic/Button/Button";
import IconPlus from "../../../../assets/svg/IconPlus";
import { useLanguage } from "../../../../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import DateRangePicker from "../../../../components/Generic/DataRangePicker/DataRangePicker";
import IconPlusChange from "../../../../assets/svg/IconPlusChange";

const Usloviya = () => {
  const { translate } = useLanguage();
  const nav = useNavigate();
  const [activeTab, setActiveTab] = useState("Рецепт");
  const [mavjudFoizlar, setMavjudFoizlar] = useState([
    { first: "<=60%", second: "30%" },
    { first: "<=60%" },
  ]);

  const information = {
    title: "Условия",
    titles: ["Рецепт", "СУ", "СБ", "ГЗ", "Кабинет вакцинации"],
    kvota: "Квота",
    infoTitles: [
      { title: "Доступный %СУ", value: "30%" },
      { title: "Доступный %СБ", value: "30%" },
      { title: "Доступный %ГЗ", value: "30%" },
    ],
    time: "Срок сдачи",
    subtitle: "Доступный процент суммы",
  };
  return (
    <Container>
      <Title className="titlee">
        {information.title}
        <Button onClick={() => nav("../")} icon={<IconPlus />}>
          {translate("Загрузить_базу_менеджеров")}
        </Button>
      </Title>

      <ButtonWrapper>
        {information.titles.map((tab) => (
          <Item
            key={tab}
            active={activeTab === tab ? "true" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </Item>
        ))}
      </ButtonWrapper>

      <Wrap>
        <InfoWrapper>
          <DateRangePicker />
          <Info>
            <p>{information.kvota}:</p>
            <p>56.000</p>
          </Info>
        </InfoWrapper>
        <InfoWrapper>
          {information.infoTitles.map((v) => {
            return (
              <InfoCard>
                <p>{v.title}</p>
                <p>{v.value}</p>
              </InfoCard>
            );
          })}
          <InfoCard>
            <p>{information.time}</p>
            <DateRangePicker />
          </InfoCard>
        </InfoWrapper>
      </Wrap>

      <Wrap>
        <TitleSmall>{information.subtitle}</TitleSmall>
        <InfoWrapper>
          {mavjudFoizlar?.map((v, i) => {
            if (mavjudFoizlar.length - 1 == i && !v.second) {
              return (
                <MiniItemWrapper>
                  <MiniItem>{v?.first}</MiniItem>
                  <MiniItem btn="true" onClick={() => {}}>
                    <IconPlusChange />
                  </MiniItem>
                </MiniItemWrapper>
              );
            } else
              return (
                <MiniItemWrapper>
                  <MiniItem>{v?.first}</MiniItem>
                  <MiniItem>{v?.second}</MiniItem>
                </MiniItemWrapper>
              );
          })}
          {mavjudFoizlar[mavjudFoizlar.length - 1].first &&
          mavjudFoizlar[mavjudFoizlar.length - 1].second ? (
            <MiniItemWrapper>
              <MiniItem btn="true" onClick={() => {}}>
                <IconPlusChange />
              </MiniItem>
            </MiniItemWrapper>
          ) : (
            ""
          )}
        </InfoWrapper>
      </Wrap>
    </Container>
  );
};

export default Usloviya;
