import React from "react";
import { InputWrapper } from "./style";

const Input = ({ placeholder, type, onChange = () => {} }) => {
  return (
    <InputWrapper
      type={type}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder || ""}
    />
  );
};

export default Input;
