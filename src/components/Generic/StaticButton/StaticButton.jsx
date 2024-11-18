import React from "react";
import { Card, CardTitle, CardValue } from "./style";

const StaticButton = ({ admin = 0, onClick, active, title, value }) => {
  return (
    <Card admin={admin} onClick={onClick} active={active.toString()}>
      <CardTitle>{title}</CardTitle>
      <CardValue className="value" admin={admin}>
        {value}
      </CardValue>
    </Card>
  );
};

export default StaticButton;
