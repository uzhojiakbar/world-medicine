import React from "react";
import { InfoCardWrapper } from "./style";
import { TitleSmall } from "../../root/style";

const InfoCard = ({ children, title, width }) => {
  return (
    <InfoCardWrapper width={width}>
      <TitleSmall>{title || "Header"}</TitleSmall>
      {children}
    </InfoCardWrapper>
  );
};

export default InfoCard;
