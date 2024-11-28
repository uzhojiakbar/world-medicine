import { Button } from "antd";
import React from "react";
import styled from "styled-components";

const ButtunWithOutContainer = styled(Button)`
  width: 100%;
  padding: 25px;
  outline: none;
  border: none;
  background-color: #f7f8fc;

  color: black;
  font-family: "Vela Sans GX";
  font-size: 16px;
  border-radius: 10px;
`;

const ButtonWithout = ({ children, onClick }) => {
  return (
    <ButtunWithOutContainer onClick={onClick}>
      {children}
    </ButtunWithOutContainer>
  );
};

export default ButtonWithout;
