import { Select } from "antd";
import styled from "styled-components";

export const SelectContainer = styled(Select)`
  border-radius: 10px;
  display: inline-block;
  height: 40px;
  width: 100%;

  font-family: "Vela Sans GX";

  .ant-select-arrow {
    font-size: 12px;
    color: var(--text-black);
  }

  .ant-select-selector {
    font-family: "Vela Sans GX", sans-serif;
    font-weight: 800;
    border: none !important;

    text-transform: capitalize;

    color: var(--black);
    background-color: var(
      --bg-color
    ) !important; /* Tanlanmagan holat uchun fon rangi */
  }
`;
