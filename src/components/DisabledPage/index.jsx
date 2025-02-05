import React from "react";
import { DisabledPageContainer, TopTitleDisabled } from "./style";
import { TopTitle } from "../../pages/login/style";

const DisabledPage = ({ title = "Sahifa API ulanishini kutmoqda..." }) => {
  return (
    <DisabledPageContainer>
      <TopTitleDisabled>{title}</TopTitleDisabled>
    </DisabledPageContainer>
  );
};

export default DisabledPage;
