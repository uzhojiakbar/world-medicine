import { Input } from "antd";
import styled from "styled-components";

export const InputWrapper = styled(Input)`
    background-color: ${({bgColor}) => (bgColor ? bgColor : "var(--bg-color)")};

    border-radius: 10px;
    display: inline-block;
    height: ${({height}) => (height ? height : "60px")};
    border: none !important;
    -moz-appearance: textfield; /* Firefox */

    

    width: 100%;
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
