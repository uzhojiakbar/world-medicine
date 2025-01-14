import React, { useState } from "react";
import { Title, TitleSmall } from "../../root/style";
import Button from "../../components/Generic/Button/Button";
import IconPlus from "../../assets/svg/IconPlus";
import { useNavigate } from "react-router-dom";
import Table from "./Table.jsx";
import { Doctors } from "../../mock/doctors";
import { useLanguage } from "../../context/LanguageContext";
import DisabledPage from "../../components/DisabledPage/index.jsx";
import { Container } from "../admin/settingSystemAdmin/style.js";

const SettingsMed = () => {
  const nav = useNavigate();
  const { translate } = useLanguage();

  return (
    <Container>
      <Title>
        <DisabledPage />
        <span>{translate("Управление_мед_представителями")}</span>
        <Button onClick={() => nav("../create-med-rep")} icon={<IconPlus />}>
          {translate("Добавить_врача")}
        </Button>
      </Title>

      <Table data={Doctors || []} />
    </Container>
  );
};

export default SettingsMed;
