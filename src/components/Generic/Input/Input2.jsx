import React from "react";
import { InputWrapper } from "./style";

const Input2 = ({
  disabled,
  placeholder,
  maxLength = 256,
  type,
  name,
  onChange = () => {},
  bgColor,
}) => {
  return (
    <InputWrapper
      autoComplete="off"
      name={name}
      maxLength={maxLength}
      type={type}
      disabled={disabled}
      onChange={(e) => onChange(e)}
      placeholder={placeholder || ""}
      bgColor={bgColor}
    />
  );
};

export default Input2;
