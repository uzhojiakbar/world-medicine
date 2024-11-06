import React from "react";
import { InfoCardWrapper } from "./style";
import { TitleSmall } from "../../root/style";

const InfoCard = ({ children, title, width }) => {
  return (
    <InfoCardWrapper width={width}>
      <TitleSmall>{title || "Header"}</TitleSmall>
      <div className="child-flex">{children}</div>
    </InfoCardWrapper>
  );
};

export default InfoCard;
