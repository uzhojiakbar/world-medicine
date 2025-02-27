import React, { useState } from "react";
import Filter from "../../../pages/setingsCondition/filter/ConditionFilter";
import MainTable from "./Table";
import { Title } from "../../../root/style";
import { useLanguage } from "../../../context/LanguageContext";
import styled from "styled-components";
import Button from "../../../components/Generic/Button/Button";
import IconPlus from "../../../assets/svg/IconPlus";
import Modal1 from "./Modal";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`

const AdminArxiv = () => {
  const { translate } = useLanguage();
  const [openModalId, setOpenModalId] = useState(false);


  return (
    <>
      {openModalId && <Modal1 isOpen={openModalId} onClose={setOpenModalId} />}
      <Filter id={0} />
      <Container>
        <Title>{translate("Договоры")}</Title>
        <Button icon={<IconPlus />} onClick={() => setOpenModalId(true)}>{translate("Добавить договор")}</Button>
      </Container>
      <MainTable title="rahmadjon" data={[]} />
    </>
  );
};

export default AdminArxiv;
