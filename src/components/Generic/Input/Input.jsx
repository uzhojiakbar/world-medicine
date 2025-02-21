import React from "react";
import {InputWrapper} from "./style";

const Input = ({
                   disabled,
                   placeholder,
                   maxLength = 256,
                   type,
                   value = "",
                   height,
                   onChange = () => {
                   },
                   className
               }) => {
    return (
        <InputWrapper
            className={className}
            maxLength={maxLength}
            type={type}
            disabled={disabled}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder || ""}
            defaultValue={value}
            height={height}
        />
    );
};

export default Input;
