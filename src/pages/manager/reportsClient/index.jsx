import React, { useState } from "react";
import { useLanguage } from "../../../context/LanguageContext";
import { ButtonWrapper, Item } from "./style";
import { Title } from "../../../root/style";

const ReportsClient = () => {
  const { translate } = useLanguage();
  const [activeTab, setActiveTab] = useState("Рецепт");

  const titles = [
    translate("Рецепт"),
    translate("СУ"),
    translate("СБ"),
    translate("ГЗ"),
    translate("Кабинет вакцинации"),
  ];

  return (
    <div>
      <Title>{translate("Формирование отчета по работе клиентов")}</Title>

      <ButtonWrapper>
        {titles.map((tab) => (
          <Item
            key={tab}
            active={activeTab === tab ? "true" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </Item>
        ))}
      </ButtonWrapper>
    </div>
  );
};

export default ReportsClient;
