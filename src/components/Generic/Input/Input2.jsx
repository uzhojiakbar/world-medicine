import React from "react";
import { InputWrapper } from "./style";

const Input2 = ({
  disabled,
  placeholder,
  maxLength = 256,
  type,
  name,
  onChange = () => {},
}) => {
  return (
    <InputWrapper
      name={name}
      maxLength={maxLength}
      type={type}
      disabled={disabled}
      onChange={(e) => onChange(e)}
      placeholder={placeholder || ""}
    />
  );
};

export default Input2;
