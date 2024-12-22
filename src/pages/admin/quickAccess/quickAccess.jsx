import React from "react";
import { QAccessButton, QuickAccessPContainer } from "./style";
import EyeIcon from "../../../assets/svg/Eye";
import SystemIcon from "../../../assets/svg/SystemIcon";
import BDIcon from "../../../assets/svg/BDIcon";
import { useLanguage } from "../../../context/LanguageContext";

const QuickAccess = ({ data = [] }) => {
  const { translate } = useLanguage();

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
