import React, { useState } from "react";
import { CardContainer } from "../Generic/StaticButton/style";
import StaticButton from "../Generic/StaticButton/StaticButton";
import { useLanguage } from "../../context/LanguageContext";

const Information = ({ admin = 0, active, setActive }) => {
  const { translate } = useLanguage();

  const information = [
    {
      id: 1,
      title: translate("Количество_клиентов"),
      count: 754,
    },
    {
      id: 2,
      title: translate("Количество_препаратов"),
      count: 172,
    },
    {
      id: 3,
      title: translate("Отправленных_смс"),
      count: 355,
    },
    {
      id: 4,
      title: translate("Количество_рецептов"),
      count: 900,
    },
  ];

  return (
    <CardContainer admin={admin}>
      {information.map((v) => {
        return (
          <StaticButton
            onClick={() => {
              active !== v.id ? setActive(v.id) : "";
            }}
            active={active === v.id}
            admin={admin}
            key={v.id}
            title={v.title}
            value={v.count}
          />
        );
      })}
    </CardContainer>
  );
};

export default Information;
