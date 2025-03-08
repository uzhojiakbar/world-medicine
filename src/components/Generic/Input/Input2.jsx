import React from "react";
import {InputWrapper} from "./style";

const Input2 = ({
                    disabled,
                    placeholder,
                    maxLength = 256,
                    type,
                    name,
                    onChange = () => {
                    },
                    bgColor,
                    className = "",
                    deffvalue
                }) => {
    return (
        <InputWrapper
            name={name}
            className={className}
            maxLength={maxLength}
            type={type}
            value={deffvalue}
            disabled={disabled}
            onChange={(e) => onChange(e)}
            placeholder={placeholder || ""}
            bgColor={bgColor}
        />
    );
};


export default Input2;
