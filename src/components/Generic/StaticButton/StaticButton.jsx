import React from "react";
import { Card, CardTitle, CardValue } from "./style";

const StaticButton = ({ onClick, active, title, value }) => {
  return (
    <Card onClick={onClick} active={active.toString()}>
      <CardTitle>{title}</CardTitle>
      <CardValue>{value}</CardValue>
    </Card>
  );
};

export default StaticButton;
