import React from "react";
import { InfoCardWrapper } from "./style";
import { TitleSmall } from "../../root/style";

const InfoCard = ({ children, title, width, rightBtn, rightBtnFunc }) => {
  return (
    <InfoCardWrapper width={width}>
      <TitleSmall>
        <div>{title || "Header"}</div>
        <div className="rightBtn" onClick={rightBtnFunc}>
          {rightBtn || ""}
        </div>
      </TitleSmall>
      <div className="child-flex">{children}</div>
    </InfoCardWrapper>
  );
};

export default InfoCard;
