import { Input } from "antd";
import styled from "styled-components";

export const InputWrapper = styled(Input)`
    border-radius: 10px;
    display: inline-block;
    height: ${({height}) => (height ? height : "60px")};
    border: none !important;

    width: 100%;
    
    font-size: 16px;
    font-family: "Vela Sans GX";

    &::placeholder {
        text-transform: capitalize;
    }
`;
