import React from "react";
import { InputWrapper } from "./style";

const Input = ({
  disabled,
  placeholder,
  maxLength = 256,
  type,
  onChange = () => {},
}) => {
  return (
    <InputWrapper
      maxLength={maxLength}
      type={type}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder || ""}
    />
  );
};

export default Input;
