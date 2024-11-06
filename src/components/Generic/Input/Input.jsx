import React from "react";
import { InputWrapper } from "./style";

const Input = ({ placeholder, onChange = () => {} }) => {
  return (
    <InputWrapper
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder || ""}
    />
  );
};

export default Input;
