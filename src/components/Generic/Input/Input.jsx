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
                   className,
                   bgColor="transparent",
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
            bgColor={bgColor}
        />
    )
        ;
};

export default Input;
