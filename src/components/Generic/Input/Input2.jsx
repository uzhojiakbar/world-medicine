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
                    deffvalue,
                    deffvalue2,
    style,
    height,
    mini=false
                }) => {
    return (
        <InputWrapper
            mini={mini}
            name={name}
            className={className}
            maxLength={maxLength}
            type={type}
            value={deffvalue}
            defaultValue={deffvalue2}
            disabled={disabled}
            height={height}
            onChange={(e) => onChange(e)}
            placeholder={placeholder || ""}
            bgColor={bgColor}
            style={style}
        />
    );
};


export default Input2;
