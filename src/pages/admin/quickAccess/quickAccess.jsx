import React from "react";
import { QAccessButton, QuickAccessPContainer } from "./style";
import EyeIcon from "../../../assets/svg/Eye";
import SystemIcon from "../../../assets/svg/SystemIcon";
import BDIcon from "../../../assets/svg/BDIcon";
import { useLanguage } from "../../../context/LanguageContext";

const QuickAccess = () => {
  const { translate } = useLanguage();

  const data = [
    {
      id: 1,
      name: "Просмотр отчетов",
      icon: <EyeIcon />,
      onclick: () => {
        console.log("button clickd");
      },
    },
    {
      id: 2,
      name: "Управление системой",
      icon: <SystemIcon />,
      onclick: () => {
        console.log("button clickd");
      },
    },
    {
      id: 3,
      name: "Управление Базой Данных",
      icon: <BDIcon />,
      onclick: () => {
        console.log("button clickd");
      },
    },
  ];

  return (
    <QuickAccessPContainer>
      {data.map((v) => {
        return (
          <QAccessButton onClick={v.onclick} key={v.id}>
            <div className="name">{v.name}</div>
            <div className="icon">{v.icon}</div>
          </QAccessButton>
        );
      })}
    </QuickAccessPContainer>
  );
};

export default QuickAccess;
