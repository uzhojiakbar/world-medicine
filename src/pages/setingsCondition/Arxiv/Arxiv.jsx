import React from "react";
import Filter from "../filter/ConditionFilter";
import MainTable from "./Table";
import { Title } from "../../../root/style";
import { useLanguage } from "../../../context/LanguageContext";

const Arxiv = () => {
  const { translate } = useLanguage();

  return (
    <>
      <Filter id={0} />
      <Title>{translate("Договоры")}</Title>
      <MainTable title="rahmadjon" data={[]} />
    </>
  );
};

export default Arxiv;
