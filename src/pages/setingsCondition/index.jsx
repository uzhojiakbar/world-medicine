import React from "react";
import { AnaliktikaCon } from "../analiktika/admin/style";
import { Title } from "../../root/style";
import Pagination from "./nav/Pagination";
import { Outlet, Route, Routes } from "react-router-dom";

const SettingsCondition = () => {
  return (
    <AnaliktikaCon>
      <Title>Управление базой данных</Title>
      <Pagination />
      <Outlet />
    </AnaliktikaCon>
  );
};

export default SettingsCondition;
