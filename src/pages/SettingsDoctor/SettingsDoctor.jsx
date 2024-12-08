import React, { useState } from "react";
import { Title, TitleSmall } from "../../root/style";
import Button from "../../components/Generic/Button/Button";
import IconPlus from "../../assets/svg/IconPlus";
import { useNavigate } from "react-router-dom";
import Table from "./Table";
import { Doctors } from "../../mock/doctors";

const SettingsDoctor = () => {
  const nav = useNavigate();

  return (
    <>
      <Title>
        <span>Управление врачами</span>
        <Button onClick={() => nav("../create-contract")} icon={<IconPlus />}>
          Добавить врача
        </Button>
      </Title>

      <Table data={Doctors || []} />
    </>
  );
};

export default SettingsDoctor;
