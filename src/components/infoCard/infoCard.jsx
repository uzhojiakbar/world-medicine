import React from "react";
import { InfoCardWrapper } from "./style";
import { TitleSmall } from "../../root/style";
import { useLanguage } from "../../context/LanguageContext";

const InfoCard = ({
  children,
  padding,
  title = "",
  width,
  rightBtn,
  rightBtnFunc,
}) => {
  const { translate } = useLanguage();

  return (
    <InfoCardWrapper padding={padding} width={width}>
      <TitleSmall>
        <div>{translate(title) || "Title"}</div>
        <div className="rightBtn" onClick={rightBtnFunc}>
          {rightBtn || ""}
        </div>
      </TitleSmall>
      <div className="child-flex">{children}</div>
    </InfoCardWrapper>
  );
};

export default InfoCard;
