import React from "react";
import {
  DisabledPageContainer,
  DisabledPageContainerOuter,
  TopTitleDisabled,
} from "./style";
import { TopTitle } from "../../pages/login/style";

const DisabledPageOuter = ({ title = "Sahifa API ulanishini kutmoqda..." }) => {
  return (
    <DisabledPageContainerOuter>
      <TopTitleDisabled>{title}</TopTitleDisabled>
    </DisabledPageContainerOuter>
  );
};

export default DisabledPageOuter;
