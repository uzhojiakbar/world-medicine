import React from "react";
import { InformationTitleSpan, TitleSpan } from "../../../../root/style";
import { NavTitleSection } from "./style";

const BaseDoctor = () => {
  return (
    <div>
      <NavTitleSection>
        <div className="section1">
          <TitleSpan>База врачей</TitleSpan>
          <InformationTitleSpan>Всего 500 вр</InformationTitleSpan>
          <InformationTitleSpan>Всего 500 вр</InformationTitleSpan>
          <InformationTitleSpan>Всего 500 вр</InformationTitleSpan>
        </div>
      </NavTitleSection>
    </div>
  );
};

export default BaseDoctor;
