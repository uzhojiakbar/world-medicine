import { Input } from "antd";
import styled from "styled-components";

export const InputWrapper = styled(Input)`
    background-color: ${({bgColor}) => (bgColor ? bgColor : "var(--bg-color)")};

    border-radius: ${({borderRadius}) => (borderRadius ? borderRadius : "10px")};
    display: inline-block;
    height: ${({height}) => (height ? height : "60px")};
    border: none !important;
    -moz-appearance: textfield; /* Firefox */

    

    width: ${({mini})=>mini?"120px":"100%"};
    height: ${({height}) => (height ? height : "60px")};
    
    font-size: 16px;
    font-family: "Vela Sans GX";

    &::placeholder {
        text-transform: capitalize;
    }

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;
