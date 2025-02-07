import React from "react";
import { AnaliktikaCon } from "../../../pages/analiktika/admin/style";
import { Title } from "../../../root/style";
import Pagination from "./Pagination";
import { Outlet } from "react-router-dom";
import { useLanguage } from "../../../context/LanguageContext";

const NastroykaUsloviya = () => {
    const { translate } = useLanguage();
    return (
        <AnaliktikaCon>
            <div className="conn">
                <Title>{translate("Управление_базой_данных")}</Title>
                <Pagination />
            </div>
            <Outlet />
        </AnaliktikaCon>
    );
};

export default NastroykaUsloviya;
