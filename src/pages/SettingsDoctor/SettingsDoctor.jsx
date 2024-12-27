import React, { useState } from "react";
import { Title, TitleSmall } from "../../root/style";
import Button from "../../components/Generic/Button/Button";
import IconPlus from "../../assets/svg/IconPlus";
import { useNavigate } from "react-router-dom";
import Table from "./Table";
import { Doctors } from "../../mock/doctors";
import { useLanguage } from "../../context/LanguageContext";

const SettingsDoctor = () => {
  const nav = useNavigate();
  const { translate } = useLanguage();

  return (
    <>
      <Title>
        <span>{translate("Управление_врачами")}</span>
        <Button onClick={() => nav("../create-doctor")} icon={<IconPlus />}>
          {translate("Добавить_врача")}
        </Button>
      </Title>

      <Table data={Doctors || []} />
    </>
  );
};

export default SettingsDoctor;
