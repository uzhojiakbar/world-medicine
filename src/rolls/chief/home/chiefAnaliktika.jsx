import React, { useState } from "react";
import { AnaliktikaCon } from "./style";
import QuickAccess from "./quickAccess/quickAccess";
import { useLanguage } from "../../../context/LanguageContext";
import SystemIcon from "../../../assets/svg/SystemIcon";
import { useNavigate } from "react-router-dom";
import { useGetDrugs } from "../../../utils/server/server";
import AnalitikaChiefPage from "./analiktika";

const ChiefAnaliktika = () => {
  const { data: dataDrugs, isLoading: loadingDrugs } = useGetDrugs();

  const nav = useNavigate();

  const { translate } = useLanguage(); // Tarjima funksiyasi

  const data = [
    {
      id: 1,
      name: translate("Администрирование"),
      icon: <SystemIcon />,
      onclick: () => {
        nav("database#administration");
        console.log("button clickd");
      },
    },

    {
      id: 4,
      name: translate("Цель_представителю"),
      icon: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.5"
            d="M24 44C35.0457 44 44 40.866 44 37C44 33.134 35.0457 30 24 30C12.9543 30 4 33.134 4 37C4 40.866 12.9543 44 24 44Z"
            fill="#216BF4"
          />
          <path
            d="M24.0005 2.5C24.8289 2.5 25.5004 3.17158 25.5004 4V6.07294L35.5159 11.0806L35.6238 11.1346C37.0928 11.8689 38.3448 12.4949 39.216 13.103C40.0996 13.7196 41.0285 14.615 41.0285 16C41.0285 17.385 40.0996 18.2804 39.216 18.897C38.3448 19.5051 37.0928 20.131 35.6238 20.8654L25.5004 25.927V36C25.5004 36.8284 24.8289 37.5 24.0005 37.5C23.172 37.5 22.5005 36.8284 22.5005 36V25.0324C22.4998 25.0116 22.4998 24.9906 22.5005 24.9698V7.03018C22.4998 7.00932 22.4998 6.98842 22.5005 6.9675V4C22.5005 3.17158 23.172 2.5 24.0005 2.5Z"
            fill="#216BF4"
          />
        </svg>
      ),
      onclick: () => {
        nav("managers-goal");
        console.log("button clickd");
      },
    },
  ];

  return (
    <AnaliktikaCon>
      <QuickAccess count={data.length} data={data} />

      <AnalitikaChiefPage />
      {/* <Title>{translate("Отчеты")}</Title>
      <Reports /> */}
    </AnaliktikaCon>
  );
};

export default ChiefAnaliktika;

// MAIN /home/asus/Desktop/web/world-medicine/src/pages/analiktika/analiktikaPage.jsx
