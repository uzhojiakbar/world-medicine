import React from "react";
import {InputWrapper} from "./style";

const Input = ({
                   disabled,
                   placeholder,
                   maxLength = 256,
                   type,
                   value = "",
                   value2,
                   height,
                   onChange = () => {
                   },
                   className,
                   bgColor,
                   ref,
                   required = false,
                   borderRadius
               }) => {
    return (
        <InputWrapper
            ref={ref}
            className={className}
            maxLength={maxLength}
            type={type}
            disabled={disabled}
            required={required}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder || ""}
            defaultValue={value}
            value={value2}
            height={height}
            bgColor={bgColor}
            borderRadius={borderRadius}
        />
    )
        ;
};

export default Input;
