import React from "react";
import { DisabledPageContainer } from "./style";
import { TopTitle } from "../../pages/login/style";
import { useLanguage } from "../../context/LanguageContext";

const DisabledPage = () => {
  const { translate } = useLanguage();

  return (
    <DisabledPageContainer>
      <TopTitle>{translate("waiting_API")}</TopTitle>
    </DisabledPageContainer>
  );
};

export default DisabledPage;
