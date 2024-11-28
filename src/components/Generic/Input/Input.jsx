import React from "react";
import { InputWrapper } from "./style";

const Input = ({ placeholder, maxLength = 256, type, onChange = () => {} }) => {
  return (
    <InputWrapper
      maxLength={maxLength}
      type={type}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder || ""}
    />
  );
};

export default Input;
