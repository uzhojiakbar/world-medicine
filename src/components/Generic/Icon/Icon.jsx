import React from "react";
import { IconContainer } from "./style";

const Icon = ({ icon }) => {
  if (icon) {
    return (
      <IconContainer>
        <div className="icon">{icon}</div>
      </IconContainer>
    );
  } else {
    return <></>;
  }
};

export default Icon;
