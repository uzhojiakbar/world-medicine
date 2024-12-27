import React from "react";
import { AnaliktikaCon } from "../analiktika/admin/style";
import { Title } from "../../root/style";
import Pagination from "./nav/Pagination";
import { Outlet, Route, Routes } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

const SettingsCondition = () => {
  const { translate } = useLanguage();
  return (
    <AnaliktikaCon>
      <Title>{translate("Управление_базой_данных")}</Title>
      <Pagination />
      <Outlet />
    </AnaliktikaCon>
  );
};

export default SettingsCondition;
